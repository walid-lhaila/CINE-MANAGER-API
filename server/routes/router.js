import express from 'express';
import authController from '../controller/authController.js'
import adminController from '../controller/adminController.js'
import  {authMiddleware}  from '../middleware/authMiddleware.js';
import upload from '../middlewares/upload.js';
import movieController from '../controller/movieController.js';
import hallController from '../controller/hallController.js';
import sessionController from '../controller/sessionController.js';
import reservationController from "../controller/reservationController.js";
import multer from 'multer';

const route = express.Router();
const upload = multer({ dest: 'uploads/' });


// AUTHENTIFICATION ROUTES API
route.post('/api/createClient', authController.create);
route.post('/api/login', authController.login);
route.post('/api/logout', authMiddleware(), authController.logout);

// RESET PASSWORD ROUTES API
route.post('/api/password-reset', authController.requestPasswordReset);
route.post('/api/reset-password/:token', authController.resetPassword);

// ADMIN ROUTES API
route.post('/api/createAdmin', authMiddleware(['admin']), adminController.addAdmin);
route.put('/api/updateAdmin/:id', authMiddleware(['admin']), adminController.updateAdmin);
route.delete('/api/deleteAdmin/:id', authMiddleware(['admin']), adminController.deleteAdmin);
route.get('/api/getAllAdmins', authMiddleware(['admin']), adminController.getAllAdmins);


// MOVIE ROUTES API
route.post('/api/createMovie', upload, authMiddleware(['admin']), movieController.addMovie);
route.put('/api/updateMovie/:id', authMiddleware(['admin']), movieController.updateMovie);
route.delete('/api/deleteMovie/:id', authMiddleware(['admin']), movieController.deleteMovie);
route.get('/api/getAllMovies', authMiddleware(['admin']), movieController.getAllMovies);


// HALL ROUTES API
route.post('/api/createHall', authMiddleware(['admin']), hallController.addHall);
route.put('/api/updateHall/:id', authMiddleware(['admin']), hallController.updateHall);
route.delete('/api/deleteHall/:id', authMiddleware(['admin']), hallController.deleteHall);
route.get('/api/getAllHall', authMiddleware(['admin']), hallController.getAllHall);


// SESSION ROUTES API
route.post('/api/createSession', authMiddleware(['admin']), sessionController.addSession);
route.put('/api/updateSession/:id', authMiddleware(['admin']), sessionController.updatedSession);
route.delete('/api/deleteSession/:id', authMiddleware(['admin']), sessionController.deleteSession);
route.get('/api/getAvailableSession', authMiddleware(['admin']), sessionController.getAvailableSessions);


// RESERVATION ROUTES API
route.post('/api/reserveSeat', authMiddleware(['client']), reservationController.reserveSeat);
route.put('/api/updateReservation/:id', authMiddleware(['client']), reservationController.updateReservation);
route.delete('/api/deleteReservation/:id', authMiddleware(['client']), reservationController.deleteReservation);




export default route;