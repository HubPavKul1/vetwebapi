import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom';

import "./assets/css/style.css";
import "./assets/css/bootstrap.css";
import "./assets/css/animate.css";
// import "./assets/css/icomoon.css";
// import "./assets/css/magnific-popup.css"
// import "./assets/css/owl.carousel.min.css";
// import "./assets/css/owl.theme.default.min.css";
// import "./assets/css/flexslider.css";
// import "./assets/fonts/flaticon/font/flaticon.css";



import { App } from './App';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render( 
    <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </QueryClientProvider>
        
    </React.StrictMode>
       
)