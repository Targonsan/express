const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res)=> {// dane wysłane ! ngłowki bodyitd parametry typu query!
  //res to odpowiedz od serwera naszego do uzytkownaiak 
  res.render('admin', { title: 'Admin' });
});

module.exports = router;
