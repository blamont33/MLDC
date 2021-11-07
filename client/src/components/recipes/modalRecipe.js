import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import ModalDelete from './modalDelete';

const Modal = ({ recipe, getAllRecipes, parts, setParts }) => {

    const [ingredients, setIngredients] = useState([]);
    const history = useHistory();

    useEffect(() => {
        if (recipe) {
            const getIngredientsByRecipe = async () => {
                try {
                    const response = await fetch(`/ingredientByRecipe/${recipe.id_recipe}`);
                    const jsonData = await response.json();
                    setIngredients(jsonData);

                } catch (error) {
                    console.error("getIngredientsByRecipe error : " + error.message)
                }
            }
            getIngredientsByRecipe();
        }
    }, [recipe])

    const modifyRecipe = () => {
        history.push({
            pathname: '/recette',
            state: { recipe: recipe, ingredients: ingredients }
        })
    }

    return (
        <div className="modal-recipe">
            <div className="modal" id="myModal">
                <div className="md modal-dialog ">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">{recipe.name} ({recipe.cal} kcal)</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="mb modal-body pl-4">
                            <b>Nombre de parts :</b> <input type="number" value={parts ? parts : recipe.nb_persons} className="inline-form nb-parts" onChange={(e) => setParts(e.target.value)} />
                            <div className="mb-2"><b>Ingrédients :</b></div>
                            {ingredients.map((val, index) => {
                                return <div key={index}>- {val.name} : {parts ? <b>{parseInt(val.quantity) / recipe.nb_persons * parts} {val.measure}</b> : <b>{val.quantity} {val.measure}</b>}</div>
                            })}
                            {recipe.making && <div className="mb-2 mt-3"><b>Préparation :</b></div>}
                            {recipe.making && <div className="making mb-3">{recipe.making}</div>}
                            {recipe.link && <a href={recipe.link} target="_blank" className="btn mr-2 blue-btn mt-4" role="button" rel="noreferrer">Lien vers la recette</a>}

                            <button className="btn mr-2 mt-4 orange-btn" onClick={modifyRecipe} data-dismiss="modal">Modifier</button>
                            <button type="button" className="btn mr-2 mt-4 btn-danger" data-toggle="modal" data-target="#modalDelete">
                                Supprimer
                            </button>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal" id="close">Fermer</button>
                        </div>
                    </div>
                </div>
                <ModalDelete recipe={recipe} getAllRecipes={getAllRecipes}></ModalDelete>
            </div>
        </div>

    )
}

export default Modal
