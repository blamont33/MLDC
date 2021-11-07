import React, { useState, useEffect, useRef } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import './createRecipe.css'

const CreateRecipe = () => {

    const [ingredients, setIngredients] = useState([]);
    const [quantity, setQuantity] = useState();
    const [measure, setMeasure] = useState("");
    const [ingredientsAdded, setIngredientsAdded] = useState([]);
    const [rerender, setRerender] = useState(true);
    const [name, setName] = useState("");
    const [link, setLink] = useState("");
    const [noParts, setNbParts] = useState("");
    const [making, setMaking] = useState();
    const [searchTerm, setSearchTerm] = useState("");
    const [ingredient, setIngredient] = useState("");
    const allMeasure = ['g', 'cl', 'ml', 'pincée', 'poignée', 'c.s.', 'c.c.']
    const location = useLocation();
    const [id_recipe, setId_recipe] = useState("");
    const history = useHistory();
    const [calories, setCalories] = useState("")
    const refName = useRef(null)
    const missName = useRef(null)
    const refParts = useRef(null)
    const missParts = useRef(null)
    const inputIng = useRef(null)

    //Fill the form to modify existing recipe
    useEffect(() => {
        if (location.state) {
            setName(location.state.recipe.name);
            setLink(location.state.recipe.link);
            setNbParts(location.state.recipe.nb_persons);
            setMaking(location.state.recipe.making);
            setIngredientsAdded(location.state.ingredients);
            setId_recipe(location.state.recipe.id_recipe);
            setCalories(location.state.recipe.cal)
        }
    }, [location])

    useEffect(() => {
        getIngredients();
    }, [])

    //Fill the list of ingredients
    const getIngredients = async () => {
        try {
            const response = await fetch("/allIngredients");
            const jsonData = await response.json();
            setIngredients(jsonData)
        } catch (error) {
            console.error("allIngredients error : " + error)
        }
    }

    //Add an ingredient to the recipe
    const pushIngredient = (id_ingredient, name) => {
        if (!quantity || quantity === "0") {
            if (window.innerWidth > 1024) {
                document.getElementById("qte" + id_ingredient).style.display = 'block'
            }

            document.getElementById(id_ingredient).style.borderColor = '#FF0000'
        } else {
            const ingredient = {
                id_ingredient: id_ingredient,
                quantity: quantity,
                measure: measure,
                name: name,
            }
            let add = [...ingredientsAdded, ingredient];
            setIngredientsAdded(add)
            setQuantity("");
            setMeasure("");
            setSearchTerm("");
            document.getElementById(id_ingredient).disabled = true;
            document.getElementById(name).disabled = true;
            document.getElementById("qte" + id_ingredient).style.display = 'none'
            document.getElementById(id_ingredient).style.borderColor = '#CED4DA'
        }

    }

    //Remove an ingredient from the recipe
    const removeIngredient = (id_ingredient, name) => {
        let index = ingredientsAdded.findIndex(i => i.id_ingredient === id_ingredient)
        let temp = ingredientsAdded
        temp.splice(index, 1)
        setIngredientsAdded(temp)
        setRerender(oldState => ({ rerender: !oldState }))
        if (!location.state) {
            document.getElementById(id_ingredient).value = "";
            document.getElementById(id_ingredient).disabled = false;
            document.getElementById(name).value = "";
            document.getElementById(name).disabled = false;
        }
    }

    //Allow change of quantity/measure of a selected ingredient
    const changeValue = (id_ingredient, e) => {
        let index = ingredientsAdded.findIndex(i => i.id_ingredient === id_ingredient);
        if (e.target.className === "form-control quantity") {
            ingredientsAdded[index].quantity = e.target.value;
        } else {
            ingredientsAdded[index].measure = e.target.value;
        }
        setRerender(oldState => ({ rerender: !oldState }));
    }

    //To cancel effect when input name is empty
    useEffect(() => {
        missName.current.style.display = 'none'
        refName.current.style.borderColor = '#CED4DA'
    }, [name])

    //To cancel effect when input parts is empty
    useEffect(() => {
        missParts.current.style.display = 'none'
        refParts.current.style.borderColor = '#CED4DA'
    }, [noParts])

    // Submit the recipe
    const submitRecipe = async () => {
        if (!name) {
            refName.current.style.borderColor = '#FF0000'
            missName.current.style.display = 'block'
        } else if (!noParts) {
            refParts.current.style.borderColor = '#FF0000'
            missParts.current.style.display = 'block'
        } else {
            try {
                const body = { name: name.toLowerCase(), link: link, nb_persons: noParts, making: making, ingredients: ingredientsAdded, calories: calories };
                await fetch("/addRecipe", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }).then(
                    window.location = './recette'
                )
            } catch (error) {
                console.error("addRecipe error : " + error)
            }
        }
    }

    //Update an existing recipe
    const updateRecipe = async (id_recipe) => {
        if (!name) {
            refName.current.style.borderColor = '#FF0000'
            missName.current.style.display = 'block'
        } else if (!noParts) {
            refParts.current.style.borderColor = '#FF0000'
            missParts.current.style.display = 'block'
        } else {
            try {
                const body = { name: name.toLowerCase(), link: link, nb_persons: noParts, making: making, ingredients: ingredientsAdded, id_recipe: id_recipe, calories: calories };
                await fetch("/updateRecipe", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }).then(reset())
                    .then(window.location = './recette')
            } catch (error) {
                console.error("updateRecipe error : " + error)
            }
        }
    }

    //Create a new ingredient
    const createIngredient = async (e) => {
        e.preventDefault();
        try {
            const body = { ingredient: ingredient };
            await fetch("/addIngredient", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
        } catch (error) {
            console.error("addIngredient error : " + error)
        }
        getIngredients();
        setIngredient("");
        inputIng.current.value = ""
    }

    //Reset form
    const reset = () => {
        setName("");
        setLink("");
        setNbParts("");
        setMaking("");
        setIngredientsAdded([]);
        setCalories("");
        history.replace();
    }

    return (
        <div className="container">
            <div className="page-title">{location.state ? "Modifier la recette" : "Créer une nouvelle recette"} {location.state && <button className="btn blue-btn float-right" onClick={reset}>Annuler modifications</button>}</div>

            {/* First form */}
            <div className="row">
                <div className="col-md-6">
                    <input type="text" className="form-control mb-2" placeholder="Nom de la recette" value={name} ref={refName} onChange={e => setName(e.target.value)}></input>
                    <div ref={missName} className="missing">Vous devez donner un nom à votre recette</div>
                    <input type="text" className="form-control mt-2 mb-2" placeholder="Lien vers le site Web" value={link} onChange={e => setLink(e.target.value)}></input>
                    <input type="number" min="1" ref={refParts} className="form-control mb-2" placeholder="Nombre de parts" value={noParts} onChange={e => setNbParts(e.target.value)} ></input>
                    <div id="miss-parts" ref={missParts} className="missing">Indiquez le nombre de parts</div>
                    <input type="number" className="form-control mb-2 mt-2" placeholder="Nombre de calories" value={calories} onChange={e => setCalories(e.target.value)}></input>
                </div>
                <div className="col-md-6">
                    <textarea type="textarea" className="link form-control" placeholder="Préparation" value={making} onChange={e => setMaking(e.target.value)}></textarea>
                </div>
            </div>

            {/* List of ingredients */}
            <div className="list-title">Liste des ingrédients</div>
            <input type="text" className="recipe-search form-control" placeholder="Rechercher..." value={searchTerm} onChange={e => { setSearchTerm(e.target.value) }}></input>
            <div className="wrapper-recipes">
                <div className="wrap-list">
                    {ingredients.map((val, index) => {
                        return (
                            <div className={val.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ? "line-ingredient" : "line-ingredient-off"} key={index}>
                                <div className="name-ing">{val.name}</div>
                                <div className="form-ing">
                                    <div id={`qte${val.id_ingredient}`} className="miss-quantity">Veuillez entrer une quantité</div>
                                    <input type="number" min="0" step="any" className="form-control quantity" id={val.id_ingredient} onChange={e => setQuantity(e.target.value)}></input>
                                    <select className="form-control measure-list" id={val.name} onChange={e => setMeasure(e.target.value)} >
                                        <option></option>
                                        {allMeasure.map((val, index) => <option key={index}>{val}</option>)}
                                    </select>
                                    {ingredientsAdded.filter(i => i.id_ingredient === val.id_ingredient).length > 0 ?
                                        <BsFillCheckCircleFill className="rem-ing" onClick={() => removeIngredient(val.id_ingredient, val.name)} />
                                        : <AiOutlinePlusCircle className="add-ing" onClick={() => pushIngredient(val.id_ingredient, val.name)} />}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Display selected ingredients */}
            <div className="row wrap-added-ing">
                <div className="col-md-6 order-2 order-md-12">
                    {ingredientsAdded.map((val, index) => {
                        return (
                            <div className="line-ingredient-added" key={index}>
                                <div className="name-ing">{val.name}</div>
                                <div className="form-ing">
                                    <input type="number" className="form-control quantity" value={val.quantity} onChange={(e) => changeValue(val.id_ingredient, e)}></input>
                                    <select className="form-control measure-list" value={val.measure} onChange={(e) => changeValue(val.id_ingredient, e)}>
                                        <option>{undefined}</option>
                                        {allMeasure.map((val, index) => <option key={index}>{val}</option>)}
                                    </select>
                                    <AiFillCloseCircle className="del-ing" onClick={() => removeIngredient(val.id_ingredient, val.name)} />
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Create an ingredient */}
                <div className="col-md-6 order-1 order-md-12">
                    <form className="create-ing" onSubmit={createIngredient}>
                        <input type="text" className="form-control input-create mr-3" ref={inputIng} placeholder="Ingrédient" required onChange={(e) => setIngredient(e.target.value)}></input>
                        <button type="submit" className="btn blue-btn mb-2">Créer un ingrédient</button>
                    </form>
                    {ingredientsAdded.length !== 0 && <button type="button" className="btn btn-submit-recipe" onClick={location.state ? () => updateRecipe(id_recipe) : submitRecipe}>{location.state ? "Modifier la recette" : "Valider la recette"}</button>}
                </div>
            </div>
        </div>
    )
}

export default CreateRecipe
