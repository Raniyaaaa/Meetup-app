import {MongoClient} from  'mongodb'

async function handler(req, res) {
    if(req.method=== 'POST') {
        const data = req.body;

        const client = await MongoClient.connect('mongodb+srv://RaniyaRasheed:Raniya12345678@cluster0.8qy45.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0');
        const db = client.db();
        const meetupsCollection = db.collection('meetups')
        const result = await meetupsCollection.insertOne(data)
        console.log(result)
        client.close();
        res.status(201).json({message: 'Meetup Inserted!'})
    }
    if (req.method === 'GET') {
        try {
            const client = await MongoClient.connect('mongodb+srv://RaniyaRasheed:Raniya12345678@cluster0.8qy45.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0');
            const db = client.db();
            const meetupsCollection = db.collection('meetups');
            const meetups = await meetupsCollection.find().toArray();
            client.close();
            res.status(200).json({ meetups });
        } catch (error) {
            console.error('Error fetching data:', error);
            res.status(500).json({ message: 'Failed to fetch meetups' });
        }
    }
}

export default handler;