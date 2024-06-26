# 3.9 Блочная модель и псевдоклассы
О чём вы узнаете
В прошлом видео вы узнали, что такое блочная модель. В её основе правила, по которым браузер определяет ширину и высоту элемента. Браузер следует определённым алгоритмам, которые можно менять, чтобы настраивать параметры размеров.

В этом материале вы разберёте темы, позволяющие больше погрузиться в работу с блочной моделью. Вы узнаете о свойстве display, позволяющем выбрать способ отображения элемента, научитесь настраивать расчёт ширины и высоты блока с помощью свойства box-sizing. Также узнаете, что такое псевдоклассы и для чего они нужны. На основе полученных знаний сможете создать простую сетку.

## Свойство display
display — CSS-свойство, позволяющее настраивать способ отображения и поведения элемента относительно других элементов.

Рассмотрим четыре разных значения для свойства display, с помощью которых можно менять расположение элементов. 


## display: block;
Значение block для свойства display задаст элементу следующие настройки:

элемент будет видимым на странице;
границы элемента описывает прямоугольник;
элемент займёт всю ширину своего родительского блока (это можно изменить с помощью свойства width); 
следующий соседний элемент будет расположен под текущим.

Здесь и далее — изображения Skillbox

Посмотрите пример использования значения block по ссылке.

Многим элементам браузер по умолчанию назначает блочное поведение (display: block;) для свойства display по умолчанию. Например, для 
```html
<div>, <p>, <ul>, <h1>, <h2>, <h3>, <h4>
```
 и других.


## display: inline;
Значение inline для свойства display задаст элементу следующие настройки:

элемент будет видимым на странице;
границы элемента будут определяться его содержимым с учётом переносов на новую строку, width и height не работают;
элементы с display: inline; будут расположены последовательно друг за другом; их поведение похоже на слово в тексте, которое переносится на новую строку, если не умещается в своём блоке.

Посмотрите пример использования значения inline по ссылке.

Элементы, которым браузер назначает инлайновое (display: inline;) поведение по умолчанию: 
```html
<a>, <strong>, <b>, <i>
```
 и другие.



## display: inline-block;
Значение inline-block сочетает инлайновое и блочное поведение элемента, а именно:

элемент будет видимым на странице;
ширина и высота будут определяться содержимым этого элемента, width и height работают; 
элементы с display: inline-block; будут расположены последовательно друг за другом; их поведение похоже на слово в тексте, которое переносится на новую строку, если не умещается в своём блоке.

Посмотрите пример использования значения inline-block по ссылке.


## display: none;
Значение none для свойства display задаст элементу следующие настройки:

элемент будет невидимым на странице;
элемент не будет влиять на расположение других элементов.
Посмотрите пример использования значения none по ссылке.

Свойству display можно задавать и другие значения, которые настроят способ отображения вложенных элементов и его самого. В следующих модулях вы узнаете об этом больше.

Пример создания сетки
На текущем этапе вы знакомы лишь с некоторыми свойствами display, но уже на их основе вы можете создать что-либо интересное. Например, сетку. 

Сетка — это каркас веб-страницы, который нужен для расположения блоков внутри её элементов.

Создадим четыре элемента  ``` <div> ``` с классами col — это будут колонки сетки. Укажем настройки ширины, высоты и фона. Свойство display со значением inline-block поможет расположить элементы последовательно слева направо:

```html
<body>
  <div class="col">Колонка 1</div>
  <div class="col">Колонка 2</div>
  <div class="col">Колонка 3</div>
  <div class="col">Колонка 4</div>
</body>
```
```css
.col {
  display: inline-block;
  width: 25%;
  height: 300px;
  background-color: darkseagreen;
}
```

Пример кода можно посмотреть по ссылке.

Уберём лишние отступы у body, чтобы создаваемая стека занимала всю ширину экрана:

```css
body {
  margin: 0;
}

.col {
  display: inline-block;
  width: 25%;
  height: 300px;
  background-color: darkseagreen;
}
```

Пример кода можно посмотреть по ссылке.

Ширина каждой из четырёх колонок составляет 25%, в сумме они дадут 100% от размера экрана, но одна из колонок по-прежнему смещена и расположена внизу. Обратите внимание: между колонками есть небольшие пробелы.  Это связано с тем, что элементы с display: inline-block ведут себя почти так же, как символы в тексте. Между символами есть отступы, чтобы они не склеивались. Создадим ещё один div с классом row. Зададим ему свойство размера шрифта font-size со значением 0, а сами колонки вложим внутрь этого блока. Не забудьте вернуть колонкам размер шрифта font-size: 16px; в настройках класса col, иначе текст в колонке отображаться не будет. 
``` html  
<div class="row">
    <div class="col">Колонка 1</div>
    <div class="col">Колонка 2</div>
    <div class="col">Колонка 3</div>
    <div class="col">Колонка 4</div>
  </div>
```
```css
body {
  margin: 0;
}
.row {
  font-size: 0;
}
.col {
  display: inline-block;
  width: 25%;
  height: 300px;
  font-size: 16px;
  background-color: darkseagreen;
}
```

Пример кода можно посмотреть по ссылке.

Всё готово. Такие сетки в будущем помогут вам размещать элементы внутри её колонок в нужном месте и порядке.

## Свойство box-sizing
Не секрет, что элементам на странице можно указать внутренние отступы с помощью padding. Также рамка, которая задаётся свойством border, может повлиять на размер самого блока, что создаст путаницу, ведь за размеры блока отвечают свойства width и height. Давайте разбираться.

По умолчанию все элементы с display: block; или display: inline-block; не включают в свои размеры width и height внутренние отступы, padding и инструмент border. Это означает, фактический размер блока будет больше, чем установленный в свойствах width и height. За такое поведение расчёта размеров отвечает свойство box-sizing. 

### box-sizing — свойство, определяющее, как именно будет рассчитана общая ширина блока: с включением padding и border или без них.

Рассмотрим два значения для свойства box-sizing, с помощью которых можно менять расположение элементов. 



## box-sizing: content-box;
Значение content-box установлено для элементов по умолчанию. Это означает, что внутренние отступы и рамка будут снаружи указанной ширины и высоты блока.

Значение content-box для свойства box-sizing неудобно в работе, так как становится сложнее определить фактический размер блока, и это мешает. Поэтому его обычно отключают и переводят box-sizing в режим border-box.



## box-sizing: border-box;
Значение border-box поможет включить внутренние отступы padding и рамку в указанные размеры width и height. 

Рекомендуем устанавливать это значение для всех элементов на странице. Бывают исключения, но они встречаются очень редко.


Давайте применим знания о свойстве box-sizing для доработки сетки.

## Доработка сетки
Доработаем ранее созданную сетку и добавим колонкам внутренние отступы:

Добавим колонкам CSS-стиль, а именно внутренний отступ padding: 30px;
```css
.col {
  display: inline-block;
  padding: 30px;
  width: 25%;
  height: 300px;
  font-size: 16px;
  background-color: darkseagreen;
}
```

Пример кода можно посмотреть по ссылке.

После добавления внутренних отступов четвёртая колонка сместилась вниз. Это происходит из-за того, что к ширине колонки 25% были добавлены отступы и блок увеличился в размере, так как по умолчанию значение box-sizing: content-box и отступы не включены в ширину колонки. Исправим это, установив значение border-box для box-sizing:
```css
.col {
  display: inline-block;
  padding: 30px;
  width: 25%;
  height: 300px;
  box-sizing: border-box;
  font-size: 16px;
  background-color: darkseagreen;
}
```

Пример кода можно посмотреть по ссылке.

# Псевдоклассы
Классы удобны для стилизации набора однотипных элементов, которыми и являются колонки сетки. Но что, если для определённых колонок необходимо задать уникальные параметры, с помощью которых нужно, например, изменить цвет фона?

Псевдокласс в CSS — это специальное ключевое слово, добавленное к селектору.

Рассмотрим четыре основных псевдокласса, которые помогут вам стилизовать блоки. 


## :first-child
:first-child — псевдокласс, который поможет стилизовать первый элемент родительского блока. В нашем примере сетки родителем является блок с классом row, и с помощью :first-child, применённого к col, можно изменить цвет фона первой колонки. 

Для этого в селекторе указывается .название-класса:first-child. Обратите внимание, при создании псевдокласса пробелы не пишутся.


Посмотрите пример использования значения :first-child по ссылке.



## :last-child
:last-child работает так же, как и :first-child, только стилизация будет применена к последнему элементу родителя.

Для этого в селекторе указывается .название-класса:last-child. Обратите внимание, при создании псевдокласса пробелы не пишутся.


Посмотрите пример использования значения :last-child по ссылке.



## :nth-child()
:nth-child устанавливает стилизацию для элементов с порядковым номером:

.название-класса:nth-child(3) — будет стилизован только третий элемент;
.название-класса:nth-child(2n) — будет стилизован каждый второй элемент. Обратите внимание, при создании псевдокласса пробелы не пишутся.

Посмотрите пример использования значения :nth-child() по ссылке.


## :not()
:not() используется с другими псевдоселекторами и помогает стилизовать все элементы, кроме тех, которые указаны внутри скобок:

.название-класса:not(:first-child) — будут стилизованы все элементы, кроме первого;
.название-класса:not(:last-child) — будут стилизованы все элементы, кроме последнего;
.название-класса:not(:nth-child(2)) — будут стилизованы все элементы, кроме второго. Обратите внимание, при создании псевдокласса пробелы не пишутся.

Посмотрите пример использования значения :not() по ссылке.

