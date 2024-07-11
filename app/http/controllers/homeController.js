const menu=require('../../models/menu')
function homeController(){
  return{
    async index(req,res){
      //menu.find().then(function(pizza){
       //console.log(pizza)
        //return res.render('home',{pizza:pizza})
    //})
    const pizza=await menu.find() 
   
      return res.render('home',{pizza:pizza})


  }    
}

}
module.exports=homeController