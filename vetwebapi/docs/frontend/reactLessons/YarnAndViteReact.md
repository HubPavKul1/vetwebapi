# Создание проекта с помощью пакетного менеджера Yarn https://yarnpkg.com/
* ### Установка

* ### Установим npm
> sudo apt install npm

* ### Проверим наличие nvm
> ls -a | grep .nvm

* ### Если папки нет 
> git clone http://github.com/creationix/nvm.git .nvm

* ### Затем
>source ~/.nvm/nvm.sh

* ### Обновим nvm
> nvm install 20.11.0

* ### Установим yarn
> npm install -g yarn

* ### Текущая установленная версия yarn
> yarn -v

* ### Список доступных команд
> yarn help

```
  Usage: yarn [command] [flags]

  Displays help information.

  Options:

    --cache-folder <path>               specify a custom folder that must be used to store the yarn cache
    --check-files                       install will verify file tree of packages for consistency
    --cwd <cwd>                         working directory to use (default: D:\VscodeProjects\react\react_yarn)
    --disable-pnp                       disable the Plug'n'Play installation
    --emoji [bool]                      enable emoji in output (default: false)
    --enable-pnp, --pnp                 enable the Plug'n'Play installation
    --flat                              only allow one version of a package
    --focus                             Focus on a single workspace by installing remote copies of its sibling workspaces.
    --force                             install and build packages even if they were built before, overwrite lockfile     
    --frozen-lockfile                   don't generate a lockfile and fail if an update is needed
    --global-folder <path>              specify a custom folder to store global packages
    --har                               save HAR output of network traffic
    --https-proxy <host>
    --ignore-engines                    ignore engines check
    --ignore-optional                   ignore optional dependencies
    --ignore-platform                   ignore platform checks
    --ignore-scripts                    don't run lifecycle scripts
    --json                              format Yarn log messages as lines of JSON (see jsonlines.org)
    --link-duplicates                   create hardlinks to the repeated modules in node_modules
    --link-folder <path>                specify a custom folder to store global links
    --modules-folder <path>             rather than installing modules into the node_modules folder relative to the cwd, output them here
    --mutex <type>[:specifier]          use a mutex to ensure only one yarn instance is executing
    --network-concurrency <number>      maximum number of concurrent network requests
    --network-timeout <milliseconds>    TCP timeout for network requests
    --no-bin-links                      don't generate bin links when setting up packages
    --no-default-rc                     prevent Yarn from automatically detecting yarnrc and npmrc files
    --no-lockfile                       don't read or generate a lockfile
    --non-interactive                   do not show interactive prompts
    --no-node-version-check             do not warn when using a potentially unsupported Node version
    --no-progress                       disable progress bar
    --offline                           trigger an error if any required dependencies are not available in local cache
    --otp <otpcode>                     one-time password for two factor authentication
    --prefer-offline                    use network only if dependencies are not available in local cache
    --preferred-cache-folder <path>     specify a custom folder to store the yarn cache if possible
    --prod, --production [prod]
    --proxy <host>
    --pure-lockfile                     don't generate a lockfile
    --registry <url>                    override configuration registry
    -s, --silent                        skip Yarn console logs, other types of logs (script output) will be printed
    --scripts-prepend-node-path [bool]  prepend the node executable dir to the PATH in scripts
    --skip-integrity-check              run install without checking if node_modules is installed
    --strict-semver
    --update-checksums                  update package checksums from current repository
    --use-yarnrc <path>                 specifies a yarnrc file that Yarn should use (.yarnrc only, not .npmrc) (default: )
    -v, --version                       output the version number
    --verbose                           output verbose messages on internal operations
    -h, --help                          output usage information
  Commands:
    - access
    - add
    - audit
    - autoclean
    - bin
    - cache
    - check
    - config
    - create
    - exec
    - generate-lock-entry / generateLockEntry
    - global
    - help
    - import
    - info
    - init
    - install
    - licenses
    - link
    - list
    - login
    - logout
    - node
    - outdated
    - owner
    - pack
    - policies
    - publish
    - remove
    - run
    - tag
    - team
    - unlink
    - unplug
    - upgrade
    - upgrade-interactive / upgradeInteractive
    - version
    - versions
    - why
    - workspace
    - workspaces
```
* ### Создадим новый проект с компилятором vite https://vitejs.dev/

> yarn create vite


```
PS D:\VscodeProjects\react\react_yarn> yarn create vite
yarn create v1.22.21
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...

success Installed "create-vite@5.1.0" with binaries:
      - create-vite
      - cva
√ Project name: ... cars-catalog
√ Select a framework: » React
√ Select a variant: » JavaScript

Scaffolding project in D:\VscodeProjects\react\react_yarn\cars-catalog...

Done. Now run:

  cd cars-catalog
  yarn
  yarn dev       

Done in 40.00s.
```
* ### Перейдем в директорию с проектом

> PS D:\VscodeProjects\react\react_yarn> cd cars-catalog

* ### Установка всех зависимостей из package.json

> yarn install или yarn

## В корне проекта создается файл yarn.lock

* ## Запуск проекта 
> yarn dev

## Обновление и удаление пакетов

Обновление пакетов происходит с помощью команды upgrade:

### Обновление пакетов

> yarn upgrade [package]

В данном примере мы обновим сразу несколько пакетов, записав их списком:

> yarn upgrade jquery fancybox

### Удаление пакетов

> yarn remove [package]

Например:

> yarn remove jquery

## Полезная ссылка по шрифтам https://gwfh.mranftl.com/fonts

### Home.jsx

```js
import styles from "./Home.module.css"

// Импортируем данные по машинам из файла cars.data.js
import { cars } from "./Cars.data"



function Home() {
  
    return (
      <div>
        <h1>Cars Catalog</h1>
        <div>
        // В цикле проверяем наличие карточек и отображаем карточки с данными из cars.data.js
            {cars.length ? cars.map(car =>(
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
                    <button>Read more</button>
                </div>
            </div>

            ))
            : <p>There are no cars</p>
        }
            
        </div>       
      </div>
    )
  }
  
  export default Home
```
## Проведем декомпозицию 
* ### В папке home создадим новую папку car-item, в ней создадим файл CarItem.jsx и перенесем код с карточкой машины из Home.jsx

### CarItem.jsx
```js
import styles from "../Home.module.css"


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
                <button>Read more</button>
            </div>
        </div>        
    )
}

export default CarItem
```
### Home.jsx
```js
import { cars } from "./Cars.data"
import CarItem from "./car-item/CarItem"


function Home() {
  
    return (
      <div>
        <h1>Cars Catalog</h1>
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
### Можно поставить фильтр с кэшированием с использованием хука useMemo
```js
import { useMemo } from "react"
import { cars } from "./Cars.data"
import CarItem from "./car-item/CarItem"


function Home() {
    const filterCars = useMemo(
        () => cars.filter(car => car.price < 500000), []
    )

    return (
      <div>
        <h1>Cars Catalog</h1>
        <div>
            {filterCars.length ? filterCars.map(car =>(
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

# Добавляем новый объект через форму
* ## создаем файл в папке home/create-car-form CreateCarForm.jsx
```js
import { useState } from "react" 
import styles from "./CreateCarForm.module.css"


const CreateCarForm = ({setCars}) => {
    const [name, setName] = useState("") 
    const [price, setPrice] = useState("") 
    const [image, setImage] = useState("") 

    const createCar = (e) => {
        e.preventDefault()    
        setCars(prev => [...prev, { id: prev.length + 1, name, price, image }])
    }
    
    return (
       <form className={styles.form}>
        <input 
            placeholder="Name" 
            onChange={e => setName(e.target.value)} 
            value={name} />
        <input 
            placeholder="Price"
            onChange={e => setPrice(e.target.value)} 
            value={price} 
        />
      
        <input 
            placeholder="Image"
            onChange={e => setImage(e.target.value)} 
            value={image}
        />
       

        <button className="btn" onClick={e => createCar(e)}>Create</button>
       </form>
    )
}

export default CreateCarForm
```
## файл Home.jsx
```js
import { useState } from "react"
import { cars as carsData} from "./cars.data.js"
import CarItem from "./car-item/CarItem"
import CreateCarForm from "./create-car-form/CreateCarForm"


function Home() {
  const [cars, setCars] = useState(carsData)
  console.log(cars)
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
### CreateCarForm.module.css
```css
.form {
    margin: 10px auto 30px;
}

.form input {
    padding: 5px 10px;
    border: none;
    outline: none;
    transition: border-color 0.4s ease;
    border: solid transparent;
    margin-bottom: 10px;
}

.form input:focus {
    border-color: aqua ;
}
```
* ## Рефакторим форму создания объекта
```js
import { useState } from "react" 
import styles from "./CreateCarForm.module.css"



const clearData = {
    name: "",
    price: "",
    image: "",
}

const CreateCarForm = ({ setCars }) => {
    const [data, setData] = useState(clearData) 
    
    const createCar = (e) => {
        e.preventDefault()  
    
        setCars(prev => [
            { 
              id: prev.length + 1,
              ...data, 
            }, 
            ...prev,
        ]),
    
        setData(clearData)
    }
   
    return (
       <form className={styles.form}>
          <input 
            placeholder="Name" 
            onChange={e => setData(prev => ({
                ...prev, name: e.target.value
            }))} 
            value={data.name}
          />
          <input 
            placeholder="Price"
            onChange={e => setData(prev => ({
                ...prev, price: e.target.value
            }))} 
            value={data.price} 
          />
          <input 
            placeholder="Image"
            onChange={e => setData(prev => ({
                ...prev, image: e.target.value
            }))} 
            value={data.image}
          />
       
          <button className="btn" onClick={e => createCar(e)}>Create</button>
       </form>
    )
}

export default CreateCarForm
```
## Можно установить json-server 
> npm install -g json-server
### Запустим сервер и базу данных
> json-server db.json -p 4200

### Получим данные о машинах с сервера с помощью useEffect()
```js
import { useEffect, useState } from "react"
import { cars as carsData} from "./cars.data.js"
import CarItem from "./car-item/CarItem"
import CreateCarForm from "./create-car-form/CreateCarForm"


function Home() {
  const [cars, setCars] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:4200/cars"
      )
      const data = await response.json()

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