// Footer.tsx
"use client";

import React from "react";
import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-left">
          <h2>DOOHO COMPANY</h2>
          <p><strong>CEO:</strong> Dooho Lim</p>
          <p><strong>Contact:</strong> 010.0000.0000</p>
          <p><strong>Email:</strong> business@doohocompany.com</p>
          <p>
            <strong>Website:</strong>{" "}
            <a href="https://doohocompany.com" target="_blank" rel="noopener noreferrer">
              doohocompany.com
            </a>
          </p>
        </div>

        <div className="footer-right">
          <h2>Address</h2>
          <p>
            3rd floor, 30, Gangnam-daero 126-gil,
            <br /> Gangnam-gu, Seoul, Republic of Korea
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Dooho Company. All rights reserved.
      </div>
    </footer>
  );
}
