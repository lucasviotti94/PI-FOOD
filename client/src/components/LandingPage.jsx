import React from "react";
import { Link } from 'react-router-dom';
import './LandingPage.css'

export default function LandingPage() {
    return (        
        <div className="landingDiv">    
            <div className="landingCard">
                <h1>WELCOME TO MY FOOD APP</h1>
                <Link to='/home' className="landingBtnDiv">
                    <button className="landingBtn">Get started</button>
                </Link>
            </div>        
        </div>
    )
}
