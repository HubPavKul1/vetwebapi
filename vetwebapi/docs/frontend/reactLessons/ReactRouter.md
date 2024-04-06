## Роутер
### Установим react-router-dom https://reactrouter.com/en/main/start/tutorial
> yarn add react-router-dom

### Папке components создадим файл Router.jsx
```js
import { BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./screens/home/Home"

const Router = () => {
    return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
    )
}

export default Router
```
### Файл main.jsx изменим:
```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './components/screens/home/Home'
import "./assets/styles/global.css"
import Router from './components/Router'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
)
```
