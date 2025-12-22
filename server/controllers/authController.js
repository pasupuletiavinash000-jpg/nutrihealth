const { db } = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [enomail]);
        
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
            [name, email, hashedPassword]
        );

        res.status(201).json({ message: 'User registered successfully!' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
     
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        
        if (users.length === 0) {
            return res.status(400).json({ message: 'Invalid Email or Password' });
        }

        const user = users[0];


        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Email or Password' });
        }


        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });

        res.json({
            message: 'Login Successful',
            token,
            user: { id: user.id, name: user.name, email: user.email }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
};