const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://deblina:deblina2009@practice-b0v5f.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

client.connect(err => {
    console.log('Connected!!!')
});

module.exports = {
    client
};