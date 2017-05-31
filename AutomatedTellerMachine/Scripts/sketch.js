//JOSEPH MALAFRONTE
//UADM TWITTER BOT Version 1.4
//Must use with Bot node.js file
//Must include p5.js library


//Global variable declarations
var lineX = 0;
var dataWordMentions;
var dataProfileTweets;
var userTweetsArr;
var catDataArr = [];
var tweets;
var tweetsFromUser;
var includeRetweets = 1; //1: include   2:Do not
var Done = 0;
var tweetBoxNum = -1;
var prevCheck = 0;
var firstRunCheck = 0;

//Tweet Object declaration
function tweetObj(tweetText, rtNum, month, day) {
    this.tweetText = tweetText;
    this.rtNum = rtNum;
    this.favNum = 0;
    this.month = month;
    this.day = day;
    this.circleW = 0;
    this.cirlceH = 0;
    this.circleR = 0;
    this.profPic = 0;
    this.rtPic = 0;
    this.rtUserName = 0;
    this.isRt = 0;
}

function isDefined(x) {
    var undefined;
    return x !== undefined;
}

function ConvertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}

function ConvertToArrayCSV(data) {
    var answer = "";
    var firstObj = data[0];

    var firstRunCheck = 0;
    for (check in data[0]) {
        if (firstRunCheck == 0) {
            firstRunCheck = 1;
        }
        else answer += ",";
        answer += "\"";
        answer += check.toString();
        answer += "\"";
        
    }
    answer += "\n"

    for (var i = 0; i < data.length; i++) {
        var objRun = data[i];
        var runCheck = 0;
        for (check in objRun) {
            if (runCheck == 0) {
                runCheck = 1;
            }
            else answer += ",";
            answer += "\"";
            answer += objRun[check].toString();
            answer += "\"";
        }
        answer += "\n"
    }

    return answer;
}


function downloadCSV() {
    var csvA = ConvertToArrayCSV(userTweetsArr);

    var a = document.createElement('a');
    a.href = 'data:attachment/csv,' + encodeURIComponent(csvA);
    a.target = '_blank';
    a.download = 'myFile.csv';

    document.body.appendChild(a);
    a.click();
}


//Reset Function for the sketch
function resetSketch() {

    

    //Reset tweet arrays
    tweetsFromUser = 0;
    catDataArr = [];

    var userId = "UADanceMarathon";

    tweets = dataWordMentions.statuses;

    tweetsFromUser = dataProfileTweets;

    //Create a new array of tweets that is only the most recent 20 tweets
    //Do not include retweets if specified
    if (includeRetweets == 1) {
        if (tweetsFromUser.length > 20) {
            for (var i = 0; i < 20; i++) {
                catDataArr.push(tweetsFromUser[i]);
            }
        }
        else catDataArr = tweetsFromUser;
    }
    else {
        console.log("test");
        if (tweetsFromUser.length > 20) {
            var i = 0;
            while (catDataArr.length != 20 && i != tweetsFromUser.length) {
                var tS = tweetsFromUser[i].text;
                if (tS.indexOf("RT @") < 0) {
                    catDataArr.push(tweetsFromUser[i]);
                }
                i++;
            }
        }
        else {
            for (var i = 0; i < tweetsFromUser.length; i++) {
                var tS = tweetsFromUser[i].text;
                if (tS.indexOf("RT @") < 0) {
                    catDataArr.push(tweetsFromUser[i]);
                }
            }
        }
    }

    //Create an array of tweetObjs based on the 20 most recent tweets
    userTweetsArr = [];
    randomSeed(3);
    for (var i = 0; i < catDataArr.length; i++) {
        var thisTweet = catDataArr[i];
        var tweetText = thisTweet.text;
        var rtNum = thisTweet.retweet_count;

        var dateString = thisTweet.created_at;
        var dateStringSplit = dateString.split(" ");
        var monthName = dateStringSplit[1];
        var monthNum = getMonthNum(monthName);
        var dayNum = parseInt(dateStringSplit[2]);

        var insTweet = new tweetObj(tweetText, rtNum, monthNum, dayNum);

        //Add fav count to object
        var favCount = thisTweet.favorite_count;
        insTweet.favNum = favCount;

        //Determin the tweetObj's x and y coordinates and its radius
        var h = 0; var w = 0;
        if (i % 2 == 0) h = random(130, height - 140);
        else h = random(height - 140, height - 100);

        insTweet.circleH = h;

        var exx = width / 21;
        var w = ((catDataArr.length - i) * exx);
        insTweet.circleW = w;

        var rt = rtNum * 4;
        if (rt < 25) rt = 25;
        if (rt > 150) rt = 150;
        insTweet.circleR = rt;


        //Add User Profile Pic to tweet object
        var pUrl = thisTweet.user.profile_image_url;
        insTweet.profPic = loadImage(pUrl);

        //Check if tweet is RT
        if (typeof (thisTweet.retweeted_status) == "undefined") {
            insTweet.isRt = 0;
        }
        else {
            insTweet.isRt = 1;
            var rtUrl = thisTweet.retweeted_status.user.profile_image_url;
            insTweet.rtPic = loadImage(rtUrl);
            insTweet.rtUserName = thisTweet.retweeted_status.user.screen_name;
            insTweet.tweetText = thisTweet.retweeted_status.text;
        }

        //add tweet object to tweet object array
        userTweetsArr.push(insTweet);

    }



}

//This function is run before setup
function preload() {


    //IF PULLING FROM RECENT NODE BOT RUN
    dataWordMentions = loadJSON("/Scripts/twitDataWordMentions.json");
    if (dataWordMentions) console.log("Successfully Retrieved Tweets");
    dataProfileTweets = loadJSON("/Scripts/twitDataProfileTweets.json");
    
    

    /*
    *IF PULLING FROM SAVED JSONS*
    *dataWordMentions = loadJSON("SavedDates/twitDataWordMentions4-17.json");
    *dataProfileTweets = loadJSON("SavedDates/twitDataProfileTweets4-17.json");
    ***/
}

//This function is run before the draw function
function setup() {

    

    var canvas = createCanvas(1000, 500);
    canvas.parent('sketch-holder');

    resetSketch();
    //console.log(data);

    
    
}


//Helper function, send it a month abreviation and it returns its month number
function getMonthNum(monthName) {
    var monthNum = 0;

    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

    monthNum = months.indexOf(monthName) + 1;

    return monthNum;

}




//Draw function is constantly running and redrawing the sketch
function draw() {


    if (!tweetsFromUser) return;
    
    
    //Check if RT switch is toggled or not
    //Reset on change
    var htmlRtSwitch = document.getElementById("myonoffswitch");
    if (htmlRtSwitch.checked && prevCheck == 1) {
        if (prevCheck == 1) lineX = 0;
        includeRetweets = 1;
        if (prevCheck == 1) resetSketch();
        prevCheck = 0;
        Done = 0;
    }
    else if(!htmlRtSwitch.checked && prevCheck == 0) {
        if(prevCheck == 0)lineX = 0;
        includeRetweets = 0;
        if (prevCheck == 0) resetSketch();
        prevCheck = 1;
        Done = 0;
    }

    randomSeed(5);
    background(51); // Gray background

    //Check that tweets array has been created before attempting to draw circles
    if (tweetsFromUser) {
        for (var j = catDataArr.length; j > 0; j--) {
            var tweet = userTweetsArr[j - 1];

            rt = tweet.circleR;
            var rtOrg = tweet.rtNum;

            if (tweet.isRt == 1) fill('#709be0');
            else if (rtOrg < 3) fill('white');
            else if (rtOrg < 15) fill('orange');
            else fill('red');

            var month = tweet.month;
            var day = tweet.day;


            var w = tweet.circleW;
            var h = tweet.circleH;

            //If "scanner line" has reached the middle of the circle display the circle
            if (w <= lineX) {
                ellipse(w, h, rt, rt);
                noStroke();
                textSize(24);
                fill('black');
                textAlign(CENTER);
                text(rtOrg, w, h + 8);

                noStroke();
                textSize(18);
                fill('white');
                textAlign(CENTER);
                text(tweet.month.toString() + '/' + tweet.day.toString(), w, height - 10);
            }
        }
    }


    //Display Header Info
    //Sketch Title
    if (tweets) {
        noStroke();
        textSize(24);
        fill(255);
        textAlign(CENTER);
        text('Retweet Tracker', width / 2, 30);
    }

    //In progress text
    if (Done == 0) {
        noStroke();
        textSize(20);
        fill(255);
        textAlign(CENTER);
        text('Scanning Twitter Data...', width / 2, 60);
    }

    //Scan complete text
    if (Done == 1) {
        noStroke();
        textSize(20);
        fill(255);
        textAlign(CENTER);
        text('Scan Complete', width / 2, 50);
    }


    //"Line reader" that scans through the sketch
    stroke(255);
    line(lineX, 0, lineX, height);
    var xSpeed = 1.3 ; //Change this number to change speed that line scans the document
    lineX = lineX + xSpeed;
    //if scan line passes the frame set Done var to 1
    if (lineX > width) {
        lineX = lineX - xSpeed;
        Done = 1;
    }

    //Checks if the user has clicked on a tweet
    //If so display the tweet information based on tweetBoxNum
    if (tweetBoxNum > -1) {
        var displayTweet = userTweetsArr[tweetBoxNum];
        //Create box
        stroke('black');
        if (displayTweet.isRt == 0) fill('white');
        else fill('#709be0');
        rect(width / 2 - 225, height / 2 - 125, 450, 250, 20);

        //From User
        if (displayTweet.isRt == 0) {
            noStroke();
            textSize(20);
            fill('black');
            textAlign(LEFT);
            image(userTweetsArr[tweetBoxNum].profPic, width / 2 - 210, height / 2 - 110);
            text("@UADanceMarathon", width / 2 - 150, height / 2 - 95, 400, 80);
        }
        else {
            noStroke();
            textSize(20);
            fill('black');
            textAlign(LEFT);
            image(displayTweet.rtPic, width / 2 - 210, height / 2 - 110);
            text("RT @" + displayTweet.rtUserName, width / 2 - 150, height / 2 - 95, 400, 80);
        }
        

        //Tweet Text
        var pString = userTweetsArr[tweetBoxNum].tweetText;
        noStroke();
        textSize(15);
        fill('black');
        textAlign(LEFT);
        text(pString, width / 2 - 210, height / 2 - 45, 400, 80);


        //Retweet Count
        var rtCount = userTweetsArr[tweetBoxNum].rtNum;
        noStroke();
        textSize(15);
        fill('black');
        textAlign(LEFT);
        text('Retweet Count: ' + rtCount.toString(), width / 2 - 210, height / 2 + 20, 400, 80);

        //Favorite Count
        var favCount = userTweetsArr[tweetBoxNum].favNum;
        noStroke();
        textSize(15);
        fill('black');
        textAlign(LEFT);
        text('Favorite Count: ' + favCount.toString(), width / 2 - 210, height / 2 + 40, 400, 80);

        //RETURN BOX
        fill('blue');
        rect(width / 2 - 60, height / 2 + 74, 120, 40, 20);
        noStroke();
        textSize(20);
        fill('white');
        textAlign(LEFT);
        text("RETURN", width / 2 - 40, height / 2 + 100);

    }

}


function mousePressed() {

    //** May want to change this so only can check tweet if scan is complete
    if (1) {

        //Check if tweet info box is currently pulled up if so close it
        if (tweetBoxNum > -1) {
            tweetBoxNum = -1;
            return;
        }

        //If tweet box is not pulled up check if mouse is in tweet circle
        //If it is set the tweetBoxNum to that tweet's array location
        for (var i = 0; i < userTweetsArr.length; i++) {
            var thisTweet = userTweetsArr[i];
            var d = dist(mouseX, mouseY, thisTweet.circleW, thisTweet.circleH);
            if (d < thisTweet.circleR / 2 && lineX >= thisTweet.circleW) {
                //createElement('p',thisTweet.tweetText);
                //console.log(thisTweet.tweetText);
                tweetBoxNum = i;
            }
        }

    }

}

