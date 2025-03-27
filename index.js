const express = require("express");
const path = require("path")
const { connectToMongoDB } = require('./connect');
const URL = require("./models/url");
const urlRoute = require('./routes/url')
const staticRouter = require("./routes/staticRouter");
const userRoute = require("./routes/user")

const cookieParser = require('cookie-parser')
const {restrictToLoggedinUserOnly , checkAuth} = require('./middlewares/auth')

const app = express();
const PORT = 8001;

connectToMongoDB('mongodb+srv://kewatvipulkumar:Vipul123@cluster0.l9pfn.mongodb.net/ShortURL')
.then(() => console.log("Mongodb connected!"))


app.set("view engine", "ejs");
app.set('views', path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());




app.get('/url/:shortId', async (req,  res) => {
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


app.use('/url',restrictToLoggedinUserOnly, urlRoute)
app.use('/user', userRoute)
app.use('/', checkAuth, staticRouter)

app.listen(PORT, () => console.log(`Server Started  at PORT: ${8001}`))