import bcrypt from 'bcryptjs'; // for hashing passwords
import jwt from 'jsonwebtoken'; // for generating tokens
import { db } from 'api/databse.js';
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, email, password } = req.body;

        // Check if user already exists
        const userExists = await db.collection('users').findOne({ email });
        if (userExists) {
            return res.status(409).json({ error: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user to database
        const newUser = { username, email, password: hashedPassword };
        await db.collection('users').insertOne(newUser);

        // Generate JWT
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'User created', token });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
// pages/api/example.js
import clientPromise from 'api/databse.js';

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("COKO");

    const data = await db.collection("users").find({}).toArray();

    res.status(200).json(data);
}
