const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var userList = [];
const adminuserRoutes = require("./routes/adminuser");


const app = express();

var http = require('http').Server(app);
const PORT = process.env.PORT || 1000


var io = require('socket.io')(http);

http.listen(PORT, function(){
  console.log(`Listening on ${ PORT }`);
});


io.on('connection', function(clientSocket){
  console.log('a user connected');
    clientSocket.on('join', (params, callback) => {
        clientSocket.join(params.room)
    });

  clientSocket.on('disconnect', function(){
      console.log('user disconnected');

      for (var i=0; i<userList.length; i++) {
          if (userList[i]["id"] == clientSocket.id) {
            userList.splice(i, 1);
              break;
          }
        }
  });


  clientSocket.on("exitUser", function(clientNickname){
      for (var i=0; i<userList.length; i++) {
          if (userList[i]["id"] == clientSocket.id) {
              userList.splice(i, 1);
              break;
          }
      }
  });


  clientSocket.on("connectUser", function(clientNickname,deviceToken) {
      var message = "User " + clientNickname + " was connected.";
      console.log(message);
      var userInfo = {};
      var foundUser = false;
      for (var i=0; i<userList.length; i++) {
          if (userList[i]["nickname"] == clientNickname) {
              userList[i]["id"] = clientSocket.id;
              userInfo = userList[i];
              foundUser = true;
              break;
          }
      }

      if (!foundUser) {
          userInfo["id"] = clientSocket.id;
          userInfo["nickname"] = clientNickname;
          userList.push(userInfo);
      }

  });

});




const postsRoutes = require("./routes/posts")(io,userList);
const userRoutes = require("./routes/userdetails");
const messagestemplate = require("./routes/messagestemplate");


mongoose
  .connect(
    "mongodb://superAdmin:admin123@75.98.169.159/admin"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});


app.use("/api/posts", postsRoutes);
app.use("/api/userdetails", userRoutes);
app.use("/posttemplate", messagestemplate);

app.use("/api/adminuser", adminuserRoutes);

module.exports = app;
