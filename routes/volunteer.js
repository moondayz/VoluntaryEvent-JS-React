const fs = require('fs');

module.exports = {


    listVolunteer: (req, res) => {
        let query = "SELECT * FROM volunteer"; // query database to get all the volunteers
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('listVolunteer.ejs', {
                title: "List Volunteer Page" ,
                volunteer: result
            });
        });
    },



    addVolunteerPage: (req, res) => {
        res.render('addVolunteer.ejs', {
            title: "Add Volunteer Page" ,
            message: ''
        });
    },


    addVolunteer: (req,res) => {
        if(req.files) {
            return res.status(400).send("No files were uploaded.");
        }

        let message = '';
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let address = req.body.address;
        let phone = req.body.phone;
       
       
        let usernameQuery = "SELECT * FROM `volunteer` WHERE lastName = '" + lastName + "'";

        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            if (result.length > 0) {
                message = 'This person is already exists';
                res.render('addVolunteer.ejs', {
                    message,
                    title: "Add Volunteer Page"
                });
            } else {


                // send the volunteer's details to the database
                let query = "INSERT INTO `volunteer` (firstName, lastName, phone, address) VALUES ('" +
                firstName + "', '" + lastName + "', '" + phone + "', '" + address + "' )";
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/listVolunteer');
                });
          }
      });
    },

    
    deleteVolunteer: (req, res) => {
        let idVol = req.params.idVol;
        let deleteVolQuery = 'DELETE FROM volunteer WHERE idVol = ?';


                db.query(deleteVolQuery, [idVol], (err, result) => {
                    if (err) {
                        //console.log(JSON.stringify(db));
                        return res.status(500).send(err);
                    }
                    res.redirect('/listVolunteer');
                });
    },

    
    editVolunteerPage: (req, res) => {
        let idVol = req.params.idVol;
        let query = "SELECT * FROM `volunteer` WHERE idVol = ?";
        db.query(query, [idVol], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('editVolunteer.ejs', {
                title: "Edit Volunteer Page"
                ,volunteer: result[0]
                ,message: ''
            });
        });
    },

    editVolunteer: (req, res) => {
        let idVol = req.params.idVol;
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
       
        let query = "UPDATE `volunteer` SET `firstName` = '" + firstName + "', `lastName` = '" + lastName + "' WHERE `idVol` = ?";
        db.query(query, [idVol], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/listVolunteer');
        });
    },

    detailVolunteer: (req, res) =>  {
        let idVol = req.params.idVol;
       
            let query = "SELECT * FROM `volunteer` where idVol = ? "; // query database to get all the events
            // execute query
            db.query(query, [idVol], (err, result) => {
                if (err) {
                    res.redirect('/listVolunteer');
                }
                res.render('detailVolunteer.ejs', {
                    title: "Voluntary Event" ,
                    volunteer: result
                });
            });
        },
   

};