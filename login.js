import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from 'databse.js';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        // Check if user exists
        const user = await db.collection('users').findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Verify password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
// pages/api/example.js
import clientPromise from 'databse.js';

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("COKO");

    const data = await db.collection("users").find({}).toArray();

    res.status(200).json(data);
}
