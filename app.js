const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
const { check, validationResult } = require('express-validator');

 const {getHomePage} = require('./routes/index');
 const { listJoining, addJoining, addJoiningPage, deleteJoining} = require('./routes/joining');
 const {addEventPage, addEvent, deleteEvent, editEvent, editEventPage, detailEvent} = require('./routes/event');
 const {addVolunteerPage, deleteVolunteer, editVolunteer, editVolunteerPage, detailVolunteer, addVolunteer, listVolunteer} = require('./routes/volunteer');
const port =3000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'voluntaryEvent'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
    
});

global.db = db;


// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'images')));

app.use(fileUpload()); // configure fileupload

// --- Event ------------------------------------------
app.get('/', getHomePage);
app.get('/addEvent', addEventPage);

app.post('/addEvent', [
    check('nameEvent').isLength({ min: 3 }).not().isEmpty()
    .withMessage('Event name ca not be empty'),
    check('address').isLength({ min: 3 })
    .withMessage('Address must be at least 3 chars long'),
    check('capacity').isNumeric().not().isEmpty()
    .withMessage('Capacity can not be empty')

], addEvent);


app.get('/detailEvent/:idEvent', detailEvent);
app.get('/editEvent/:idEvent', editEventPage);
app.post('/editEvent/:idEvent', editEvent);

app.get('/deleteEvent/:idEvent', deleteEvent);

//-------------- Volunteer -------------------------------
app.get('/listVolunteer', listVolunteer);
app.get('/addVolunteer', addVolunteerPage);

app.post('/addVolunteer', [
    check('firstName').isLength({ min: 3 }).not().isEmpty()
    .withMessage('First name can not be empty and must be min 3 characters.'),
    check('lastName').isLength({ min: 3 })
    .withMessage('Last name must be at least 3 chars long'),
    check('phone').isNumeric().not().isEmpty()
    .withMessage('Phone number can not be empty.'),
    check('address').isLength({ min: 3 })
    .withMessage('Address must be at least 3 chars long')
],  addVolunteer);

app.get('/detailVolunteer/:idVol' , detailVolunteer);
app.get('/editVolunteer/:idVol', editVolunteerPage);
app.post('/editVolunteer/:idVol', editVolunteer);
app.get('/deleteVolunteer/:idVol', deleteVolunteer);



// ------ Joining ----------------------------
app.get('/listJoining' , listJoining);
app.get('/addJoining', addJoiningPage);
app.post('/addJoining', addJoining);
app.get('/deleteJoining/:idJoin', deleteJoining);






// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});