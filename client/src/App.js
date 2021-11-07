import React, { useState } from 'react'
import './App.css';
import Recipes from './components/recipes/recipes';
import CreateRecipe from './components/createRecipe/createRecipe';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Menus from './components/menus/menus';
import List from './components/List/list';
import { AiOutlineMenu } from 'react-icons/ai';


function App() {

  const [menu, setMenu] = useState([])
  const [show, setShow] = useState(false)
  const nav = show ? "wrap-nav-on" : "wrap-nav-off"

  return (
    <Router>
      <div className="navbar">
        <div className="wrap-logo">
          <div className="logo">MLDC</div>
          <div><AiOutlineMenu onClick={() => setShow(!show)} className="btn-menu" /></div>
        </div>
        <div className={nav}>
          <Link className="navbar-item" to="/" onClick={() => setShow(!show)}>Mes recettes</Link>
          <Link className="navbar-item" to="/recette" onClick={() => setShow(!show)}>Créer une recette</Link>
          <Link className="navbar-item" to="/menu" onClick={() => setShow(!show)}>Mes menus</Link>
          <Link className="navbar-item" to="/liste" onClick={() => setShow(!show)}>Ma liste de courses</Link>
        </div>
      </div>
      <Switch>
        <Route path="/recette"><CreateRecipe /></Route>
        <Route path="/menu"><Menus menu={menu} setMenu={setMenu} /></Route>
        <Route path="/liste"><List /></Route>
        <Route path="/"><Recipes menu={menu} setMenu={setMenu} /></Route>

      </Switch>
    </Router>
  );
}

export default App;
