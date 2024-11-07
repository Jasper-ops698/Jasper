import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;  

let client;
let clientPromise;

if (!global._mongoClientPromise) {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { customerInfo, orderDetails } = req.body;

        try {
            const client = await clientPromise;
            const db = client.db('COKO');  
            const collection = db.collection('users');  

            await collection.insertOne({
                customerInfo,
                orderDetails,
                createdAt: new Date(),
            });

            res.status(200).json({ message: 'Order stored successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error storing order' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(Method ${req.method} Not Allowed);
    }
}
