'use strict';

let fs = require('fs'),
    mongojs = require('mongojs'),
    colors = require('colors'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    https = require('https'),
    http = require('http'),
    Twitter = require('twitter'),
    request = require('request'),
    querystring = require('querystring'),
    cookieParser = require('cookie-parser'),
    Client = require('node-rest-client').Client;

var client = new Client();

let dbConnectionString = '';

var ignitionSwitch = true;

if (ignitionSwitch) {

    dbConnectionString = 'mongodb://heroku_td9mdp69:vl3o3hsj6e61ib7kiaul0vsjrd@ds139725.mlab.com:39725/heroku_td9mdp69';

} else {

    dbConnectionString = 'todo';
}

var db = mongojs(dbConnectionString, ['todo']);


app.use(cookieParser());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use(express.static('public'));

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {

    console.log('\n');
    console.log('********************************************'.black.bgWhite);
    console.log("The frontend server is running on port 5000!".black.bgWhite);
    console.log('********************************************'.black.bgWhite);
    console.log('\n');

});

app.get('/', function (req, res) {

    console.log('\n');
    console.log('******* INCOMING GET REQUEST - Load Template *******'.black.bgWhite);
    console.log('\n');

    var html = fs.readFileSync('public/views/base.html');
    res.end(html);

});

app.get('/outermost', function (req, res) {

    console.log('\n');
    console.log('******* INCOMING GET REQUEST - Load Template *******'.black.bgWhite);
    console.log('\n');

    db.todo.find().limit(1).sort({
        _id: -1
    }, function (err, docs) {
        console.log(docs);
        res.json(docs)
    })

});

app.post('/sort-by-month', function (req, res) {

    let query = req.body.query.toUpperCase();

    console.log(query);
    console.log('\n');
    console.log('******* INCOMING sort-by-month GET sort-by-month REQUEST - Load Template *******'.black.bgWhite);
    console.log('\n');

    db.todo.find({
        month: query
            //, month: query  
    }, function (err, docs) {
        //  console.log(docs)
        //  console.log(docs)
        res.json(docs)
    })

});

app.get('/homebrew', function (req, res) {

    console.log('\n');
    console.log('******* INCOMING GET REQUEST - Load Template *******'.black.bgWhite);
    console.log('\n');

    db.todo.find(function (err, docs) {
        // console.log(docs)
        res.json(docs)

    })

});

app.post('/homebrew', function (req, res) {

    console.log('\n');
    console.log('******* INCOMING POST REQUEST - Load Template *******'.black.bgWhite);
    console.log('\n');
    // console.log(req.body); // 
    console.log('\n');
    console.log('\n' + "THE BODY.ID");
    console.log(req.body._id);
    console.log('\n' + "THE BODY.NAME");
    console.log(req.body.name);
    console.log('\n' + "THE BODY.DAY");
    console.log(req.body.day);
    console.log('\n' + "THE BODY.MONTH");
    console.log(req.body.month);
    console.log('\n' + "THE BODY.NAME");
    console.log(req.body.name);
    console.log('\n');

    var then = new Date(req.body.date);
    console.log(typeof then);

    console.log(then.getMonth());
    console.log(then.getDay());
    console.log(then.getDay());
    console.log(then.getDay());
    console.log(then.getDay());
    console.log(convertThisMonth(then.getMonth()));

    let requestObject = {
        _id: req.body._id,
        date: req.body.date,
        day: 'TEST',
        month: convertThisMonth(then.getMonth()),
        name: req.body.name,
    }

    db.todo.insert(requestObject, function (err, docs) {

        console.log(docs)
        res.json(docs)

    })

});

app.delete('/homebrew/:id', function (req, res) {

    // let id = req.data;
    let id = req.params.id;
    console.log('\n');
    console.log('******* INCOMING DELETE REQUEST - Load Template *******'.black.bgWhite);
    console.log('\n');
    console.log('THE ID TO DELETE: ' + id);
    console.log('\n');

    db.todo.remove({
        _id: mongojs.ObjectId(id)
    }, function (err, docs) {

        console.log(docs)
        res.json(docs)

    })

});


// GET A SPECIFIC ENTRY
// GET A SPECIFIC ENTRY
// GET A SPECIFIC ENTRY
app.get('/homebrew/:id', function (req, res) {

    let id = req.params.id;
    console.log('\n');
    console.log('******* INCOMING CUSTOM GET REQUEST - Load Template *******'.black.bgWhite);
    console.log('\n');
    console.log(id);
    console.log('\n');

    db.todo.findOne({
        _id: mongojs.ObjectId(id)
    }, function (err, docs) {
        console.log(docs)
        res.json(docs);
    });

});
// GET A SPECIFIC ENTRY
// GET A SPECIFIC ENTRY
// GET A SPECIFIC ENTRY

app.put('/homebrew/:id', function (req, res) {

    let id = req.body._id;
    console.log('\n');
    console.log('******* INCOMING CUSTOM PUT REQUEST - Load Template *******'.black.bgWhite);
    console.log('\n');
    // console.log(id);
    console.log('\n' + "THE BODY.ID");
    console.log(req.body._id);
    console.log('\n' + "THE BODY.NAME");
    console.log(req.body.name);
    console.log('\n' + "THE BODY.DAY");
    console.log(req.body.day);
    console.log('\n' + "THE BODY.MONTH");
    console.log(req.body.month);
    console.log('\n' + "THE BODY.NAME");
    console.log(req.body.name);
    console.log('\n');

    db.todo.findAndModify({
        query: {
            _id: mongojs.ObjectId(id)
        },
        update: {
            $set: {
                date: req.body.date,
                day: req.body.day,
                month: req.body.month,
                name: req.body.name
            }
        },
        new: true
    }, function (err, docs) {
        console.log(docs)
        res.json(docs);
    });

});

function convertThisMonth(i) {


    switch (i) {
    case 0:
        return "JAN"
        break
    case 1:
        return "FEB"
        break
    case 2:
        return "MAR"
        break
    case 3:
        return "APR"
        break
    case 4:
        return "MAY"
        break
    case 5:
        return "JUN"
        break
    case 6:
        return "JUL"
        break
    case 7:
        return "AUG"
        break
    case 8:
        return "SEP"
        break
    case 9:
        return "OCT"
        break
    case 10:
        return "NOV"
        break
    case 11:
        return "DEC"
        break

    }
}