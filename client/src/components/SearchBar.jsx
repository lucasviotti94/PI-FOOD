import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getRecipe } from '../actions'

import './SearchBar.css';


export default function SearchBar () {

    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleOnChange(e) {
        e.preventDefault();
        const recipe = e.target.value;
        setName(recipe);
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        dispatch(getRecipe(name));
    }
    
    return (
        <div className='SearchBar'>
            <input
                type='text'
                className='sbinput'
                onChange={ e => handleOnChange(e) }
                value={ name }                
            />
            <button
                type='submit'
                className='sbBtn'              
                onClick={e => handleOnSubmit(e) }
            >
            Search
            </button>                  
        </div>
    )
};

 