## [TailWind](https://tailwindcss.ru/)

### Плагины для VSCode:
* ### Tailwind CSS IntelliSense

### Установка в проект:

* Установите tailwindcss и его одноранговые зависимости, а затем создайте файлы tailwind.config.js и postcss.config.js.

```yarn add -D tailwindcss postcss autoprefixer```
```npx tailwindcss init -p```

* ### Настройте пути к шаблону

Добавьте пути ко всем файлам вашего шаблона в файл tailwind.config.js.

```css
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
* ### Добавьте директивы Tailwind в свой CSS
Добавьте директивы @tailwind для каждого из слоев Tailwind в ваш файл ./src/index.css.

```css
/** index.css */

@tailwind base;
@tailwind components;
@tailwind utilities;

```

* ### Начните процесс сборки
Запустите процесс сборки с помощью yarn dev.

* ### Добавьте в package.json в "scripts": {"build": ""}
```json
...
"scripts": {
    "dev": "vite",
    "build": "tailwindcss build -i src/assets/sass/index.css -o public/styles.css --watch",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
```
```
yarn build
```
в папке public появится style.css со стилями tailwind

## [Ресурс с иконками для tailwind](https://heroicons.com/)