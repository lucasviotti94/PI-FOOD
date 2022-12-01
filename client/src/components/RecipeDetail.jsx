
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getRecipeById } from '../actions';
import { Link, useParams } from 'react-router-dom'
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import RemoveIcon from '@mui/icons-material/Remove';
import Footer from "./Footer/Footer";

import error from '../assets/1.png'
import s from "./RecipeDetail.module.css";


export default function RecipeDetails() {

    const dispatch = useDispatch();
    const { id } = useParams();    
    
    useEffect(() => {
        dispatch(getRecipeById(id))
    }, [dispatch, id]);    

    const details = useSelector(state => state.recipeDetail);   
    
    const popover = (r) => (
        <Popover id="popover-basic">
          <Popover.Header as="h3">Click again to close !</Popover.Header>
          <Popover.Body>
          {
                        r ?
                        r.map((d) => {
                          if (typeof d === "object") {
                            return (                  
                              <p 
                                key={`${r.name}${d.name}`} 
                                className="eachDiet"
                              >                                                 
                                {d.name.replace(/\w/, (firstLetter) => firstLetter.toUpperCase())}
                                
                              </p>                         
                            );
                          } else {
                            return (
                              <p key={`${r.name}${d}`}>
                                {d.replace(/\w/, (firstLetter) => firstLetter.toUpperCase())}
                              </p>
                            );
                          }
                          }) : []                    
                          }
          </Popover.Body>
        </Popover>
    )
    
    return (

        <div className={s.main}>
            <div className={s.card}>
                <div className={s.up}>
                    <div className={s.left}>                        
                        <img
                            src={details.image ? details.image : error} 
                            alt="img"
                        />
                        
                    </div>
                    <div className={s.right}>
                        <div className={s.name}>{details.name}</div>
                        <div className={s.divScore}>
                            <h3 className={s.title}>Healhscore:</h3>
                            <p className={s.scores}>{details.healthScore}</p>
                        </div>
                        {details.dishTypes ?
                            <div className={s.divDish}>
                                <h2>Dish Type:</h2>
                                
                                    {details.dishTypes?.map(e => {
                                        return(
                                            <h4 key={e}> {e.replace(/\w/, (firstLetter) =>
                                            firstLetter.toUpperCase()
                                          )} </h4>
                                        )
                                    })}
                                                
                            </div> : <br/>
                        }    
                                    
                        {details.dietTypes || details.diets ?
                                                
                            <div className={s.divType}>
                                <div className={s.divh2}>
                                    <h2> Diet Type:</h2>
                                </div>

                                <div className={s.types}>                                
                                <OverlayTrigger trigger="click" placement="right" overlay={popover(details.dietTypes ? details.dietTypes : details.diets )}>                                    
                                    <Button 
                                        style={{
                                        height: "60px",
                                        width: "180px",
                                        marginLeft: "8%",
                                        backgroundColor: "#638e4c"
                                        }}
                                        variant="success">Click to see the type of diet/diets</Button>
                                </OverlayTrigger>
                                </div>
                            </div>
                            :
                            <div className="info">    
                                <h2 className="title">Diet Type: </h2>    
                                
                            </div>
                        }  
                    </div>
                </div>
                <div className={s.down}>
                    <div className={s.summary}>
                        <h3>Summary</h3>
                        <p>{details.summary?.replace(/<[^>]*>/g, '')}</p>
                    </div>
                    <div className={s.divSteps}>
                     <h3>Steps to follow to make the recipe</h3>
                     <ul className="steps">{Array.isArray(details.steps) ? details.steps.map(e => {
                         return(
                             <li key={e.number}><RemoveIcon/>{e.step}</li>
                             )
                     }) :
                     <li>{details.steps}</li>
                     }</ul>
                 </div>
                </div>        
                <div className={s.bottomBtn}>
                    <Link to="/home"><button className={s.goBackButton}>Go back</button></Link>
                </div>        
            </div>
            <Footer/>
        </div>
    )              
}