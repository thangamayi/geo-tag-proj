import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footerContent">
        <p>&copy; 2024 Arul Anandar College. All Rights Reserved.</p>
        <p>M.THANGAMAYI II-MCA</p>
        <div className="socialLinks">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
