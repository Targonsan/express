const express = require('express');
const router = express.Router();
const  News =require('../models/news')

/* GET home page. */
router.get('/', (req, res)=> {// dane wysłane ! ngłowki bodyitd parametry typu query!
  //res to odpowiedz od serwera naszego do uzytkownaiak 
  // console.log(req.query); wyswietla nam to co sie pojawia po wpisaniu w pole z news.pug
  const search =req.query.search || '';// mam tutaj aktualnie wyszukiwana dana !! || '' zostało dodane poniewaz trim nie da sie wykonac na pustym stringu i wywala blad dlateog abys ie przed tym zabezpieczyc domyslnie keiyd nie am ma obiektu search  z reg. to jesyt on pustym stringiem
  const findNews=News
  .find({title: new RegExp(search.trim(),'i')})// wyszukuje tylko takie artykuly ktorych wartosc search bedzie pasowac
  // funkcja sort posrostuje mi dane wsyzkuwne przez find() czyli wszystkie dane
  // .sort({created: -1}) jest to sortowanie malejeca 0 bez zmian domyslnie a 1 rosnaco !
  // find({title: new RegExp(search, 'i')}) serach to ciag nzkow jaki bedizmey przesuzkiwać ! 'i' czyli niewrazliwy na wielkosc liter
  .sort({created: -1})// sa to funckje z mongooose !
  ;
// msuimy  posłuzyc sie wyrazeiiami regularnymi reg exp?   bo tma w mongosie sie robi te wyraznie beda w tym przapdku sprawic roloe wyszukiwania !! na stronie  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
  findNews.exec((err,data)=>{
    // console.log(data);
    res.render('news', { title: 'News', data, search });// przekkazujemy search bo chcmey aby nam zosyała wartosc jaka wpisywaismy w pole 1!
  });
});

module.exports = router;
