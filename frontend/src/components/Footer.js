import React from 'react';
const date = new Date();
const year = date.getFullYear();

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">© {year} Mesto Russia</p>
    </footer>
  );
}

export default Footer;
