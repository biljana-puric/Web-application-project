import express from 'express'
import { ObjectsController } from '../controllers/objects.controller';

const objectRouter = express.Router();

objectRouter.route('/getAllObjects').post(
    (req, res)=>new ObjectsController().getAllObjects(req, res)
)

objectRouter.route('/getMyInfo').post(
    (req, res)=>new ObjectsController().getMyInfo(req, res)
)

objectRouter.route('/addObject').post(
    (req, res)=>new ObjectsController().addObject(req, res)
)

objectRouter.route('/updateObject').post(
    (req, res)=>new ObjectsController().updateObject(req, res)
)

objectRouter.route('/uploadObject').post(
    (req, res)=>new ObjectsController().uploadObject(req, res)
)

objectRouter.route('/deleteObject').post(
    (req, res)=>new ObjectsController().deleteObject(req, res)
)

objectRouter.route('/finishRoom').post(
    (req, res)=>new ObjectsController().finishRoom(req, res)
)

export default objectRouter