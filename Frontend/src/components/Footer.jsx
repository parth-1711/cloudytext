import React from "react";
// import './Footer.css';
import github from "../assets/github.svg";
import mail from "../assets/mail.svg";
import linkedin from "../assets/linkedin.svg";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container flex flex-col justify-center items-center">
        <p>CloudyText is a platform for converting a PDF to a wordcloud!</p>
        <div className="flex flex-row justify-evenly">
          <a href="https://github.com/parth-1711" className="mx-5 mt-3 mb-1">
            <img src={github} alt="" />{" "}
          </a>
          <a href="parthirache8@gmail.com" className="mx-5 mt-3 mb-1">
            <img src={mail} alt="" />
          </a>
          <a href="https://www.linkedin.com/in/parth-jotiba-irache-171997229/" className="mx-5 mt-3 mb-1">
          <img src={linkedin} alt="" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
