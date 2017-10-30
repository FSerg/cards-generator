# card-generator

Простое [Nodejs](https://nodejs.org/)/[React](https://reactjs.org/) приложение, которое генериует файлы со спискам дисконтных карт для [Front-Office'ного](https://ru.wikipedia.org/wiki/%D0%A4%D1%80%D0%BE%D0%BD%D1%82-%D0%BE%D1%84%D0%B8%D1%81) ПО [Frontol](https://frontol.ru/) (соответственно в формате обмена данными Frontol)

Приложение было написано чисто с целью изучения web-технологий:
* Nodejs
* React
* Redux
* Redux-form
* Semantic UI

Использованные материалы:
* Классный курс на Udemy: [Node with React: Fullstack Web Development](https://www.udemy.com/node-with-react-fullstack-web-development/learn/v4/overview)
Вообще [все курсы от Stephen Grider](https://www.udemy.com/user/sgslo/) - афигенные!
* Хороший [пример ToDo-приложения](https://github.com/brandiqa/redux-crud-example) на React/Redux
* Хорошая [статья про Redux-promise-middleware](https://medium.com/the-andela-way/async-actions-and-tests-with-redux-promise-middleware-3b6bda8aa83d), хоть я и не использовал middleware, но помогает понять откуда взялось столько reducers в примере ToDo-приложения
* Классный UI-фреймворк [Semantic UI](https://react.semantic-ui.com/)

### Запуск приложения

**Для запуска в режиме разработки**

`npm run dev`

**Запуск в рабочем режиме**

Сначала билдится клиентская часть
```sh
cd client
npm run build
```
Затем запускается серверная часть, котора я же и хостит клиента
```sh
cd ..
npm start
```

### Функционал
* Можно создавать/редактировать/удалять разные диапазоны номеров карт
* Данные хранятся в локальном JSON файле
* Кнопка "Generate" создает сам файл данных

![Внешний вид приложения](https://img-fotki.yandex.ru/get/898391/58143147.c9/0_b3808_d80c4625_orig.png)
