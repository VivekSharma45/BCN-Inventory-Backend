// server/controllers/authController.js
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    // registration logic
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // ✅ Dummy auth logic (replace with real one)
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ success: true, token });
};
