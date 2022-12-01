import React from 'react';
import s from "./Footer.module.css";
import IconButton from '@mui/material/IconButton';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer = () => {

	return (
    <>     
      <footer className={s.footer}>
        <hr/>          
        <div className={s.footerContainer}>          
            <div className={s.social}>
              <h3>Follow us on our networks</h3>
              <span>© 2022 | - All rights reserved</span>
              <ul className={s.footerContainer}>
                <li >
                  <IconButton aria-label="delete" href="https://www.instagram.com" target="_blank"  tittle="Seguinos en Instagram" rel="noreferrer">
                    <InstagramIcon fontSize='large'/>
                  </IconButton>
                </li>
                <li >
                  <IconButton aria-label="delete" href="https://www.facebook.com" target="_blank" tittle="Seguinos en Instagram" rel="noreferrer">
                    <FacebookIcon fontSize='large'/>
                  </IconButton>
                </li>
              </ul>
            </div>
        </div>  
        <hr/>           
      </footer>
      
    </>
	)
};

export default Footer;