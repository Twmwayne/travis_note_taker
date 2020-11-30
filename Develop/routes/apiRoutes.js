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