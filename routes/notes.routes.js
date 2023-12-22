const express = require('express');


const router = express.Router();

router.get('/notes',function(req,res){
res.render('visitors/notes/all-notes');
});

module.exports = router; 