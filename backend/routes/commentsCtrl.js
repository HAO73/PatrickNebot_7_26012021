var models = require('../models');
var asyncLib = require('async');
var jwtUtils = require('../utils/jwt.utils');

const CONTENT_LIMIT = 2;
const ITEMS_LIMIT = 50;

// Routes
module.exports = {
  createComment: function (req, res) {
    // Getting auth header
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);

    // Variables


    var content = req.body.content;
    var messageId = req.body.messageId;
    var username = req.body.username



    if (content == null) {
      return res.status(400).json({ 'error': 'missing parameters' });
    }

    if (content.length <= CONTENT_LIMIT) {
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


          models.Comment.create({
            username: username,
            messageId: messageId,
            content: content,
            userId: userFound.id
          })
            .then(function (newComment) {
              done(newComment);
            })


        } else {
          res.status(404).json({ 'error': 'user not found' })
        };
      }
    ], function (newComment) {
      if (newComment) {
        return res.status(201).json(newComment);
      } else {
        return res.status(500).json({ 'error': 'cannot post comment' });
      }
    });
  },

  listComments: function (req, res) {
    var fields = req.query.fields;
    var limit = parseInt(req.query.limit);
    var offset = parseInt(req.query.offset);
    var order = req.query.order;

    if (limit > ITEMS_LIMIT) {
      limit = ITEMS_LIMIT;
    }

    models.Comment.findAll({
      order: [(order != null) ? order.split(':') : ['ASC']],
      attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
      limit: (!isNaN(limit)) ? limit : null,
      offset: (!isNaN(offset)) ? offset : null,
      include: [{
        model: models.User,
        attributes: ['username'],
        model: models.Message,
        attributes: ['id']
      }]
    }).then(function (comments) {
      if (comments) {
        res.status(200).json(comments);
      } else {
        res.status(404).json({ "error": "no comments found" });
      }
    }).catch(function (err) {
      console.log(err);
      res.status(500).json({ "error": "invalid fields" });
    });
  },

  deleteComment: function (req, res) {
    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);


    main()

    async function main() {

      let isAdmin = await isAdmin2()


      if (userId < 1)
        return res.status(400).json({ 'error': 'Mauvais token' });

      if (isAdmin || userId >= 1) {


        models.Comment.findOne({

          where: {
            // messageId : req.params.messageId,
            id: req.params.id
          }
        })
          .then(com => {
            models.Comment.destroy({
              attributes: ['content'],
              where: { id: req.params.id }
            }).then(function (com) {
              if (com) {
                res.status(201).json({ "success": "Commentaire supprimé" });
              } else {
                res.status(404).json({ 'error': 'Commentaire non trouvé' });
              }
            }).catch(function (err) {
              res.status(500).json({ 'error': 'cannot fetch commentaire' });
            })

          })

      }

    }
    function isAdmin2() {

      return models.User.findOne({ attributes: ['isAdmin'], where: { id: userId } });
    };

  }

}