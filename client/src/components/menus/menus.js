import React, { useState, useEffect, useRef } from 'react'
import Modal from '../recipes/modalRecipe.js';
import { AiFillCloseCircle } from 'react-icons/ai';
import './menus.css'
import { formatDateTime } from '../../utils/utils';
import { useHistory } from "react-router-dom";

const Menus = ({ menu, setMenu }) => {

    const [recipe, setRecipe] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [rerender, setRerender] = useState(true);
    const [dates, setDates] = useState([]);
    const history = useHistory();
    const menus = useRef(null)

    const getDates = async () => {
        try {
            const response = await fetch("/allMenus");
            const jsonData = await response.json();
            setDates(jsonData)
        } catch (error) {
            console.error("getDates error : " + error)
        }
    };

    //console.log(recipes)
    console.log(menu)
    console.log(recipe)

    useEffect(() => {
        getDates();
    }, [])

    const getRecipes = async () => {
        try {
            if (menu.length > 0) {
                var dynamicRequest = "/recipeById?"
                menu.forEach(el => {
                    dynamicRequest = dynamicRequest + "id[]=" + el.id_recipe + "&"
                });
                dynamicRequest = dynamicRequest.substring(0, dynamicRequest.length - 1)
                const response = await fetch(dynamicRequest)
                const jsonData = await response.json();
                setRecipes(jsonData)
            } else {
                setRecipes([]);

            }


        } catch (error) {
            console.error("getRecipes error : " + error)
        }
    }

    useEffect(() => {

        getRecipes();

    }, [menu])

    const reset = () => {
        setMenu([]);
        setRecipes([]);
        menus.current.value = ""
    }

    const removeRecipe = (id_recipe, e) => {
        let index = menu.findIndex(i => i.id_recipe === id_recipe);
        let menuBis = menu;
        menuBis.splice(index, 1);
        setMenu(menuBis);
        getRecipes();
        e.stopPropagation();
        setRerender(oldState => ({ rerender: !oldState }))
    }

    const saveMenu = async () => {
        try {
            const body = { recipes: menu };
            await fetch("/addMenu", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
                .then(reset())
                .then(getDates())
                .then(setRerender(oldState => ({ rerender: !oldState })))
        } catch (error) {
            console.error("saveMenu error : " + error)
        }
    }

    const getMenusByDate = async (updated_at) => {
        try {
            const response = await fetch(`/menusDate?date=${updated_at}`);
            const jsonData = await response.json();
            setMenu(jsonData);
        } catch (error) {
            console.error("getMenus error : " + error)
        }
    }

    const generateList = async () => {
        try {
            var dynamicRequest = "/finalList?"
            menu.forEach(el => {
                dynamicRequest = dynamicRequest + "recipe[]=" + el.id_recipe + "&"
            });
            dynamicRequest = dynamicRequest.substring(0, dynamicRequest.length - 1)
            const response = await fetch(dynamicRequest)
            const jsonData = await response.json();

            history.push({
                pathname: '/liste',
                state: { list: jsonData }
            })

        } catch (error) {
            console.error("generateList " + error)
        }
    }

    const deleteMenu = async () => {
        const id_menu = menu[0].id_menu;
        try {
            await fetch(`/deleteMenu/${id_menu}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            })
                .then(reset())
                .then(getDates())
                .then(setRerender(oldState => ({ rerender: !oldState })))
        } catch (error) {
            console.error("deleteMenu " + error)
        }
    }

    return (
        <div className="container">
            <div className="page-title">Mes menus</div>
            <select className="form-control" ref={menus} onChange={(e) => { getMenusByDate(e.target.value) }}>
                <option value="">Sélectionner une date</option>
                {dates.map((val, index) => {
                    return <option key={index} value={val.updated_at}>{formatDateTime(val.updated_at)}</option>
                })}
            </select>
            <div className="wrapper-recipes">
                {recipes.map((recipe, index) => {
                    return (
                        <div className="recipe" key={index} data-toggle="modal" data-target="#myModal" onClick={() => setRecipe(recipe)}>{recipe.name}
                            <AiFillCloseCircle className="close-btn" onClick={(e) => removeRecipe(recipe.id_recipe, e)} />
                        </div>
                    )
                })}
                <div className="buttons-menu">
                    {menu.length > 0 && <button className="btn blue-btn mr-2" onClick={saveMenu}>Enregistrer le menu</button>}
                    {menu.length > 0 && <button className="btn blue-btn mr-2" onClick={generateList}>Générer liste de courses</button>}
                    {menu.length > 0 && <button className="btn orange-btn mr-2" onClick={reset}>Réinitialiser le menu</button>}
                    {menu.length > 0 && <button className="btn btn-danger" onClick={deleteMenu}>Supprimer le menu</button>}
                </div>
            </div>
            <Modal recipe={recipe}></Modal>
        </div>
    )
}

export default Menus
