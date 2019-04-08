const express = require("express");

const MessageObj = require("../models/messagetemplate");
const router = express.Router();


router.post("/template", (req, res, next) => {

      const messageObj = new MessageObj({
        prefix: req.body.preffix,
        suffix: req.body.suffix,
        message: req.body.message,
        templatename: req.body.templatename,
      });
      messageObj.save().then(createdMessageObj => {
        res.status(201).json({
          message: "UserDetail added successfully",
          MessageObjId: createdMessageObj._id
        });
      });
  });

  router.get("", (req, res, next) => {
    MessageObj.find().sort('-createddate').then(documents => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: documents
      });
    });
  });


module.exports = router
