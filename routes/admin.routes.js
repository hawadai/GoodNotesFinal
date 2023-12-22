const express = require('express');

const adminController = require('../controllers/admin.controller');
const pdfUploadMiddleware = require('../middlewares/pdf-upload');

const router = express.Router();

router.get('/notes',adminController.getNotes);
 
router.get('/notes/new',adminController.getNewNotes);

router.post('/notes',pdfUploadMiddleware,adminController.createNewNotes);

router.get('/notes/:id',adminController.getUpdateNote);

router.post('/notes/:id',pdfUploadMiddleware,adminController.updateNote);


module.exports = router; 