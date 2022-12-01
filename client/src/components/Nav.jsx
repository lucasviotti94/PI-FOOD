import React from 'react';
import Logo from "../assets/logo1.png";
import { Link, NavLink } from 'react-router-dom';
import './Nav.css';
import SearchBar from './SearchBar.jsx';


export default function Nav () {

    return (
        <div className='navBar'>
            <div className='logo'>
                <Link to='/home'>
                    <img src= {Logo} alt="logo" />
                </Link>
            </div>
            <div className='navLinks'>
                <NavLink to='/home' className='Links'>
                    Home
                </NavLink>
                <NavLink to='/home/create' className='Links'>
                    Create Recipe
                </NavLink>
            </div>
            <div className='srchBar'>{ <SearchBar/> }</div>
        </div>


    )
}