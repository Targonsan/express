const express = require('express');
const router = express.Router();
const  News =require('../models/news')
const defaultSort=-1;
// tutaj chodiz o to ze podajemy parametry w wyszukiwarce po & a przed ? i w zalenzosci czy jest 1 czy -1 robia nams ie inne rzeczy czyli sortowanie malejeco/rosnąco
/* GET home page. */
router.get('/', (req, res)=> {
    console.log(req.params);
  const search =req.query.search || '';
  let sort =req.query.sort || defaultSort;// tutaj cos bąld był?

  if(sort !== -1 || sort !== 1){
      sort = defaultSort;
  }
  const findNews=News
  .find({title: new RegExp(search.trim(),'i')})
  .sort({created: sort})// nie wiem co tu sie dzieje sortuje od najmeisjze lub od najweiskzej chyba
  .select('_id title description')// co chemy aby nam zwrócił w opdowiedzi !!
  ;

  findNews.exec((err,data)=>{
    
    res.json(data);
});
});

// metoda do ponbiernaia jednego artykułu 1!!

router.get('/:id', (req, res)=> {
  
    const id= req.params.id;
     console.log(req.params);

    const findNews=News
    .findById(id);// wpisuje po /api/(id nszego artykułu w bazie danych)

  
    findNews.exec((err,data)=>{
      
      res.json(data);
  });
  });
// probowałem co sswojeog tuta zrobic
//   router.get('/:description', (req, res)=> {
  
//     const description= req.params.description;
//      console.log(req.params, 'asdasasd');

//     const findNews=News
//     .find(description);// wpisuje po /api/(id nszego artykułu w bazie danych)

  
//     findNews.exec((err,data)=>{
      
//       res.json(data);
//   });
//   });

module.exports = router;
