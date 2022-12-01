import React from "react";
import error from '../../assets/1.png'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import s from "./Recipes.module.css";

export default function Cards( { recipes } ) {
  const popover = (r) => (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Click again to close !</Popover.Header>
      <Popover.Body>
      {
                    r.dietTypes ?
                    r.dietTypes.map((d) => {
                      if (typeof d === "object") {
                        return (                  
                          <p 
                            key={`${r.name}${d.name}`} 
                            className="eachDiet"
                          >                                                 
                            {d.name.replace(/\w/, (firstLetter) =>
                              firstLetter.toUpperCase()
                            )}
                            
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
  );
    return (
        recipes.map((r) =>                
        <div key={r.id} className={s.card}>   
            <Card style={{ 
              width: '21rem',
              height: "100%",
              backgroundColor: "#FBAB7E",
              backgroundImage: "linear-gradient(62deg, #FBAB7E 0%, #f2c646 2%, #F7CE68 100%)",
              boxShadow: "2px 4px 5px 2px rgba(0,0,0,0.3)",
              border: 0
              }}>
              <Card.Img style={{                
                width: "90%",
                margin: "0 auto",
                marginTop: "15px",
                boxShadow: "5px 15px 10px 0px rgba(0,0,0,0.3)",
                borderRadius: "3%"
              }}variant="top" src={r.image ? r.image : error} />
              <Card.Body>
                <Card.Title>{r.name}</Card.Title>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item
                  style={{
                    display: "flex",
                    justifyContent: "left",
                    marginLeft: "5%",
                    backgroundColor: "#FBAB7E",
                    backgroundImage: "linear-gradient(62deg, #FBAB7E 0%, #f2c646 2%, #F7CE68 100%)",
                    border: 0,
                     
                  }}
                  >Health Score: <div style={{ marginLeft: "10%"}}>{r.healthScore}</div></ListGroup.Item>
                <ListGroup.Item 
                  style={{ 
                    display: "flex",
                    marginLeft: "5%",
                    backgroundColor: "#FBAB7E",
                    backgroundImage: "linear-gradient(62deg, #FBAB7E 0%, #f2c646 2%, #F7CE68 100%)"                    
                  }}
                  >Diets:
                    <OverlayTrigger trigger="click" placement="right" overlay={popover(r)}>
                      <Button 
                        style={{
                          height: "60px",
                          width: "180px",
                          marginLeft: "8%",
                          backgroundColor: "#638e4c"
                        }}
                          variant="success">Click to see the type of diet/diets</Button>
                    </OverlayTrigger>

                </ListGroup.Item>                
              </ListGroup>
              <Card.Body>
                <Link to={`/home/recipe/${r.id}`} key={r.id} style={{color: "green"}}>See more about this recipe !</Link>                
              </Card.Body>
            </Card>
          </div>
          
        )
    );
}   
