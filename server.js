// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
const server = app.listen(port, listening);

function listening(){
    console.log('server running');
    console.log(`running on localhost: ${port}`);
}

// GET route
app.get('/all', function(req, res){
    res.send(projectData);
})

// post route
app.post('/add', function (req, res){
    try{
        const data = {
            temperature: req.body.temperature,
            date: req.body.date,
            user_response: req.body.user_response,
        }
        projectData = data
        console.log(data)
    }catch (error){
        console.log("Error: ", error)
    }  
})
