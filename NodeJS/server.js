var express = require("express");
var app = express();
var fs = require("fs");
var sprintf = require('sprintf-js').sprintf;
var vsprintf = require('sprintf-js').vsprintf;

require('console-stamp')(console, { pattern: 'dd/mm/yyyy HH:MM:ss.l' });

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

app.get("/", function(req, res){
    res.render('index');
});
  
io.on("connection", function(socket){
    socket.on("new-connection", function(){
        socket.emit("who-are-you");
    });

    /*----------------- FOR WEB DEVICE -------------------*/
    socket.on("i-am-device", function(data){
        console.log("\n", JSON.stringify(data, null, 4));
        console.log("Device", data.DEVICE, "-", data.ID, "connected.");
    });

    /*------------------ FOR WEB APP ---------------------*/
    socket.on("i-am-web", function(){
        console.log("Web application connected.");
    });
    socket.on("web-send-login", function(data){
        console.log("\n", JSON.stringify(data, null, 4));
        var content = fs.readFileSync("public/json/web-user.json");
        var jsonContent = JSON.parse(content);
        var jsonLogin = {
            isLogin: false,
            devices:[]
        };
        for(var index in jsonContent.user){
            if(data.username == jsonContent.user[index].username && data.password == jsonContent.user[index].password){
                console.log("User", data.username, "logined!");
                jsonLogin.isLogin = true;
                jsonLogin.devices = jsonContent.user[index].devices;
                break;
            }
        }
        socket.emit("server-reponse-login", jsonLogin);
    });
});
