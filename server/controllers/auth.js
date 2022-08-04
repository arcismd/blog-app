import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

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
        const { username, password } = req.body
        const user  = await User.findOne({ username }) 
        if(!user) {
            return res.json({
                message: "Nu exista asa utilizator"
            })
        }

        const isPassCorrect = await bcrypt.compare(password, user.password)

        if(!isPassCorrect) {
            return res.json({
                message: "Parola incorecta",
            })
        }

        const token = jwt.sign({
            id: user._id,
        }, process.env.JWT_SECRET,
        { expiresIn: "30d" }  )

        res.json({
            token,
            user,
            message: "Ati intrat in cont",
        })

    } catch (error) {
        res.json({message: "Eroare la logare"})
    }
}
// Get me
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        if(!user) {
            return res.json({
                message: "Nu exista asa utilizator",
            })
        }

        const token = jwt.sign({
            id: user._id,
        }, process.env.JWT_SECRET,
        { expiresIn: "30d" }  )

        res.json({
            user,
            token,
        })

    } catch (error) {
        res.json({ message: "Nu e disponibil." })
    }
}