const mongoose = require("mongoose");

// let URI ='mongodb+srv://kumardevloper22:devloper22@kumardevloper.x1bpkfy.mongodb.net/kumardevloper?retryWrites=true&w=majority&appName=kumardevloper';

// let uri = "mongodb://localhost:27017/";

let URI = process.env.MONGODB_URI ;

mongoose.connect( URI , {
     useNewUrlParser:true,
    // useUnifiedTopology:true
}).then(() => {
    console.log("Connection successful !!")
}).catch((e) => {
    console.log("Not Connected !!")
})