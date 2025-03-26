const express = require("express");
const { connectToMongoDB } = require('./connect');
const URL = require("./models/url");
const urlRoute = require('./routes/url')



const app = express();
const PORT = 8001;

connectToMongoDB('mongodb+srv://kewatvipulkumar:Vipul123@cluster0.l9pfn.mongodb.net/ShortURL')
.then(() => console.log("Mongodb connected!"))

app.use(express.json());

app.get('/:shortId', async (req,  res) => {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate({
        shortId,
    },

    {
        $push: {
            visitHistory: {
                timestamp: Date.now(),
            }
        },
    }
);
res.redirect(entry.redirectURL);
})



app.use('/url', urlRoute)
app.listen(PORT, () => console.log(`Server Started  at PORT: ${8001}`))