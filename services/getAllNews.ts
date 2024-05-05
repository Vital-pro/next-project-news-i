// import puppeteer from 'puppeteer';
// import fs, { link } from 'fs';
// import { redirect } from 'next/navigation';

// export async function getAllNews() {
//   const browser = await puppeteer.launch({ headless: false });

//   const page = await browser.newPage();

//   await page.setViewport({
//     width: 1600,
//     height: 1000,
//     isMobile: false,
//     isLandscape: true,
//     hasTouch: false,
//     deviceScaleFactor: 1,
//   });

//   await page.goto('http://vesti-sudak.ru/');

//   await Promise.all([
//     page.waitForNavigation(),
//     page.click('article >header >h2 >a'),
//   ]);



//   // await page.screenshot({ path: 'screenshot.jpg', fullPage: true });


//   const newsPage = await page.evaluate(() => {
//     const newsOne = {
//       title: document.querySelector('article h2')?.textContent,
//       image: document
//         .querySelector('div > div.post-thumbnail-wrapper > img')
//         ?.getAttribute('src'),
//       link: document.querySelector(
//         'article > header > div > span.byline > span > a'
//       )?.href,
//     };
//     return newsOne;
//   });
//   // console.log(newsPage)
//   fs.appendFile('data2.json', JSON.stringify(newsPage), 'utf-8', (err) => {
//     if (err) throw err;
//     console.log('File newsOne!! added successfully!');
//   });

//   await browser.close();
//   redirect('/');
// }
