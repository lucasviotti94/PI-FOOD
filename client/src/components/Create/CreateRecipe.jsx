import React from "react";
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2'

import s from "./CreateRecipe.module.css";

import { getDietTypes } from '../../actions';
import { addRecipe } from '../../actions';
import FormGroup from "react-bootstrap/esm/FormGroup";


function validate(input) {
    
    const errors = {};

    if (!input.name) errors.name = 'Please enter your recipe name';
    else if (!/^[a-zA-Z\s]{2,254}$/.test(input.name)) errors.name = 'Please enter only letters'
    if (!input.summary) errors.summary = 'Please enter your comments about your recipe';    
    if (input.healthScore < 1 || input.healthScore > 100) errors.healthScore = 'The score must be a number between 1 and 100';
    if (!input.steps.length) errors.steps = 'Please detail the steps.';
    if (!input.dietTypes.length) errors.dietTypes = 'Please select at least one option';
    return errors;
};


export default function Create() {

    const dispatch = useDispatch()
    const dietTypes = useSelector(state => state.dietTypes)

    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name: ''  ,
        summary: '',
        healthScore: '',
        steps: '',
        dietTypes: []
    })

    useEffect(() => {
        dispatch(getDietTypes());
    }, [dispatch]);


    function handleSubmit(e) {

        e.preventDefault();

        if (Object.values(errors).length > 0) {
            Swal.fire({
                title: "Unexpected error !",
                text: "Information required, please complete...",
                icon: "error",
                footer: "This information is important !",
                width: "25%"
            })            
        } else if (
           input.name === '' && 
           input.summary === '' && 
           input.healthScore === '' &&
           input.steps === '' &&
           !input.dietTypes.length) {
            Swal.fire({
                title: "Unexpected error !",
                text: "Please complete the form..",
                icon: "error",
                footer: "This information is important !",
                width: "25%"
            })                    
    }           
       else {
           dispatch(addRecipe(input));
           Swal.fire({
            title: "Success !!",
            text: 'New recipe added successfully!',
            icon: "success",
            footer: "This information is important !",
            width: "25%"
        })                 
           setInput({
               name: "",
               summary: '',
               healthScore: '',
               steps: [],
               dietTypes: []
           });
        }
    }

    function handleChange(e) {

        e.preventDefault()
        setInput(() => {
            var newForm = {
                ...input,
                [e.target.name]: e.target.value
            }
            const validation = validate(newForm) ;
            setErrors(validation);
            return newForm;
        })
    }

    function handleBox(e) {       
       
        let newArray = input.dietTypes;
        let find = newArray.indexOf(e.target.value);
        
        if (find >= 0) newArray.splice(find, 1)
        else newArray.push(e.target.value)
        
        setInput({            
            ...input,
            dietTypes: newArray
            })      
        const validations = validate(input);
        setErrors(validations) 
    }


    return (
        <div className={s.mainCreate}>
            <div className={s.form}>
                <h1> Create your recipe here !</h1>
                <Form onSubmit={e => handleSubmit(e)} autoComplete="on">                    
                        
                            <FormGroup className={s.formName}>
                                <Form.Label className={s.name}>Name</Form.Label>
                                <Form.Control 
                                    style= {{maxWidth: "750px"}}
                                    name="name" 
                                    type="text"
                                    value={input.name} 
                                    onChange={e => handleChange(e)}
                                    placeholder="Type here.." 
                                />                                
                                { errors.name && (<div className={s.warning}><p>{errors.name}</p></div>) }                                
                            </FormGroup>

                            <FormGroup className={s.formHS}>
                                <Form.Label className={s.HS}>Health Score</Form.Label>
                                <Form.Control 
                                    style= {{maxWidth: "210px"}}
                                    name="healthScore" 
                                    type="number"
                                    value={input.healthScore} 
                                    max="100" 
                                    min="1" 
                                    onChange={e => handleChange(e)}
                                    placeholder="Type here.." 
                                />
                                { errors.healthScore && (<div className={s.warning}><p>{errors.healthScore}</p></div>) }   
                            </FormGroup>

                            <FormGroup className={s.formSumm}>
                                <Form.Label className={s.summary}>Summary</Form.Label>
                                <Form.Control as="textarea"
                                    style= {{maxWidth: "750px"}} 
                                    name="summary" 
                                    type="text" 
                                    rows="4" 
                                    cols="30" 
                                    placeholder="Type here.." 
                                    value={input.summary} 
                                    onChange={e => handleChange(e)}
                                />
                                { errors.summary && (<div className={s.warning}><p>{errors.summary}</p></div>) }
                            </FormGroup>

                            <FormGroup className={s.formSteps}>
                                <Form.Label className={s.steps}>Steps</Form.Label>
                                <Form.Control as="textarea"
                                    style= {{maxWidth: "750px"}}
                                    name="steps" 
                                    type="text" 
                                    rows="4" 
                                    cols="30" 
                                    placeholder="Type here.." 
                                    value={input.steps} 
                                    onChange={e => handleChange(e)}
                                />
                                { errors.steps && (<div className={s.warning}><p>{errors.steps}</p></div>) }
                            </FormGroup>
                            
                            <div className={s.formDiets}>
                                <Form.Label className={s.dietLabel}>Choose your own diet types</Form.Label>
                                <div className={s.divDiets}>
                                    {dietTypes.map(d =>{
                                        return (                                                                                
                                            <Form.Check
                                                inline   
                                                label={d.replace(/\w/, (firstLetter) => firstLetter.toUpperCase())}    
                                                key={"id-"+d}                                                 
                                                type="checkbox" 
                                                name={d} 
                                                value={d}    
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "left",
                                                    gridGap: "5%", 
                                                    marginLeft: "12%"
                                                    
                                                }}                                             
                                                onChange={e => handleBox(e)}
                                            />                                       
                                        )
                                    })}
                                </div>
                                    {errors.dietTypes && (<Form.Text className={s.warning}>{errors.dietTypes}</Form.Text>) }
                            </div>                        
                            <div className={s.btns}>
                                <Button className={s.btnSubmit} as="input" type="submit" value="Submit Recipe"/>                    
                                <Button className={s.btnSubmit} href="/home">Go back</Button>

                            </div>
                </Form>
            </div>
        </div>
    )
}