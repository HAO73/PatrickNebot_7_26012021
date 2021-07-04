var bcrypt = require('bcrypt');
var jwtUtils = require('../utils/jwt.utils');
var models = require('../models');
var asyncLib = require('async')

//Constants
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

//Routes

module.exports ={

register: function(req,res){

    //Params
    var email = req.body.email;
    var username=req.body.username;
    var password=req.body.password;
    var bio = req.body.bio;

      if(email == null || username == null || password == null ) {

        return res.status(400).json({'error':'missing parameters'});

      }


    //pseudo lenght, regex, password

      if(username.length>=13 || username.length<=2){
        return res.status(400).json({'error':'wrong username (must be length 2-12)'});
      }


      if(!EMAIL_REGEX.test(email)){

        return res.status(400).json({'error':'email is not valid'})

      }

      if(!PASSWORD_REGEX.test(password)){

        return res.status(400).json({'error':'password invalid (must length 4-8 and include 1 uppercase letter, 1 lowercase letter, and 1 number)'})

      }

      asyncLib.waterfall([
        function(done) {
          models.User.findOne({
            attributes: ['email'],
            where: { email: email }
          })
          .then(function(userFound) {
            done(null, userFound);
          })
          .catch(function(err) {
            return res.status(500).json({ 'error': 'unable to verify user' });
          });
        },
        function(userFound, done) {
          if (!userFound) {
            bcrypt.hash(password, 5, function( err, bcryptedPassword ) {
              done(null, userFound, bcryptedPassword);
            });
          } else {
            return res.status(409).json({ 'error': 'user already exist' });
          }
        },
        function(userFound, bcryptedPassword, done) {
          var newUser = models.User.create({
            email: email,
            username: username,
            password: bcryptedPassword,
            bio: bio,
            isAdmin: 0
          })
          .then(function(newUser) {
            done(newUser);
          })
          .catch(function(err) {
            return res.status(500).json({ 'error': 'cannot add user' });
          });
        }
      ], function(newUser) {
        if (newUser) {
          return res.status(201).json({
            'userId': newUser.id
          });
        } else {
          return res.status(500).json({ 'error': 'cannot add user' });
        }
      });
    },

    login: function(req, res) {
    
        // Params
        var email    = req.body.email;
        var password = req.body.password;
    
        if (email == null ||  password == null) {
          return res.status(400).json({ 'error': 'missing parameters' });
        }
    
        asyncLib.waterfall([
          function(done) {
            models.User.findOne({
              where: { email: email }
            })
            .then(function(userFound) {
              done(null, userFound);
            })
            .catch(function(err) {
              return res.status(500).json({ 'error': 'unable to verify user' });
            });
          },
          function(userFound, done) {
            if (userFound) {
              bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
                done(null, userFound, resBycrypt);
              });
            } else {
              return res.status(404).json({ 'error': 'user not exist in DB' });
            }
          },
          function(userFound, resBycrypt, done) {
            if(resBycrypt) {
              done(userFound);
            } else {
              return res.status(403).json({ 'error': 'invalid password' });
            }
          }
        ], function(userFound) {
          if (userFound) {
            return res.status(201).json({
              'userId': userFound.id,
              'username': userFound.username,
              'token': jwtUtils.generateTokenForUser(userFound),
              'isAdmin': userFound.isAdmin
            });
          } else {
            return res.status(500).json({ 'error': 'cannot log on user' });
          }
        });
      },

 getUserProfile: function(req, res){

    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {

     return res.status(400).json({'error':'wrong token'});
     }
    models.User.findOne({
        attributes: [ 'id', 'email', 'username', 'bio' ],
        where: { id: userId }
      }).then(function(user) {
        if (user) {
          res.status(201).json(user);
        } else {
          res.status(404).json({ 'error': 'user not found' });
        }
      }).catch(function(err) {
        res.status(500).json({ 'error': 'cannot fetch user' });
      });
    
 },

 updateUserProfile: function(req, res) {
    // Getting auth header
    var headerAuth  = req.headers['authorization'];
    var userId      = jwtUtils.getUserId(headerAuth);

    // Params
    var bio = req.body.bio;

    asyncLib.waterfall([
      function(done) {
        models.User.findOne({
          attributes: ['id', 'bio'], 
          where: { id: userId }
        }).then(function (userFound) {
          done(null, userFound);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'unable to verify user' });
        });
      },
      function(userFound, done) {
        if(userFound) {
          userFound.update({
            bio: (bio ? bio : userFound.bio)
          }).then(function() {
            done(userFound);
          }).catch(function(err) {
            res.status(500).json({ 'error': 'cannot update user' });
          });
        } else {
          res.status(404).json({ 'error': 'user not found' });
        }
      },
    ], function(userFound) {
      if (userFound) {
        return res.status(201).json(userFound);
      } else {
        return res.status(500).json({ 'error': 'cannot update user profile' });
      }
    });
  },


  deleteProfile: function(req, res) {
    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0)
        return res.status(400).json({ 'error': 'Mauvais token' });


    models.User.destroy({
        attributes: ['id', 'phone', 'username'],
        where: { id: userId }
}).then(function (user) {
    if (user) {
        res.status(201).json({"success": "Utilisateur supprimé"});
    } else {
        res.status(404).json({ 'error': 'Utilisateur non trouvé' });
    }
}).catch(function (err) {
    res.status(500).json({ 'error': 'cannot fetch user' });
});
}


}
