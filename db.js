const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_DB || "mongodb://teddykwak:k9915402@ds141294.mlab.com:41294/node-rest-shop",
        {
            useNewUrlParser : true,
            useUnifiedTopology : true,
            useCreateIndex : true,
            useFindAndModify : true
        }
    )
    .then(() => console.log("mongoDB server started"))
    .catch(err => console.log(err.message));