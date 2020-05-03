const express = require('express');
const router = express.Router();

const login ='admin'
const password='123'

/* GET home page. */
router.get('/', (req, res)=> {// dane wysłane ! ngłowki bodyitd parametry typu query!
  //res to odpowiedz od serwera naszego do uzytkownaiak 
  res.render('index', { title: 'Express' });
});

router.get('/login', (req, res)=> {//
  res.render('login', { title: 'Logowanie' });
});

router.post('/login',(req,res)=>{
  const body=req.body; //przypisuje do zmiennej body nasze zapytanie servera to co zwrócy

  if(body.login===login && body.password===password)
  {
    req.session.admin=1;//admin to moja azwa tylko 1! session to zmienan globalna chyba
    //https://www.npmjs.com/package/cookie-session
    res.redirect('/admin')// przekierownaie jezlei sie uda zalogowac

    console.log(req.body);
  }else{
    res.redirect('/login')
  }


  
});


module.exports = router;

//instalujemy biblioteke cookie-session !