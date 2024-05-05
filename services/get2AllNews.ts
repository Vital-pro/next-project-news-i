import puppeteer from 'puppeteer';
import { writeFile } from 'fs';
import { redirect } from 'next/navigation';

const url = 'https://gorod24.online/sudak/news';

export async function get2AllNews() {
  let browser = await puppeteer.launch({ headless: false });
  let page = await browser.newPage();
  await page.setViewport({
    width: 1600,
    height: 1000,
    isMobile: false,
    isLandscape: true,
    hasTouch: false,
    deviceScaleFactor: 1,
  });

  await page.goto(url);

  let newsPage = await page.evaluate(() => {
    const newsPods = Array.from(
      document.querySelectorAll(
        !'.grid-item grid-item--width2b > div > #b_*' ||
          !'#b_-* > iframe' ||
          '.grid-item' ||
          '.info-block-horizontale' ||
          '.info-block-verticale' ||
          '.info-block-big'
      )
    );
    const data = newsPods.map((newOne) => ({
      title:
        newOne.querySelector('a >h2')?.textContent ||
        newOne.querySelector('a > span')?.textContent,
      image:
        newOne.querySelector('img')?.getAttribute('data-realsrc') ||
        newOne.querySelector('.bgc-image')?.getAttribute('data-realsrc'),
      link: newOne.querySelector('a')?.href,
    }));
    return data;
  });


  browser.close();

  //***start******* */
  browser = await puppeteer.launch({ headless: false });

  page = await browser.newPage();

  await page.setViewport({
    width: 1600,
    height: 1000,
    isMobile: false,
    isLandscape: true,
    hasTouch: false,
    deviceScaleFactor: 1,
  });

  await page.goto('http://vesti-sudak.ru/');

  await Promise.all([
    page.waitForNavigation(),
    page.click('article >header >h2 >a'),
  ]);


  const newsPage1 = await page.evaluate(() => {
    const newsOne = {
      title: document.querySelector('article h2')?.textContent,
      image: document
        .querySelector('div > div.post-thumbnail-wrapper > img')
        ?.getAttribute('src'),
      link: document.querySelector(
        'article > header > div > span.byline > span > a'
      )?.href,
    };
    return newsOne;
  });

  await page.goto('http://vesti-sudak.ru/');
  const newLink = await page.evaluate(() => {
    const nemLinkOne = {
      link: document.querySelector('header > h2 > a')?.href,
    }
    return nemLinkOne
  })

  newsPage1.link = newLink.link

  newsPage = [newsPage1, ...newsPage];

  //****end****** */

  writeFile('data2.json', JSON.stringify(newsPage), 'utf-8', (err) =>
    err ? console.log(err) : console.log('File written successfully!')
  );

  await browser.close();
  redirect('/');
}
