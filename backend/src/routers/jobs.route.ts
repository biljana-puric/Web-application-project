import express from 'express'
import { JobController } from '../controllers/jobs.controller';

const jobRouter = express.Router();

jobRouter.route('/addJob').post(
    (req, res)=>new JobController().addJob(req, res)
)

jobRouter.route('/getAllJobs').post(
    (req, res)=>new JobController().getAllJobs(req, res)
)

jobRouter.route('/getAllRequests').post(
    (req, res)=>new JobController().getAllRequests(req, res)
)

jobRouter.route('/declineJob').post(
    (req, res)=>new JobController().declineJob(req, res)
)

jobRouter.route('/sendOffer').post(
    (req, res)=>new JobController().sendOffer(req, res)
)

jobRouter.route('/acceptOffer').post(
    (req, res)=>new JobController().acceptOffer(req, res)
)

jobRouter.route('/declineOffer').post(
    (req, res)=>new JobController().declineOffer(req, res)
)

jobRouter.route('/getAllActiveJobs').post(
    (req, res)=>new JobController().getAllActiveJobs(req, res)
)
jobRouter.route('/payForJob').post(
    (req, res)=>new JobController().payForJob(req, res)
)
jobRouter.route('/acceptCancelling').post(
    (req, res)=>new JobController().acceptCancelling(req, res)
)
jobRouter.route('/declineCancelling').post(
    (req, res)=>new JobController().declineCancelling(req, res)
)
jobRouter.route('/cancelJob').post(
    (req, res)=>new JobController().cancelJob(req, res)
)
jobRouter.route('/getAllJobsAdmin').get(
    (req, res)=>new JobController().getAllJobsAdmin(req, res)
)
jobRouter.route('/getAllCancelling').get(
    (req, res)=>new JobController().getAllCancelling(req, res)
)
export default jobRouter