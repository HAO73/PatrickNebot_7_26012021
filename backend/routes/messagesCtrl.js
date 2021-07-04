// Imports
const fs = require('fs');
var models = require('../models');
var asyncLib = require('async');
var jwtUtils = require('../utils/jwt.utils');


// Constants
const TITLE_LIMIT = 2;
const CONTENT_LIMIT = 4;
const ITEMS_LIMIT = 50;






// Routes
module.exports = {
  createMessage: function (req, res) {
    // Getting auth header
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);

    // Variables

    var title = req.body.title;
    var content = req.body.content;
    var attachment = req.body.file;




    if (title == null || content == null) {
      return res.status(400).json({ 'error': 'missing parameters' });
    }

    if (title.length <= TITLE_LIMIT || content.length <= CONTENT_LIMIT) {
      return res.status(400).json({ 'error': 'invalid parameters' });
    }

    asyncLib.waterfall([
      function (done) {
        models.User.findOne({
          where: { id: userId }
        })
          .then(function (userFound) {
            done(null, userFound);
          })
          .catch(function (err) {
            return res.status(500).json({ 'error': 'unable to verify user' });
          });
      },
      function (userFound, done) {
        if (userFound) {
          if (req.file == null) {
            models.Message.create({
              title: title,
              content: content,
              attachment: 0,
              likes: 0,
              UserId: userFound.id
            })
              .then(function (newMessage) {
                done(newMessage);
              })
          }

          else {
            models.Message.create({
              title: title,
              content: content,
              attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
              likes: 0,
              UserId: userFound.id
            })
              .then(function (newMessage) {
                done(newMessage);
              })
          }


        } else {
          res.status(404).json({ 'error': 'user not found' })
        };
      }
    ], function (newMessage) {
      if (newMessage) {
        return res.status(201).json(newMessage);
      } else {
        return res.status(500).json({ 'error': 'cannot post message' });
      }
    });
  },
  listMessages: function (req, res) {
    var fields = req.query.fields;
    var limit = parseInt(req.query.limit);
    var offset = parseInt(req.query.offset);
    var order = req.query.order;

    if (limit > ITEMS_LIMIT) {
      limit = ITEMS_LIMIT;
    }

    models.Message.findAll({
      order: [(order != null) ? order.split(':') : ['title', 'ASC']],
      attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
      limit: (!isNaN(limit)) ? limit : null,
      offset: (!isNaN(offset)) ? offset : null,
      include: [{
        model: models.User,
        attributes: ['username']
      }]
    }).then(function (messages) {
      if (messages) {
        res.status(200).json(messages);
      } else {
        res.status(404).json({ "error": "no messages found" });
      }
    }).catch(function (err) {
      console.log(err);
      res.status(500).json({ "error": "invalid fields" });
    });
  },

  deleteMessage: function (req, res) {
    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);


    main()

    async function main() {

      let isAdmin = await isAdmin2()


      if (userId < 1)
        return res.status(400).json({ 'error': 'Mauvais token' });

      if (isAdmin || userId >= 1) {


        models.Message.findOne({

          where: { id: req.params.id }
        })
          .then(mess => {

            const filename = mess.attachment.split('/images/')[1];
            fs.unlink(`images/${filename}`, (err) => {
              if (err) {
                console.log("failed to delete local image:" + err);
              } else {
                console.log('successfully deleted local image');
              }
            })

            models.Message.destroy({
              attributes: ['title', 'content', 'attachment'],
              where: { id: req.params.id }
            }).then(function (mess) {
              if (mess) {
                res.status(201).json({ "success": "Message supprimé" });
              } else {
                res.status(404).json({ 'error': 'Message non trouvé' });
              }
            }).catch(function (err) {
              res.status(500).json({ 'error': 'cannot fetch message' });
            })

          })

      }

    }
    function isAdmin2() {

      return models.User.findOne({ attributes: ['isAdmin'], where: { id: userId } });
    };

  }

}