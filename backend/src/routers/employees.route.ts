import express from 'express'
import { EmployeesController } from '../controllers/employees.controller';

const employeeRouter = express.Router();

employeeRouter.route('/getAllEmployees').post(
    (req, res)=>new EmployeesController().getAllEmployees(req, res)
)

employeeRouter.route('/requestOpeningPositions').post(
    (req, res)=>new EmployeesController().requestOpeningPositions(req, res)
)

employeeRouter.route('/getAllRequests').get(
    (req, res)=>new EmployeesController().getAllRequests(req, res)
)

employeeRouter.route('/allowPositions').post(
    (req, res)=>new EmployeesController().allowPositions(req, res)
)

employeeRouter.route('/rejectPositions').post(
    (req, res)=>new EmployeesController().rejectPositions(req, res)
)

employeeRouter.route('/addEmployee').post(
    (req, res)=>new EmployeesController().addEmployee(req, res)
)

employeeRouter.route('/hire').post(
    (req, res)=>new EmployeesController().hire(req, res)
)

employeeRouter.route('/deleteEmployee').post(
    (req, res)=>new EmployeesController().deleteEmployee(req, res)
)

employeeRouter.route('/getAllEmployeesAdmin').get(
    (req, res)=>new EmployeesController().getAllEmployeesAdmin(req, res)
)

employeeRouter.route('/getMyInfo').post(
    (req, res)=>new EmployeesController().getMyInfo(req, res)
)

employeeRouter.route('/getAvailableEmployees').post(
    (req, res)=>new EmployeesController().getAvailableEmployees(req, res)
)

employeeRouter.route('/updateEmployee').post(
    (req, res)=>new EmployeesController().updateEmployee(req, res)
)

export default employeeRouter