const bcrypt = require('bcrypt')
const {User} = require('../../db/models')

const signUp = async (req, res) => {
  const { name, pass, email } = req.body

  if (name && pass && email) {
    try {
      const hashPassword = await bcrypt.hash(pass, 10)
      const newUser = await User.create({
        name,
        pass: hashPassword,
        email,
      })

      req.session.user = {
        id: newUser.id,
        name: newUser.name,
      }

      return res.json({ id: newUser.id, name: newUser.name })
    } catch (error) {
      return res.sendStatus(500)
    }
  }

  return res.sendStatus(400)
}

const signIn = async (req, res) => {
  const { pass, email } = req.body

  if (pass && email) {
    try {
      const currentUser = await User.findOne({ email })
      if (currentUser && (await bcrypt.compare(pass, currentUser.pass))) {
        req.session.user = {
          id: currentUser.id,
          name: currentUser.name,
        }

        return res.json({ id: currentUser.id, name: currentUser.name })
      }
      return res.sendStatus(401)
    } catch (error) {
      return res.sendStatus(500)
    }
  }

  return res.sendStatus(400)
}

const signOut = async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.sendStatus(500)

    res.clearCookie("sid");

    return res.sendStatus(200)
  })
}

const checkAuth = async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user.id)
    return res.json(user)
  } catch (error) {
    return res.sendStatus(500)
  }
}

module.exports = {
  signIn,
  signOut,
  signUp,
  checkAuth,
}
