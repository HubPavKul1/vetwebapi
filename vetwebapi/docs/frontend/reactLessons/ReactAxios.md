### Устанавливаем axios https://axios-http.com/

> yarn add axios

### Вместо fetch пишем axios
```js
import axios from "axios"
import { useEffect, useState } from "react"
import { cars as carsData} from "./cars.data.js"
import CarItem from "./car-item/CarItem"
import CreateCarForm from "./create-car-form/CreateCarForm"


function Home() {
  const [cars, setCars] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:4200/cars"
      )
      
      setCars(response.data)
    }
    fetchData()
  }, [])

    return (
      <div>
        <h1>Cars Catalog</h1>
          <CreateCarForm setCars={setCars}/>
        <div>
            {cars.length ? cars.map(car =>(
                <CarItem key={car.id} car={car} />
            ))
            : <p>There are no cars</p>
        }
        </div>
      </div>
    )
  }
  
  export default Home
```
## Сервисы:
* ### В папке src создадим папку services, в ней файл car.service.js
```js
import axios from "axios"


export const CarService = {
    async getAll() {
      const response = await axios.get("http://localhost:4200/cars")
      return response.data
    },
}
```
### файл Home.jsx изменим:
```js
import { useEffect, useState } from "react"
// import { cars as carsData} from "./cars.data.js"
import CarItem from "./car-item/CarItem"
import CreateCarForm from "./create-car-form/CreateCarForm"
import { CarService } from "../../../services/car.service"


function Home() {
  const [cars, setCars] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await CarService.getAll()
      
      setCars(data)
    }
    fetchData()
  }, [])

    return (
      <div>
        <h1>Cars Catalog</h1>
          <CreateCarForm setCars={setCars}/>
        <div>
            {cars.length ? cars.map(car =>(
                <CarItem key={car.id} car={car} />
            ))
            : <p>There are no cars</p>
        }
        </div>
      </div>
    )
  }
  
  export default Home
```