import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='footer'>
      <p className='footer__container container'>
        Created by <Link href={'https://github.com/Vital-pro'}>&copy;Vital-pro</Link>
      </p>
      <p>
        Все права защищены
      </p>
    </footer>
  );
}

export default Footer