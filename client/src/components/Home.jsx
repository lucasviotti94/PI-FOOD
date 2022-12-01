import React, { useEffect, useState }  from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecipes, randomOrder } from "../actions";

import { lettersSort, scoreSort, dietFilter } from "../actions";
import Spinner from 'react-bootstrap/Spinner'
import CarouselComponent  from './Carousel/Carousel.jsx';
import Cards from './Cards/Recipes.jsx'
import Paginacion from './Paginacion/Paginacion.jsx'
import Footer from "./Footer/Footer";
import Button from 'react-bootstrap/Button';

import "./Home.css";

export default function Home () {
    
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(false)
        dispatch(getRecipes());
        setLoading(true)
    }, [dispatch]);

 
    const allRecipesState = useSelector((state) => state.recipes);  

    const recipesPage = 9;
    const [page, setPage] = useState(1);
    const [order, setOrder] = useState('');
    const [loading, setLoading] = useState(false)
    
    const recipesPerPage = page * recipesPage;
    const firstRecipe = recipesPerPage - recipesPage;
    var recipesToShow = allRecipesState.slice(firstRecipe, recipesPerPage);
    
    useEffect(() => {
        setLoading(false)
        dispatch(getRecipes());
        setTimeout(() => {
            setLoading(true)            
        }, 2000);
        
    }, [dispatch]);
    
    const paged = function(number) {
        setPage(number)
    };

    function handler (e) {
        
        if (e.target.value === "AZ" || e.target.value === "ZA") {
            e.preventDefault();                
            dispatch(lettersSort(e.target.value))
            setPage(1);
            setOrder(`${order}`.concat(`-${e.target.value}`));

        } else if (e.target.value === "ASC" || e.target.value === "DESC") {            
            e.preventDefault();                
            dispatch(scoreSort(e.target.value));
            setPage(1);
            setOrder(`${order}`.concat(`-${e.target.value}`));

        } else if (e.target.value === "none"){
            e.preventDefault()
            dispatch(randomOrder())
            setOrder('')
        } else {            
            e.preventDefault();
            dispatch(dietFilter(e.target.value))
            setPage(1);
        }
    }


    function handleReset() {

        dispatch(getRecipes());
        dispatch(randomOrder());
        setPage(1);
        setOrder('')
    }       

    return (
        <div className="main">
            
            <CarouselComponent />           

            <div className="order-filter">
                <div className="dropdawn">
                    <select className="dropdawnSelect" name="alphabetical" onChange={(e) => handler(e)}>
                        <option value="none">Alphabetical</option>
                        <option value="AZ">A to Z</option>
                        <option value="ZA">Z to A</option>
                    </select>
                    <span class="custom-arrow"></span>
                </div>
                <div className="dropdawn">
                    <select className="dropdawnSelect" name="score" onChange={e => handler(e)}>
                        <option className="options" value="none" selected="selected" >Score</option>
                        <option className="options" value="ASC">From Min to Max</option>
                        <option className="options" value="DESC">From Max to Min</option>
                    </select>
                    <span class="custom-arrow"></span>
                </div>
                <div className="dropdawn">
                    <select className="dropdawnSelect" name="diets" onChange={e => handler(e)}>
                        <option className="options" value="none" selected="selected">Select a Diet</option>
                        <option className="options" value="gluten free">Gluten Free</option>
                        <option className="options" value="ketogenic">Ketogenic</option>
                        <option className="options" value="vegetarian">Vegetarian</option>
                        <option className="options" value="lacto vegetarian">Lacto Vegetarian</option>
                        <option className="options" value="ovo vegetarian">Ovo Vegetarian</option>
                        <option className="options" value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
                        <option className="options" value="vegan">Vegan</option>
                        <option className="options" value="pescetarian">Pescetarian</option>
                        <option className="options" value="paleolithic">Paleolithic</option>
                        <option className="options" value="primal">Primal</option>
                        <option className="options" value="low fodmap">Low Fodmap</option>
                        <option className="options" value="whole 30">Whole 30</option>
                        <option className="options" value="dairy free">Dairy Free</option>
                    </select>
                    <span class="custom-arrow"></span>
                </div>
            <button className="filters" onClick={handleReset}>Reset Order..</button>
            </div>
            <div className="paginationUp">
                <Paginacion recipesPage={recipesPage} allRecipes={allRecipesState.length} paged={paged}/>
            </div>

            <div className={allRecipesState.length <= 0 ? "notFound" : "recipesDiv"}> 

                {
                loading === false 
                ?   
                    <Spinner 
                        style={{                            
                            color: "#638e4c",     
                            position: "absolute",                           
                            right: "48.5%",
                            padding: "2%"
                        }}
                        animation="border"
                        role="status"
                    />                        
                :   <>
                        {
                            allRecipesState.length <= 0
                            ?   <div className="textNotFound">
                                    <h1> There is no recipe with that name</h1>
                                    <h2>Try a new one..</h2>
                                    <Button 
                                        style={{
                                            margin: "2%",
                                            backgroundColor: "#638e4c",
                                            border: "0"                                           
                                        }}
                                        href="/home">Go back</Button>
                                </div>
                            : <Cards recipes={recipesToShow}/> 
                        }
                    </>
                }
            </div>
            <div className="paginationDown">
                <Paginacion recipesPage={recipesPage} allRecipes={allRecipesState.length} paged={paged}/>
            </div>

            <Footer/>
            
        </div>
    )
};