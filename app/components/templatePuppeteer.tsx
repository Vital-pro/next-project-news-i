import puppeteer from 'puppeteer';
const fs = require('fs');

//? Pages for testing headless status:
//arh.antoinevastel.com/bots/areyouheadless
//bot.sannysoft.com
//? sait for testing scpaping
//books.toscrape.com/

//! node cron
// www.youtube.com/watch?v=lgyszZhAZOI&t=6s   30.53

async function run() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({
    //? устанавливаем для параметров окрываемого окна ПЕРЕД открытием страницы
    width: 1600,
    height: 1000,
    isMobile: false,
    isLandscape: true,
    hasTouch: false,
    deviceScaleFactor: 1,
  });
  // await page.setGeolocation({latitude: 50, longitude: 50}); //! уточнить про геолокацию!! как-будто так мы указываем свою геолокацию (можем передать ДРУГИЕ координаты) ??

  //? и теперь переходим на страницу запуска
  await page.goto('https://jsonplaceholder.typicode.com/users');

  //todo дальше, как страница запустится, можем получать данные, контент, заголовки, url и т.д.
//! Эта конструкция захвата всей страницы и получаем данные с текущей страницы
  const bookData = await page.evaluate(() => {
  // здесь пишем код для DOM, который будет выполняться в браузере.

  }); 

  const url = await page.url(); //? 1 получаем url текущей страницы, на которой находимся
  // console.log(url);

  const content = await page.content(); //? 2 получаем содержимое страницы
  // console.log(content);

  await page.screenshot({ path: 'screenshot.jpg', fullPage: true }); //? 3 делаем и сохраняем скриншот (целиком всей страницы)
  
  

  //**********screenshot**PDF**********************************
  // await page.screenshot({ path: 'screenshot.jpg' }); //? 1 делаем и сохраняем скриншот
  // await page.screenshot({ path: 'screenshot.jpg', fullPage: true }); //? 2 страница целиком
  // await page.pdf({ path: 'example.pdf', format: 'A4' }); //? 3 сохраняем в pdf
  // const html = await page.content(); //? 4 получаем весь html страницы
  // console.log(html);
  // await page.screenshot({ path: 'screenshot.jpg', clip: {
  //   x: 200,
  //   y: 200,
  //   width: 500,
  //   height: 500
  // }, encoding: 'binary', type: 'jpeg' }); //? 5 делаем и сохраняем скриншот с параметрами

  //*********evaluate***(анализировать, вычислить. Открывает доступ к DOM)********************** */
  // если нужно получить заголовок или что-то еще, т.е. настроить таргетинг на h3, links или другое, есть метод evaluate. Это функция высшего порядка

  //*www.youtube.com/watch?v=S67gyqnYHmI

  const title = await page.evaluate(() => document.title); //? 1 получаем заголовок
  // console.log(title);

  const text = await page.evaluate(() => document.body.innerText); //? 2 получаем весь текст страницы
  // console.log(text)

  const links = await page.evaluate(() =>
    Array.from(document.querySelectorAll('a'), (el) => el.href)
  ); //? 3 получаем все ссылки и соберем их в Array
  // console.log(links)

  //! P.S. При поиске на странице используем вкладку copy selector. Она показывает полный путь к конкретному элементу

  const coursesTitle = await page.evaluate(() =>
    Array.from(document.querySelectorAll('#courses .card'), (el) => ({
      title: el.querySelector('.card-body h3').innerText,
    }))
  ); //? 4 получаем все карточки с курсами и соберем их названия в Array объектов {title: 'Course1', title: 'Course2'}
  // console.log(coursesTitle);

  //todo А теперь из всех карточек получим нужные данные и соберем их в Array объектов(как мы делали выше c title)
  // const courses = await page.evaluate(() =>
  //   Array.from(document.querySelectorAll('#courses .card'), (el) => ({
  //     title: el.querySelector('.card-body h3').innerText,
  //     level: el.querySelector('.card-body .level').innerText,
  //     url: el.querySelector('.card-footer a').href,
  //     promo: el.querySelector('.card-body .promo-code .promo').innerText,
  //   }))
  // );
  // console.log(courses);

  //todo То же самое, только с использованием метода $$eval
  // const courses = await page.$$eval('#courses .card', (cards) =>
  //   cards.map((el) => ({
  //     title: el.querySelector('.card-body h3').innerText,
  //     level: el.querySelector('.card-body .level').innerText,
  //     url: el.querySelector('.card-footer a').href,
  //     promo: el.querySelector('.card-body .promo-code .promo').innerText,
  //   }))
  // );

  //todo теперь сохраним данные в файл .json * Save data to JSON file
  // fs.writeFile('courses.json', JSON.stringify(courses), (err) => {
  //   if(err) throw err;
  //   console.log('File saved!')
  // });

  //todo После нажатия на кнопку появляется текст. Нам нужно прочитать его. (Именно только после click on button!)
  //www.youtube.com/watch?v=lgyszZhAZOI&t=6s  25.16 min
  await page.click('#button'); //? 1 click on button
  const clickedData = await page.$eval('#data', (el) => el.textContent); //? 2 read text
  // console.log(clickedData);

  //todo Вводим данные в input
  //www.youtube.com/watch?v=lgyszZhAZOI&t=6s  28.10 min

  //? 1 вводим текст, имитируем задержку {delay: 100}, как будто человек нажимает клавиши букв
  await page.type('#inputSelector', 'какой вводим текст', { delay: 100 });
  //? 2 нажимаем на кнопку
  await page.click('#form button');
  //? если переходим на другую страницу, то нужнo дождаться ее загрузки и т.д. Для этого есть метод, пишем
  await page.waitForNavigation();
  //! P.S. У page.waitForNavigation() есть дополнительные настройки в puppeteer. Например:
  // await page.waitForNavigation({ timeout: 3000, waitUntil: 'domcontentloaded' });
  //? 3 и уже на этой новой странице получаем текст...

  //* P.S. НО! Это было бы просто - одна команда за другой, загружаем, получаем.. НО (видимо, в силу асинхронности)
  //* нужно, чтобы эти команды выполнились обе, а, значит - Promise.all([])
  await Promise.all([page.click('#form button'), page.waitForNavigation()]);

  //? 3 ...и вот уже теперь на этой новой странице получаем текст...
  const info = await page.$eval('#message', (el) => el.textContent);
  // console.log(info)

  //**************Timeout*******waitForTimeot******************* */
  // похоже, теперь отменили waitForTimeot(). Другие способы ожидания
  //? https://www.webshare.io/academy-article/puppeteer-timeout

  try {
    // Performing action that might encounter a timeout
    await page.waitForSelector('.my-element', { timeout: 5000 });
  } catch (error) {
    // Handling timeout error gracefully
    console.error('Timeout error:', error);
  }

  //* или
  // Setting the default timeout to 10 seconds (10000 milliseconds)

  //page.setDefaultTimeout() — это функция Puppeteer, которая устанавливает тайм-аут по умолчанию для всех действий, инициируемых сценарием.
  // Передаваемый параметр представляет продолжительность тайм-аута в миллисекундах.
  page.setDefaultTimeout(10000);

  //* или
  await page.waitForNavigation({
    timeout: 3000,
    waitUntil: 'domcontentloaded', // один можно опустить и не писать
  });

  //*********emulateVisionDeficiency***(эмуляция размытия снимка)***************** */
  //www.youtube.com/watch?v=nIJV-LbV_vM 21.10 min

  await page.emulateVisionDeficiency('blurredVision'); //? так я устанавливаю эмуляцию размытия снимка (плохое зрение)
  const screen = await page.screenshot({
    path: 'screenshot.jpg',
    fullPage: true,
  });

  await page.emulateVisionDeficiency('none'); //? а так эмуляцию отменяем - 'none'
  const screen1 = await page.screenshot({
    path: 'screenshot.jpg',
    clip: { x: 200, y: 200, width: 500, height: 5000 },
    encoding: 'binary',
    type: 'jpeg',
  });

  //*********получение видео с Youtube******************** */
  //www.youtube.com/watch?v=nIJV-LbV_vM  47 min?

  await page.waitForSelector('someselector'); //? дожидаемся, чтобы 'someselector' появился

  await page.type('selector', 'text', { delay: 100 }); //? находим 'selector' и вводим туда этот 'text' ПРИ этом с небольшой паузой-задержкой при вводе - delay: 100 - имитируем поведение человека

  await Promise.all([
    //? так ожидмем, пока эти команды выпонятся ОБЕ! (дожидаемся -> clik-аем)
    page.waitForNavigation(),
    page.click('#search-icon-button'),
  ]);
  await page.waitForSelector('some-vodeo-youtube-title');
  await page.screenshot({ path: 'screen.jpg' });

  const firstMath = await page.$eval('some-vodeo-youtube-title', (el) => {
    //? здесь получаем первое совпадение элемента на странице
    return el.textContent;
  });
  console.log(firstMath);
  await Promise.all([
    page.waitForNavigation(), //? или waitForNetworkIdle() - это ожидание простоя сети (т.е. страница перестала запрашивать что-либо, не происходит каскад запросов)
    page.click('some-vodeo-youtube-title'), //? clik-аем на первое совпадение элемента на странице.
    //! waitForTimeot() -  устарел!!
    //? Но, если просто нужно подождать какое-то время, сделать паузу, например,чтобы сделать screenshot. И тогда:
    new Promise((resolve) => setTimeout(resolve, 17000)), //? просто ожидание 17 секунд (тайм-аут)/ Может, пока реклама идет в том рлике, например
  ]);
  await page.screenshot({ path: 'screen.jpg' });

  //? Теперь задача такая - найти на странице ютуба комментарии и первое видео:
  await page.waitForSelector('ytb-comments'); //? дожидаемся, чтобы 'ytb-comments' появился
  const videoComments = await page.$eval('ytb-comments-h2', (h2) => {
    return h2.textContent;
  });
  // console.log(videoComments) //? здесь получаем комментарии

  const firstSuggested = await page.$eval('ytb-comments', (el) => {
    return el.querySelector('h3')?.textContent;
  });
  // console.log(firstSuggested) //? здесь получаем первое видео, его заголовок

  await browser.close();
}; 

// run();  // todo запускаем для использования (вешаем на триггер (кнопку или ссылку)) 


//! Для иммитации нормального браузера а не headless, добавляет заголовки в запросы
import puppeteer1 from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
puppeteer1.use(StealthPlugin()); //? для иммитации нормального браузера добавляет заголовки в запросы
import {writeFile} from 'fs';

await page.goto('https://bot.sannysoft.com'); // сайт для проверки ботов
await page.screenshot({ path: 'screenshot.jpg' });

//? записать в файл
//? JSON.stringify для преобразования объектов в JSON.
//? JSON.parse для преобразования JSON обратно в объект.
//? Метод JSON.stringify(student) берёт объект и преобразует его в строку. Полученная строка json называется JSON-форматированным или сериализованным объектом. Мы можем отправить его по сети или поместить в обычное хранилище данных.
await writeFile('data.json', JSON.stringify(data), 'utf-8', (err) => {
  if (err) throw err;
  console.log('File written successfully!');
});

//?
const btn = await page.waitForSelector('button[data-test="nav-bar-search-input"]'); //? дожидаемся, чтобы 'button[data-test="nav-bar-search-button"]' появился, помещаем в переменную btn
await page.type('input[data-test="nav-bar-search-input"]', 'Горы'); //? вводим в поисковую строку 'Горы'

await Promise.all([page.waitForNavigation(), btn.click()]); //? дожидаемся и clik-аем на кнопку поиска
await page.waitForNetworkIdle();
await page.screenshot({ path: 'screenshot.jpg', fullPage: true });


//********try/catch************************************** */
// https://www.youtube.com/watch?v=BGzK0xd-F5A

async function getProducrData() {
  let browser;

  try {
    browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.setViewport({ width: 1080, height: 768 });

    page.setDefaultNavigationTimeout(2 * 60 * 1000); //? 2 минуты

    await page.goto('https://www.youtube.com/watch?v=BGzK0xd-F5A');


  } catch (error) {
    console.log(error)
    await browser?.close();
  } 
}