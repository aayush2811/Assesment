const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Assesment_customer").then(() => {
    console.log("Connection Successful");
}).catch((error) => {
    console.log(error);
});

module.exports = mongoose;