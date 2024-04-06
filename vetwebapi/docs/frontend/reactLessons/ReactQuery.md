# React Query https://tanstack.com/query/v3/docs/framework/react/installation
```
yarn add react-query
```

* ## Подключаем к проекту
```jsx
// main.jsx

iimport React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query'
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

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render( 
    <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </QueryClientProvider>
        
    </React.StrictMode>
       
)
```
