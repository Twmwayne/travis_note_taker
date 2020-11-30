// Required Modules
const fs = require("fs");
const notesData = require("../db/db.json");

module.exports = function(app){

    //========== FUNCTIONS ==========
    function writeToDB(notes){
        // Converts new JSON Array back to string
        notes = JSON.stringify(notes);
        console.log (notes);
        // Writes String back to db.json
        fs.writeFileSync("./db/db.json", notes, function(err){
            if (err) {
                return console.log(err);
            }
        });
    }

    //========== API ROUTES ==========

    // GET Method to return all notes
    app.get("/api/notes", function(req, res){
        res.json(notesData);
    });

    // POST Method to add notes
    app.post("/api/notes", function(req, res){

        // Set unique id to entry
        if (notesData.length == 0){
            req.body.id = "0";
        } else{
            req.body.id = JSON.stringify(JSON.parse(notesData[notesData.length - 1].id) + 1);
        }
        
        console.log("req.body.id: " + req.body.id);

        // Pushes Body to JSON Array
        notesData.push(req.body);

        // Write notes data to database
        writeToDB(notesData);
        console.log(notesData);

        // returns new note in JSON format.
        res.json(req.body);
    });
