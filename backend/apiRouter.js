var express = require('express');
var usersCtrl = require('./routes/usersCtrl');
var messagesCtrl = require('./routes/messagesCtrl');
var commentsCtrl = require('./routes/commentsCtrl');
const multer = require('./middleware/multer-config');


///Router

exports.router = (function () {

    var apiRouter = express.Router();
    ///User routes

    apiRouter.route('/users/register/').post(usersCtrl.register);
    apiRouter.route('/users/login/').post(usersCtrl.login);
    apiRouter.route('/users/me/').get(usersCtrl.getUserProfile)
    apiRouter.route('/users/me/').put(usersCtrl.updateUserProfile);
    apiRouter.route('/users/delete').post(usersCtrl.deleteProfile);


    // Messages routes
    apiRouter.route('/messages/new/').post(multer, messagesCtrl.createMessage);
    apiRouter.route('/messages/').get(multer, messagesCtrl.listMessages);
    apiRouter.route('/messages/:id').delete(messagesCtrl.deleteMessage)


    // Comments Routes
    apiRouter.route('/comments/new/').post(commentsCtrl.createComment);
    apiRouter.route('/comments/').get(commentsCtrl.listComments);
    apiRouter.route('/comments/:id').delete(commentsCtrl.deleteComment)



    return apiRouter;

})();

