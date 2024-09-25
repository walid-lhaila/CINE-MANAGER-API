import express from 'express';
import authController from '../controller/authController.js'
import adminController from '../controller/adminController.js'
import  {authMiddleware}  from '../middleware/authMiddleware.js';
import movieController from '../controller/movieController.js';
import hallController from '../controller/hallController.js';
import hallService from '../services/hallService.js';
import sessionController from '../controller/sessionController.js';

const route = express.Router();


// REGISTERATION AND LOGIN AND LOG OUT API
route.post('/api/createClient', authController.create);
route.post('/api/login', authController.login);
route.post('/api/logout', authMiddleware(), authController.logout); 


// ADMIN ROUTES API
route.post('/api/createAdmin', authMiddleware(['admin']), adminController.addAdmin);
route.put('/api/updateAdmin/:id', authMiddleware(['admin']), adminController.updateAdmin);
route.delete('/api/deleteAdmin/:id', authMiddleware(['admin']), adminController.deleteAdmin);
route.get('/api/getAllAdmins', authMiddleware(['admin']), adminController.getAllAdmins);


// MOVIE ROUTES API
route.post('/api/createMovie', authMiddleware(['admin']), movieController.addMovie);
route.put('/api/updateMovie/:id', authMiddleware(['admin']), movieController.updateMovie);
route.delete('/api/deleteMovie/:id', authMiddleware(['admin']), movieController.deleteMovie);
route.get('/api/getAllMovies', authMiddleware(['admin']), movieController.getAllMovies);


// HALL ROUTES API
route.post('/api/createHall', authMiddleware(['admin']), hallController.addHall);
route.put('/api/updateHall/:id', authMiddleware(['admin']), hallController.updateHall);
route.delete('/api/deleteHall/:id', authMiddleware(['admin']), hallController.deleteHall);
route.get('/api/getAllHall', authMiddleware(['admin']), hallService.getAllHall);


// SESSION ROUTES API
route.post('/api/createSession', authMiddleware(['admin']), sessionController.addSession);
route.put('/api/updateSession/:id', authMiddleware(['admin']), sessionController.updatedSession);
route.delete('/api/deleteSession/:id', authMiddleware(['admin']), sessionController.deleteSession);
route.get('/api/getAvailableSession', authMiddleware(['admin']), sessionController.getAvailableSessions);

export default route;