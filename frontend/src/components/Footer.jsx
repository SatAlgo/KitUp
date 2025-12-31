import React from "react";
import { FaLinkedin, FaTelegram, FaInstagram } from "react-icons/fa";

function Footer() {


  return (
    <div className="">
      <hr />
      <footer className="footer footer-center p-10 text-base-content rounded dark:bg-slate-900 dark:text-white">
        <nav className="grid grid-flow-col gap-4">
          <a href="https://www.linkedin.com/posts/satyam-gaikwad-27a7a724b_kitup-frontenddevelopment-studentlife-activity-7230963266670256128-qlJg?utm_source=share&utm_medium=member_desktop"
            target="_blank"
            className="link link-hover">About Us</a>
          <a href="https://www.linkedin.com/in/satyam-gaikwad-27a7a724b/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            className="link link-hover">Contact</a>
          <a href="/JoinUs" className="link link-hover">Join</a>
          <a href="/SupportUs" className="link link-hover text-tea-400">Support Us</a>
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a href="https://t.me/+NKT8OoynbggwZTk1" target="_blank" rel="noopener noreferrer" className="">
              <FaTelegram size={24} />
            </a>

            <a href="https://satyamgaikwad.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-[25px]">
              <i className="fas fa-globe "></i> 👨💻
            </a>

            <a href="https://www.linkedin.com/in/satyam-gaikwad-27a7a724b/" target="_blank" rel="noopener noreferrer" className="">
              <FaLinkedin size={24} />
            </a>

          </div>
        </nav>
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved

          </p>
        </aside>
      </footer>
    </div>
  );
}

export default Footer;