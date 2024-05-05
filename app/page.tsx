import data from '../data2.json';
import Button from './Button';

const puppeteer = require('puppeteer') ;
const { writeFile } = require('fs') ;
import { redirect } from 'next/navigation';


export default function Home({searchParams}: {searchParams: Record<string, unknown>}) {

  if(searchParams.newsButton) {
    console.log('------', searchParams)

    runScraper()

  }

  return (
    <>
    <Button/>
      <div className='news-box'>
        {data.map((el) => (
          <div key={el.title} className='item-inner'>
            <a target='_blank' href={el.link}>
              <img src={el.image} alt={el.title} />
              <h2>
                {el.title}
                <p>Подробнее в первоисточнике... &#10132;</p>
              </h2>
            </a>
          </div>
        ))}
      </div>
    </>
  );
}

const url = 'https://gorod24.online/sudak/news';
const runScraper = async () => {
  
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
    const data: any = newsPods.map((newOne) => ({
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


  const newsPage1: {
    title: string | null | undefined;
    image: string | null | undefined;
    link: string | null | undefined;
  } = await page.evaluate(() => {
    const newsOne = {
      title: document.querySelector('article h2')?.textContent,
      image: document
        .querySelector('div > div.post-thumbnail-wrapper > img')
        ?.getAttribute('src'),
      link: document
        .querySelector('article > header > div > span.byline > span > a')
        ?.getAttribute('href'),
    };
    return newsOne;
  });

  await page.goto('http://vesti-sudak.ru/');
  const newLink = await page.evaluate(() => {
    const nemLinkOne = {
      link: document.querySelector('header > h2 > a')?.getAttribute('href'),
    };
    return nemLinkOne;
  });

  // newsPage1.link = newLink.link || undefined;
  newsPage1.link =
    newLink.link && newLink.link !== null ? newLink.link : undefined;

  newsPage = [newsPage1, ...newsPage];

  //****end****** */

  writeFile('data2.json', JSON.stringify(newsPage), 'utf-8');

  await browser.close();
  // redirect('/');

}
