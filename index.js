'use strict';

const http = require('http');
const config = require('./config.js');
const path = require('path');
const fs = require('fs');
const express = require('express');



const bodyParser = require('body-parser');
const { env } = require('process');
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

// Create Express webapp
var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Functions
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    res.header('Access-Control-Allow-Credentials', 'true')
        next();
});

const searchFull = (filename, text) => {
    return new Promise((resolve) => {
        text = text.replaceAll(/\[/g, "").replaceAll(/\]/g, "")
        const regEx = new RegExp(text, "i")
        const result = [];
        fs.readFile(filename, 'utf8', function (err, contents) {
            let lines = contents.toString().split("\n");
            lines.forEach(line => {
                if (line && line.search(regEx) >= 0) {
                    result.push(line)
                }
            })
            resolve(result);
        })
    });
}

const tail = (filename) => {
    return new Promise((resolve) => {
        var result = [];
        fs.readFile(filename, 'utf8', function (err, contents) {
            let lines = contents.toString().split("\n");
            result=lines.slice(-100)
            resolve(result);
        })
    });
}


//routes
app.get('/search', (request, response) => {
      

    let text = request.query.search
    if(text!==''&& text){
        searchFull(config.file1,text)
        .then(function(res){
            var result={}
            result.vistaapi=res
            searchFull(filename2,text)
            .then(function(res){
                result.vetext=res
                return response.send(result)
            })
            
        })
    
    }else{
        tail(filename)
        .then(function(res){
            var result={}
            result.vistaapi=res
            tail(config.file2)
            .then(function(res){
                result.vetext=res
                return response.send(result)
            })
        })
    }
    });




var server = http.createServer(app);
var port = process.env.PORT || 4567;
server.listen(port, () => {
  console.log('Express server running on *:' + port);

});

