import express from 'express'
import { UserController } from '../controllers/user.controller';
import { CommentController } from '../controllers/comments.controller';

const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res)=>new UserController().login(req, res)
)

userRouter.route('/getAllUsers').get(
    (req, res)=>new UserController().getAllUsers(req, res)
)

userRouter.route('/getMyInfo').post(
    (req, res)=>new UserController().getMyInfo(req, res)
)

userRouter.route('/deleteUser').post(
    (req, res)=>new UserController().deleteUser(req, res)
)

userRouter.route('/updateProfileClient').post(
    (req, res)=>new UserController().updateProfileClient(req, res)
)

userRouter.route('/updateProfileAgency').post(
    (req, res)=>new UserController().updateProfileAgency(req, res)
)

userRouter.route('/register').post(
    (req, res)=> new UserController().register(req, res)
)

userRouter.route('/checkUsername').post(
    (req, res)=> new UserController().checkUsername(req, res)
)

userRouter.route('/checkMail').post(
    (req, res)=> new UserController().checkMail(req, res)
)

userRouter.route('/changePassword').post(
    (req, res)=>new UserController().changePassword(req, res)
)

userRouter.route('/getAllAgencies').get(
    (req, res) => new UserController().getAllAgencies(req, res)
)

userRouter.route('/getAllComments').post(
    (req, res)=>new CommentController().getAllComments(req, res)
)

userRouter.route('/acceptReg').post(
    (req, res)=>new UserController().acceptReg(req, res)
)

userRouter.route('/declineReg').post(
    (req, res)=>new UserController().declineReg(req, res)
)

userRouter.route('/getAllRequestsForReg').get(
    (req, res)=>new UserController().getAllRequestsForReg(req, res)
)

userRouter.route('/deleteComment').post(
    (req, res)=>new CommentController().deleteComment(req, res)
)

userRouter.route('/updateComment').post(
    (req, res)=>new CommentController().updateComment(req, res)
)

userRouter.route('/leaveComment').post(
    (req, res)=>new CommentController().leaveComment(req, res)
)

userRouter.route('/CommentLeft').post(
    (req, res)=>new CommentController().CommentLeft(req, res)
)

userRouter.route('/searchAgencyByName').post(
    (req, res)=> new UserController().searchAgencyByName(req, res)
)

userRouter.route('/searchAgencyBoth').post(
    (req, res)=> new UserController().searchAgencyBoth(req, res)
)

userRouter.route('/searchAgencyByAddress').post(
    (req, res)=> new UserController().searchAgencyByAddress(req, res)
)

export default userRouter