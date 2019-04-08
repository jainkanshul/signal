const express = require("express");

const Post = require("../models/post");
const objUserDetail = require("../models/userdetail");

const router = express.Router();
const apn = require('apn');
let options = {
  token: {
      key: "/Users/anshuljain/Documents/POCS/Angular POC/enhancing-03-finished/backend/routes/AuthKey_PW59LC8R37.p8",
      keyId: "PW59LC8R37",
     teamId: "C6932K24MK"
   },
   production: true

 };

module.exports = function (io,userList) {


router.post("", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    services: req.body.services
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id

    });
    sendPushNotificationiOS(req.body.title, req.body.services);
    sendPushNotificationandroid(req.body.title, req.body.services);

    io.emit("messagelist", {"title":req.body.title,"content":"","services":req.body.services});

  });
});




function sendPushNotificationiOS(title, services)
{
  var emailArray = []
  var sorted = []
  for (var i=0; i<userList.length; i++) {
    emailArray.push(userList[i]["nickname"])
    }
     let query =  {$and:[{"Email" : {$nin : emailArray}},{"devicetype":"ios"},{"services":{$in:services}},{"devicetoken":{$ne:""}}]};
     objUserDetail.find(query).then(documents => {
      var deviceTokenArray = []
      if(documents.length > 0)
      {
        for (var i=0; i<documents.length; i++) {
          if(documents[i]["devicetoken"])
          {
          deviceTokenArray.push(documents[i]["devicetoken"])
          }
          }
        let apnProvider = new apn.Provider(options);
        // Replace deviceToken with your particular token:
       let deviceToken = deviceTokenArray;
      // Prepare the notifications
       let notification = new apn.Notification();
       notification.expiry = Math.floor(Date.now() / 1000) + 24 * 3600; // will expire in 24 hours from now
      //   notification.badge = 2;
       notification.alert = "Push Notfication Message";
       notification.payload = {'title': title,'services':services};
      // Replace this with your app bundle ID:
       notification.topic = "com.Mesaging.expert";
      //  notification.topic = "chat.fujitsu.com";
      // Send the actual notification
       apnProvider.send(notification, deviceToken).then( result => {
        // Show the result of the send operation:
        apnProvider.shutdown
        });
      }
  });

}


function sendPushNotificationandroid(title, services)
{


}

router.post("/uniquePost", (req, res, next) => {
  console.log(req.body["services[]"]);
  let servicesArray =  req.body["services[]"]
  var sorted = []
  if(typeof servicesArray != 'string')
  {
  for(var i = 0 ; i < servicesArray.length ; i++)
  {
    sorted.push({"services":servicesArray[i]})
  }
}
else
{
  sorted.push({"services":servicesArray})
}
  let query = {$or:sorted};
  Post.find(query).sort('-date').skip(parseInt(req.body.skipnumber)).limit(parseInt(req.body.limit)).then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents
    });
  });
});

router.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({ _id: req.params.id }, post).then(result => {
    res.status(200).json({ message: "Update successful!" });
  });
});

router.get("", (req, res, next) => {
  Post.find().sort('-date').then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents
    });
  });
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});

return router;
};
