const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(
    express.urlencoded({
        extended: true,
    })
);

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });

const dataSchema = new mongoose.Schema({
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 }
});

const Data = mongoose.model("Data", dataSchema);

app.listen(5000, () => {
    console.log(`Server running at http://localhost:5000/`);
});

// API to get views
app.get('/views', async (req, res) => {
    try {
        let data = await Data.findOne();
        if (!data) {
            data = new Data();
            await data.save();
        }
        res.json({ views: data.views });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// API to update views
app.post('/views', async (req, res) => {
    try {
        let data = await Data.findOne();
        if (!data) {
            data = new Data();
        }
        data.views += 1;
        await data.save();
        res.json({ views: data.views });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// API to get likes
app.get('/likes', async (req, res) => {
    try {
        let data = await Data.findOne();
        if (!data) {
            data = new Data();
            await data.save();
        }
        res.json({ likes: data.likes });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// API to update likes
app.post('/likes', async (req, res) => {
    try {
        let data = await Data.findOne();
        if (!data) {
            data = new Data();
        }
        data.likes += 1;
        await data.save();
        res.json({ likes: data.likes });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
