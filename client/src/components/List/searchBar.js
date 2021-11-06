import React, { useState } from 'react'
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import './list.css'

const SearchBar = ({ ingredients, list, setRerender }) => {

    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const [quantity, setQuantity] = useState("");
    const [measure, setMeasure] = useState("");
    const allMeasure = ['g', 'cl', 'ml', 'pincée', 'poignée', 'c.s.', 'c.c.']

    const handleFilter = (e) => {
        const searchWord = e.target.value;
        setWordEntered(searchWord)
        const newFilter = ingredients.filter((val) => {
            return val.name.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    }

    const addIngredient = () => {
        let ingredient = {
            name: wordEntered,
            quantity: quantity,
            measure: measure
        }
        let newList = list;
        let sameIngredient = false;
        newList.map(element => {
            if (element.name.toLowerCase() === ingredient.name.toLowerCase() && element.measure === ingredient.measure) {
                element.quantity = parseInt(element.quantity) + parseInt(ingredient.quantity)
                sameIngredient = true;
            }
        });

        if (sameIngredient === false) {
            newList.push(ingredient);
        }

        sessionStorage.setItem('list', JSON.stringify(newList));
        setRerender(oldState => ({ rerender: !oldState }));
        clearInput();
    }

    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("");
    }

    const handleInput = (name) => {
        setWordEntered(name);
        setFilteredData([]);
    }

    return (
        <div className="search">
            <form className="search-inputs" onSubmit={addIngredient}>
                <div className="search-ing">
                    <input className="form-control" type="text" value={wordEntered} placeholder="Ingrédients" required onChange={handleFilter} />
                    <div className="search-icon">
                        {filteredData.length === 0 ? <AiOutlineSearch /> : <AiOutlineClose id="clearBtn" onClick={clearInput} />}
                    </div>
                </div>
                <div className="add-list">
                    <input className="list-quantity form-control pr-0" type="number" min="0" required onChange={(e) => setQuantity(e.target.value)} />
                    <select className="form-control list-measure" onChange={(e) => setMeasure(e.target.value)}>
                        <option></option>
                        {allMeasure.map((val, index) => <option key={index}>{val}</option>)}
                    </select>
                    <button type="submit" className="btn blue-btn add-ing-btn">Ajouter</button>
                </div>

            </form>
            {filteredData.length !== 0 &&
                <div className="data-result">
                    {filteredData.map((val, index) => {
                        return (
                            <div className="data-item" key={index} onClick={() => { handleInput(val.name) }}>{val.name}</div>
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default SearchBar
