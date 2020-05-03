const express = require('express');
const router = express.Router();
const Quiz =require('../models/quiz')

/* GET home page. */
router.get('/', (req, res)=> {// dane wysłane ! ngłowki bodyitd parametry typu query!
  //res to odpowiedz od serwera naszego do uzytkownaiak 
  // console.log('dupa');
  // new Quiz({title: 'pytniae 1' ,vote: 0 }).save() linijka ktora utowryzla nasz model w bazie !
  const show =!req.session.vote;// keidy bedzie 0 to nie poakzac a jak 1 to poakzać formularz 1!
  console.log(show);
  Quiz.find({},(err,data)=>{
    let sum =0;
    data.forEach((item)=>{
      sum += item.vote;
    })

    // console.log(data);// czy pokazuja sie nasze dane z bazdy mongodb

    res.render('quiz', { title: 'Quiz', data,show, sum });//wazne pamietac trzeba aby uzupelnic o to co cemy przesłać
  });
  
});

router.post('/', (req, res)=> {
  const id=req.body.quiz;
  Quiz.findOne({_id: id },(err,data)=>{//wywukiwamy quiz zwikszmay o 1 i dodajemy 1!
    // console.log(data);
    data.vote=data.vote+1;
    data.save((err)=>{// zeby rediredct wykonał sie dopiero w momencie jak wykona sie nam nasze save
      req.session.vote=1; // coockie y  nie dalo sie wiecje niz 1 głosowac ? nie wiem jak to dokałdnie działa jeszcze 1!!
      res.redirect('/quiz');
    });
    // jest to zmiana w bezposrednio wyszukanym findOne 

  //  res.redirect('/quiz');
  });
  
});

module.exports = router;
