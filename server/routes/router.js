import express from 'express';
import authController from '../controller/authController.js'
import adminController from '../controller/adminController.js'
import  {authMiddleware}  from '../middleware/authMiddleware.js';
import movieController from '../controller/movieController.js';
import hallController from '../controller/hallController.js';
import clientController from '../controller/clientController.js';
import sessionController from '../controller/sessionController.js';
import reservationController from "../controller/reservationController.js";
import commentController from '../controller/commentController.js';
import upload from '../middleware/upload.js'
import categoryController from '../controller/categoryController.js';
import ratingController from '../controller/ratingController.js';
import favorisController from '../controller/favorisController.js';

const route = express.Router();


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
route.get('/api/getAllMovies', movieController.getAllMovies);
route.get('/api/getMovieDetails/:id', movieController.getMovieById);


// HALL ROUTES API
route.post('/api/createHall', authMiddleware(['admin']), hallController.addHall);
route.put('/api/updateHall/:id', authMiddleware(['admin']), hallController.updateHall);
route.delete('/api/deleteHall/:id', authMiddleware(['admin']), hallController.deleteHall);
route.get('/api/getAllHall', authMiddleware(['admin']), hallController.getAllHall);


// SESSION ROUTES API
route.post('/api/createSession', authMiddleware(['admin']), sessionController.addSession);
route.put('/api/updateSession/:id', authMiddleware(['admin']), sessionController.updatedSession);
route.delete('/api/deleteSession/:id', authMiddleware(['admin']), sessionController.deleteSession);
route.get('/api/getAvailableSession', sessionController.getAvailableSessions);
route.get('/api/getSessionById/:id', sessionController.getSessionById);
route.get('/api/getLatestSessions', sessionController.getLatestSessions);


// RESERVATION ROUTES API
route.post('/api/reserveSeat', authMiddleware(['client']), reservationController.reserveSeat);
route.put('/api/updateReservation/:id', authMiddleware(['client']), reservationController.updateReservation);
route.delete('/api/deleteReservation/:id', reservationController.deleteReservation);
route.get('/api/myReservations', authMiddleware(['client']), reservationController.myReservations);


// CLIENTS ROUTES API
route.get('/api/getAllClients', authMiddleware(['admin']), clientController.getAllClients);


// CATEGORIES ROUTES API 
route.post('/api/createdCategory', authMiddleware(['admin']), categoryController.addCategory);
route.get('/api/getAllCategories', authMiddleware(['admin']), categoryController.getAllCategories);
route.delete('/api/deleteCategory/:id', authMiddleware(['admin']), categoryController.deleteCategory);

// COMMENTS ROUTES API
route.post('/api/createComment/:id', authMiddleware(['client']), commentController.addComment);
route.delete('/api/deleteComment/:movieId/:commentId', authMiddleware(['client']), commentController.deleteComment);
route.put('/api/updateComment/:movieId/:commentId', authMiddleware(['client']), commentController.updateComment);

// RATING ROUTES API 
route.post('/api/addRating/:id', authMiddleware(['client']), ratingController.addRating);

//FAVORITE ROUTES API
route.post('/api/addFavorite', authMiddleware(['client']), favorisController.addFavorite); 
route.delete('/api/deleteFavorite', authMiddleware(['client']), favorisController.deleteFavorite); 

export default route;