const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
    image: String,
    heading: String,
    description: String,
})

// We will create a new Collection

const News = new mongoose.model('News', newsSchema);

module.exports = News;

