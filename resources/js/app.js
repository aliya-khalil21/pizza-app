import axios from 'axios'
import Noty from 'noty';
let add_to_cart = document.querySelectorAll('.add-to-cart');
let cartcounter=document.querySelector('#cartcounter')
function updateCart(pizza){

axios.post('/update-cart',pizza).then(res=>{
  
    cartcounter.innerText=res.data.totalQty
    new Noty({
        type:'success',
        timeout:1000,
        text: " Item added to cart",
        progressBar:false
      }).show(); 

})
.catch(err=>{
    new Noty({
        type:'error',
        timeout:1000,
        text: " something went wrong",
        progressBar:false
      }).show(); 
    
})
}
add_to_cart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        
        let pizza=JSON.parse(btn.dataset.pizza)
        updateCart(pizza)
        
    });
});
