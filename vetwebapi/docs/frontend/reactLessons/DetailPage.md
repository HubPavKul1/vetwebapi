## Детальная страница товара 

### В car.service.js добавим сервис получения детальной страницы машины
```js
import axios from "axios"


export const CarService = {
    async getAll() {
      const response = await axios.get("http://localhost:4200/cars")
      return response.data
    },

    async getById(id) {
        const response = await axios.get(`http://localhost:4200/cars?id=${id}`)
        return response.data[0]
      },


}
```

### В папке screens создадим папку car-detail, в ней файл CarDetail.jsx
```js
import { useParams } from "react-router-dom"
import { CarService } from "../../../services/car.service"
import { useEffect, useState } from "react"
import CarItem from "../home/car-item/CarItem"

const CarDetail = () => {

    const {id} = useParams()
    const [car, setCar] = useState({})

    useEffect(() => {
        if(!id) return

        const fetchData = async () => {
          const data = await CarService.getById(id)
          
          setCar(data)
        }
        fetchData()
      }, [id])
    
    if (!car.name) return <p>Loading...</p>  

    return (
        <div>
          <CarItem car={car}/>
        </div>
    )
}

export default CarDetail
```
### Добавим route в файл Router.jsx
```js
import { BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./screens/home/Home"
import CarDetail from "./screens/car-detail/CarDetail"

const Router = () => {
    return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<CarDetail />} path="/car/:id" />

        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
    )
}

export default Router
```
### Ссылка на главную страницу используем Link из react-router-dom, чтобы страница не перезагружалась
```js
import { Link, useParams } from "react-router-dom"
import { CarService } from "../../../services/car.service"
import { useEffect, useState } from "react"
import CarItem from "../home/car-item/CarItem"

const CarDetail = () => {

    const {id} = useParams()
    const [car, setCar] = useState({})

    useEffect(() => {
        if(!id) return

        const fetchData = async () => {
          const data = await CarService.getById(id)
          
          setCar(data)
        }
        fetchData()
      }, [id])
    
    if (!car.name) return <p>Loading...</p>  
    
    return (
        <div>
          <Link to="/">Back</Link>
          <CarItem car={car}/>
        </div>
    )
}

export default CarDetail
```
### Ссылка на детальную страницу в файле CarItem.jsx используем Link из react-router-dom
```js
import styles from "../Home.module.css"
import { Link } from "react-router-dom"


function CarItem({ car }) {
    return (
        <div key={car.id} className={styles.item}>
            <div 
            className={styles.image} 
            style={{
                backgroundImage: `url(${car.image})`,
            }}
            >
            </div>
            <div className={styles.info}>
                <h2>{car.name}</h2>
                <p>{new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }
                ).format(car.price)}</p>
                <Link className="btn" to={`/car/${car.id}`}>Read more</Link>
            </div>
        </div>        
    )
}

export default CarItem
```
### Изменим стили для кнопки в global.css
```css
.btn {
    display: flex; 
    justify-content: center;
    align-items: center;
    padding: 6px 30px;
    border: none;
    outline: none;
    border-radius: 5px;
    transition: all 0.3s ease;
    cursor: pointer;
    margin-top: 8px;
    text-decoration: none;
    color: #111;
    background-color: #fff;
    max-width: 100px;
}
```