const fs = require('fs');

module.exports = {


    listJoining: (req, res) => {
        // let query = "SELECT idJoin, firstName, eventName FROM volunteer v inner join joining j on j.Volunteer_idVol = v.idVol inner join event e on e.idEvent = j.Event_idEvent"; // query database to get all the joining
        
        let query = "SELECT * from joining";
    
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/listJoining');
            }
            res.render('listJoining.ejs', {
                title: "List Joining Page" ,
                joining: result
            });
        });
    },

    

    addJoiningPage: (req, res) => {
        res.render('addJoining.ejs', {
            title: "Add Joining Page" ,
            message: ''
        });
    },


    
    addJoining: (req,res) => {
        if(req.files) {
            return res.status(400).send("No files were uploaded.");
        }

        let message = '';
        let Event_idEvent = req.body.Event_idEvent;
        let Volunteer_idVol = req.body.Volunteer_idVol;
        
       
                // send the volunteer's details to the database
                let query = "INSERT INTO `joining` (Event_idEvent, Volunteer_idVol) VALUES ('" +
                Event_idEvent + "', '" + Volunteer_idVol + "' )";
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/listJoining');
                });
       
    },

    
    deleteJoining: (req, res) => {
        let idJoin = req.params.idJoin;
        let deleteJoinQuery = 'DELETE FROM joining WHERE idJoin = ?';


                db.query(deleteJoinQuery, [idJoin], (err, result) => {
                    if (err) {
                        //console.log(JSON.stringify(db));
                        return res.status(500).send(err);
                    }
                    res.redirect('/listJoining');
                });
    },


};