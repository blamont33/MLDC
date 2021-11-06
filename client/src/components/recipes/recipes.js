import React, { useState, useEffect } from 'react'
import Modal from './modalRecipe.js';
import './recipes.css'
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { BsFillCheckCircleFill } from 'react-icons/bs';

const Recipes = ({ menu, setMenu }) => {

    const [allRecipes, setAllRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [recipe, setRecipe] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [rerender, setRerender] = useState(true);
    const [counter, setCounter] = useState(0);
    const [parts, setParts] = useState("");

    useEffect(() => {
        getAllRecipes();
    }, [])

    const getAllRecipes = async () => {
        try {
            const response = await fetch("/allRecipes");
            const jsonData = await response.json();
            setAllRecipes(jsonData)

        } catch (error) {
            console.error("getAllRecipes error : " + error.message)
        }
    }

    const addRecipe = (recipe, e) => {
        if (!recipes.includes(recipe.id_recipe) || !menu.includes(recipe)) {
            let addRecipes = [...recipes, recipe.id_recipe]
            let addMenu = [...menu, recipe]
            setRecipes(addRecipes);
            setMenu(addMenu);
            setCounter(counter + 1)

        } else {
            let indexId = recipes.indexOf(recipe.id_recipe)
            let indexMenu = menu.indexOf(recipe)
            let recipesBis = recipes
            let menuBis = menu
            recipesBis.splice(indexId, 1)
            menuBis.splice(indexMenu, 1)
            setRecipes(recipesBis)
            setMenu(menuBis)
            setRerender(oldState => ({ rerender: !oldState }))
            setCounter(counter - 1)
        }
        e.stopPropagation();
    }

    //Reset state parts at each open
    const toModalRecipe = (recipe) => {
        setRecipe(recipe);
        setParts(recipe.nb_parts)
    }

    return (
        <div className="container">
            <div className="wrap-counter">
                <div className="page-title">Liste des recettes</div>
                {counter !== 0 && <div className="counter">{counter}</div>}
            </div>
            <input type="text" className="recipe-search form-control" placeholder="Rechercher..." onChange={e => { setSearchTerm(e.target.value) }}></input>
            <div className="wrapper-recipes">
                {allRecipes.filter((val) => {
                    if (searchTerm === "") {
                        return val
                    } else if (val.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                        return val
                    }
                }).map((recipe, index) => {
                    return (
                        <div className="recipe" key={index} data-toggle="modal" data-target="#myModal" onClick={() => toModalRecipe(recipe)}>
                        <div className="name-recipe">{recipe.name} {recipe.cal && "(" + recipe.cal + " kcal)"}</div>
                            <div className={recipes.includes(recipe.id_recipe) ? "added" : "not-added"} onClick={(e) => { addRecipe(recipe, e) }}>
                                {recipes.includes(recipe.id_recipe) ? <BsFillCheckCircleFill></BsFillCheckCircleFill> : <AiOutlinePlusCircle></AiOutlinePlusCircle>}
                            </div>
                        </div>
                    )
                })}
            </div>
            <Modal  recipe={recipe} getAllRecipes={getAllRecipes} parts={parts} setParts={setParts}></Modal>
        </div>
    )
}

export default Recipes
