const express = require('express');
const News =require('../models/news') //konwencaj nakazje nazywnaie modeli z duzej litery

const router = express.Router();

router.all('*',(req,res,next)=>{// gwiazdka oznacza ze wykona sie pod kazdym routerem admin?  zadziała w kazdje przestrzeni nazw admin?XD admi router jetz zdainiciowany tylko pod adminem 
  //na kazdy adress odapli sie ta metoda 1! kazdy request mozemy tturaj sprawdizc !!
  if(!req.session.admin)
  {
    res.redirect('login')//przkeirowywuje nas jezlei ktos cche wejsc na dmin a nie zalogował sie !!
    return;//konczy działanie funkcji
  }
//sesje zapisuja sie po stronie klienta w fomeir coockies z flaga http 
  next();
})

/* GET home page. */
router.get('/', (req, res)=> {// dane wysłane ! ngłowki bodyitd parametry typu query!
  // //res to odpowiedz od serwera naszego do uzytkownaiak 
  // // console.log(req.session.admin);
  // const newsData=new News({
  //   title: 'tytuł testowy',
  //   description: 'opis'
  // })
  // newsData.save((err)=>{
  //   console.log(err);
  // });

  News.find({}, (err,data)=> {// bo bedzie robione asynchornicznie funkcaj w w funkcji
    console.log(data);// w data powinny byc wszystie parametry do tej poty tam dodane
    res.render('admin/index', { title: 'Admin', data });
  });
  // metoda find zwraca nam wszystkie w tym przypadku beda to newsy
});
 


router.get('/news/add',(req,res)=>{//sciezka !!!
  res.render('admin/news-form',{title:'Dodaj new', body: {}, errors: {} })//co sie pojawi
});
//przechwytywanie danych z formularza

router.post('/news/add',(req,res)=>{
  const body =req.body;// mamy tu dane dostepne
   //res to odpowiedz od serwera naszego do uzytkownaiak 
  // console.log(req.session.admin);
  const newsData = new News(body);
  const errors = newsData.validateSync();// metoda do validacji !!
  console.log(errors);
 
  newsData.save((err)=>{
    if(err)
    { 
      res.render('admin/news-form', { title: 'Dodaj new', errors, body })

      return;
    }

    res.redirect('/admin')

  });

  // res.render('admin/news-form',{title:'Dodaj new', errors, body})//co sie pojawi ale w przypadku bledu !
});
//  tu ebdzie usuwanie
// bedzie przehcowywac identyfikator  z abzy danych o id ktor bedizmey usuwac i wedlug id bedzimey potem susuwac
// nasze /:id oznacza ze tobediz eparametr ktory mzoemy sobnie dowolnie nazwyać!
// ta nazwe ebdzie sie poberac z routingu i na jego podsatwie usuwamy 1!! 
router.get('/news/delete/:id',(req,res)=>{//sciezka !!!
  // jest bardzo duzo metod po News. które sa niezwykłe!!
  // req.params est domyslnie?
  News.findByIdAndDelete(req.params.id,(err)=>{
    res.redirect('/admin')
    //  nie osbulguje bledu tylko przekierowywuwje na admina?XD
  });
});
module.exports = router;
