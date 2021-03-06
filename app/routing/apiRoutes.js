var friendsData = require("../data/friends.js");

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friendsData);
    });

    app.post("/api/friends", function(req, res) {
        var userAnswers = req.body.answers;
        // Create variable to hold all possible matches
        var possibleMatches = [];
        var totalDiff = 0;
        // Loop through all objects in JSON array
        for (var i = 0; i < friendsData.length; i++) {
            // Create variable to hold difference between each answer array and user input
            
            
            // possibleMatches.push(totalDiff);
            // Loop through answer array in each object and get absolute value of difference from userAnswers
            for (var x = 0; x < friendsData[i].answers.length; x++) {
                var diff = Math.abs(parseInt(userAnswers[x]) - parseInt(friendsData[i].answers[x]));
                // Add each value difference from an array to find it's total difference
                totalDiff += diff;
            } 
            possibleMatches.push(totalDiff);
            // Reset the totalDiff to 0 for the next object's array to start fresh
            totalDiff = 0;
            console.log(possibleMatches);           
        }

        Array.min = function(possibleMatches) {
            return Math.min.apply(Math, possibleMatches);
        }
        var min = Array.min(possibleMatches);

        var bestMatch = friendsData[possibleMatches.indexOf(min)];

        var matchName = bestMatch.name;
        var matchPhoto = bestMatch.photo;

        console.log(matchName, matchPhoto);
        
        friendsData.push(req.body);
        res.json({
            name: matchName,
            photo: matchPhoto
        });
    });

};