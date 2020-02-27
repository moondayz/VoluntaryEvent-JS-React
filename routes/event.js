const fs = require('fs');

module.exports = {
    addEventPage: (req, res) => {
        res.render('addEvent.ejs', {
            title: "Add Event Page" ,
            message: ''
        });
    },

    addEvent: (req,res) => {
        if(req.files) {
            return res.status(400).send("No files were uploaded.");
        }

        let message = '';
        let nameEvent = req.body.nameEvent;
        let address = req.body.address;
        let date = req.body.date;
        let capacity = req.body.capacity;
       // let organizer = req.body.organizer;

      //  let organizerID = "select idOrg from organizer where lastName = '" + organizer + "'";
        
        let usernameQuery = "SELECT * FROM `event` WHERE nameEvent = ?";

        db.query(usernameQuery, [nameEvent],  (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            if (result.length > 0) {
                message = 'This event is already exists';
                res.render('addEvent.ejs', {
                    message,
                    title: "Add Event Page"
                });
            } else {


                // send the event's details to the database
                let query = "INSERT INTO `event` (nameEvent, address, date, capacity) VALUES ('" +
                nameEvent + "', '" + address + "', '" + date + "', '" + capacity + "' )";
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/');
                });
          }
      });
    },

    editEventPage: (req, res) => {
        let idEvent = req.params.idEvent;
        let query = "SELECT * FROM `event` WHERE idEvent = ? ";
        db.query(query, [idEvent], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('editEvent.ejs', {
                title: "Edit Event Page"
                ,event: result[0]
                ,message: ''
            });
        });
    },
    editEvent: (req, res) => {
        let idEvent = req.params.idEvent;
        let nameEvent = req.body.nameEvent;
        let address = req.body.address;
        let date = req.body.date;
        let capacity = req.body.capacity;

        let query = "UPDATE `event` SET `nameEvent` = '" + nameEvent + "', `address` = '" + address + "', `date` = '" + date + "', `capacity` = '" + capacity + "' WHERE `idEvent` = ? ";
        db.query(query, [idEvent], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },


    deleteEvent: (req, res) => {
        let idEvent = req.params.idEvent;
        let deleteUserQuery = 'DELETE FROM event WHERE idEvent = ?';


                db.query(deleteUserQuery, [idEvent], (err, result) => {
                    if (err) {
                        //console.log(JSON.stringify(db));
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
    },

    detailEvent: (req,res) => {

        let idEvent = req.params.idEvent;
        let query = "SELECT * FROM `event` where idEvent = ?"; // query database to get all the events
        // execute query
        db.query(query, [idEvent], (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('detailEvent.ejs', {
                title: "Voluntary Event" ,
                event: result
            });
        });
    },


}; // module exports
        