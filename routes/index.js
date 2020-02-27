// this page is to get home page

module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT * FROM `event` ORDER BY idEvent ASC"; // query database to get all the events
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: "Voluntary Event" ,
                event: result
            });
        });
    
    },

    
};

// valuntary list eklemek icin burada render etmek gerekiyor ustteki gibi -----------


