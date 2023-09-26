import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routers/user.route';
import objectRouter from './routers/objects.route';
import jobRouter from './routers/jobs.route';
import employeeRouter from './routers/employees.route';
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
//app.use(express.json());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// const multer = require('multer');
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, '../photos'); // Promenite 'path/to/destination' sa željenim putanjom za čuvanje slika
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname);
//     }
// });
  
// const upload = multer({ storage: storage });

mongoose.connect('mongodb://127.0.0.1/projekat')
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log("db connected")
})

const router = express.Router()
app.use('/user', userRouter)
app.use('/jobs', jobRouter)
app.use('/object', objectRouter)
app.use('/employees', employeeRouter)
app.use('/', router)
app.listen(4000, () => console.log(`Express server running on port 4000`));