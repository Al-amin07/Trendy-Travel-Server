const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 5000;

;

app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pekpvn6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const database = client.db("touristDB");

        const touristCollection = database.collection("touristCollection");


        app.get('/tourists', async (req, res) => {
            const cursor = touristCollection.find();
            const result = await cursor.toArray();
            
            res.send(result)
        })
        app.get('/tourist', async (req, res) => {
            const cursor = touristCollection.find();
            const result = await cursor.toArray();
            res.send(result)
        })

        

      app.get('/update/:id', async(req, res) => {
           const id = req.params.id;
            
            const query = { _id: new ObjectId(id) };
            const result = await touristCollection.findOne(query);
            res.send(result)
      })

        app.get('/tourists/:id', async (req, res) => {
            const id = req.params.id;
            
            const query = { _id: new ObjectId(id) };
            const result = await touristCollection.findOne(query);
            res.send(result)
        })

        app.get('/myList/:email', async (req, res) => {
            const email = req.params.email;
            
            const query = { email: email };
            const result = await touristCollection.find(query).toArray();
            res.send(result)

        })

     

        app.get('/tourists/:id', async (req, res) => {
            const id = req.params.id;
            // console.log(id);
            const query = { _id: new ObjectId(id) };
            const result = await touristCollection.findOne(query);
            res.send(result)
        })

        app.put('/update/:id', async(req, res) => {
            const user = req.body;
            
            const id = req.params.id;
            const query = { _id : new ObjectId(id)};
            const options = { upsert : true};
            const updateUser = {
                $set: {
                    photo: user.photo,
                    country: user.country,
                    spotname: user.spotname,
                    short: user.short,
                    location: user.location,
                    cost: user.cost,
                    season: user.season,
                    time: user.time,
                    visitor: user.visitor
                }
            }

            const result = await touristCollection.updateOne(query, updateUser, options);
            res.send(result)

        })



        app.delete('/tourists/:id', async(req, res) => {
            const id = req.params.id;
            console.log(id)
            const query = { _id : new ObjectId(id)}
            const result = await touristCollection.deleteOne(query);
            res.send(result);
        })


        app.post('/tourists', async (req, res) => {
            const tourist = req.body;

            const result = await touristCollection.insertOne(tourist);

            res.send(result);
        })
        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World!!!');
})

app.listen(port, () => {
    console.log('Running at Port : ', port)
})