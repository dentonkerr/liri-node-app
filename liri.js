require("dotenv").config();

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");

var action = process.argv[2];

var keys = require('./keys.js');
var twitterClient = new Twitter(keys.twitter);
var spotifyClient = new Spotify(keys.spotify);

switch (action) {
    case "my-tweets":
      myTweets();
      break;
  
    case "spotify-this-song":
      spotifySong();
      break;
  
    case "movie-this":
      movieThis();
      break;
  
    case "do-what-it-says":
      doWhatSays();
      break;
  };

function myTweets() {
   
    var params = {screen_name: 'GTBootcampTest'};
    twitterClient.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {

            for (i = 0; i < 19 && tweets.length; i++) {
                console.log("-------------");
                console.log(tweets[i].created_at);
                console.log(tweets[i].text);
            };
        }
    });
};

function spotifySong() {

    var songName = process.argv[3];

    if (!songName) {
        songName = "The Sign Ace of Base";
    };
 
    spotifyClient.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
        return console.log('Error occurred: ' + err);
        }

        var data = data.tracks.items[0];
            
            console.log("----------");
            console.log("Artist's Name: " + data.artists[0].name);
            console.log("Song Name: " + data.name);
            console.log("Preview URL: " + data.preview_url);
            console.log("Album Name: " + data.album.name);
            console.log("----------");

    });
};

function movieThis() {

    var movieName = process.argv[3];

    if (!movieName) {
        movieName = "Mr. Nobody";
    };
    
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function(error, response, body) {

        if (!error && response.statusCode === 200) {

            console.log("---------------------------------");
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[2].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("---------------------------------");
        };
    });
};

function doWhatSays() {

    fs.readFile("random.txt", "utf8", function(err, data) {
        
        if (err) {
          return console.log(err);
        }
    
        var output = data.split(",");
        var whatSays = output[1];

            var songName = whatSays;
        
            spotifyClient.search({ type: 'track', query: songName }, function(err, data) {
                if (err) {
                return console.log('Error occurred: ' + err);
                }
        
                var data = data.tracks.items[0];
                    
                    console.log("----------");
                    console.log("Artist's Name: " + data.artists[0].name);
                    console.log("Song Name: " + data.name);
                    console.log("Preview URL: " + data.preview_url);
                    console.log("Album Name: " + data.album.name);
                    console.log("----------");
        
            });

        });

      };