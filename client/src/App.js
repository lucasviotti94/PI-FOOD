import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import LandingPage from './components/LandingPage.jsx';
import Home from './components/Home.jsx';
import Nav from './components/Nav.jsx';
import Create from './components/Create/CreateRecipe.jsx'
import RecipeDetail from './components/RecipeDetail.jsx'

function App() {

  return (
      <div className='App'>
        <Switch>
          <Route exact path='/' component={LandingPage}/>
          <Route exact path='/home'>
            <Nav/>
            <Home/>
          </Route>          
          <Route path='/home/create'>
            <Nav/>
            <Create/>
          </Route>
          <Route exact path='/home/recipe/:id'>
            <Nav/>
            <RecipeDetail/>
          </Route>          
        </Switch>
      </div>  
  );
}

export default App;
