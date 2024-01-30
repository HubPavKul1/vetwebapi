import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import "./assets/css/style.css";
import "./assets/css/bootstrap.css";
// import "./assets/css/animate.css";
// import "./assets/css/icomoon.css";
// import "./assets/css/magnific-popup.css"
// import "./assets/css/owl.carousel.min.css";
// import "./assets/css/owl.theme.default.min.css";
// import "./assets/css/flexslider.css";
// import "./assets/fonts/flaticon/font/flaticon.css";



import App from './App';


ReactDOM.createRoot(document.getElementById('root')).render( 
    <React.StrictMode>
        <BrowserRouter>
             <App />
        </BrowserRouter>
    </React.StrictMode>
       
)
