const authController = require('../app/http/controllers/authController');
const homeController = require('../app/http/controllers/homeController');
const cartController = require('../app/http/controllers/customer/cartController');
const guest = require('../app/http/middleware/guest'); // Corrected path

function initRoutes(app) {
    console.log('Initializing routes...');
    app.get('/', homeController().index);
    
    app.get('/login',guest, authController().login);
    app.post('/login', authController().postlogin); // Ensure this has a valid handler

    app.get('/register', guest, authController().register);
    app.post('/register', authController().postregister); // Ensure this has a valid handler

    app.post('/logout', authController().logout);

    app.get('/cart', cartController().index);
    app.post('/update-cart', cartController().update); // Ensure this has a valid handler
    
    // Log all routes
   
}


module.exports = initRoutes;
