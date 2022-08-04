import User from "../models/User.js"
import bcrypt from "bcryptjs"

// Register user
export const register = async (req, res) => {
    try {
        const { username, password } = req.body

        const isUsed = await User.findOne({ username })

        if(isUsed) {
            return res.json({
                message: 'Numele de utilizator este ocupat.'
            })
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const newUser = new User({
            username, 
            password: hash,
        })

        await newUser.save()

        res.json({
            newUser, 
            message: 'Inregistrarea finisata',
        })

    } catch (error) {
        res.json({message: "Eroare la inregistrare"})
    }
}
// Login user
export const login = async (req, res) => {
    try {

    } catch (error) {}
}
// Get me
export const getMe = async (req, res) => {
    try {

    } catch (error) {}
}