import React from "react";
import s from "./Paginacion.module.css";

export default function Paginacion({recipesPage, allRecipes, paged}) {

    const pages = [];

    for (let i = 1; i <= Math.ceil(allRecipes/recipesPage); i++) {
        pages.push(i)
    };   

    return (  
           
        <div>                        
            {            
            pages.length <= 1 ? 
            <></> :
            <nav className={s.pagination}>                
                <ul>                    
                    {
                    pages?.map(p =>(
                        <li className={s.eachLi}key={p}>
                            <button onClick={() => paged(p)}>{p}</button>
                        </li>
                    ))
                    }                    
                </ul>
    
            </nav>
            }  

        </div>
    );
};
