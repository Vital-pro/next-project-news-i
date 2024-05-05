import data from '../data2.json';
export default function Home() {
  return (
    <>
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
