import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from "react-router-dom";
import { AiFillCloseCircle } from 'react-icons/ai';
import SearchBar from './searchBar';

const List = () => {

    const location = useLocation();
    const [list, setList] = useState(JSON.parse(sessionStorage.getItem('list')));
    const [ingredients, setIngredients] = useState([]);
    const [rerender, setRerender] = useState(true);
    const history = useHistory();

    useEffect(() => {
        if (location.state) {
            sessionStorage.setItem('list', JSON.stringify(location.state.list))
            setList(JSON.parse(sessionStorage.getItem('list')))
            history.replace()
        }
    }, [location, history])

    useEffect(() => {
        const getIngredients = async () => {
            try {
                const response = await fetch("/allIngredients");
                const jsonData = await response.json();
                setIngredients(jsonData)
            } catch (error) {
                console.error("allIngredients error : " + error)
            }
        }
        getIngredients();
    }, [])

    const removeIngredient = (ingredient) => {
        let index = list.indexOf(ingredient);
        let tempList = list;
        tempList.splice(index, 1);
        sessionStorage.setItem('list', JSON.stringify(tempList));
        setRerender(oldState => ({ rerender: !oldState }));
    }

    const reset = () => {
        sessionStorage.clear()
        setList([])
    }

    return (
        <div className="container">
            <div className="empty-list">
                <div className="page-title">Ma liste de courses</div>
                {list && list.length > 0 && <button className="empty-list-btn btn orange-btn" onClick={reset}>Vider la liste</button>}
            </div>

            {list && list.length > 0 && <div className="wrap-final-list">
                {list && list.map((val, index) => {
                    return (
                        <div className="form-check list-line" key={index}>
                            <label className="form-check-label">
                                <input type="checkbox" className="form-check-input check" />{val.name} - {val.quantity} {val.measure}
                            </label>
                            <AiFillCloseCircle className="remove-list" onClick={() => removeIngredient(val)} />
                        </div>)
                })}
            </div>}

            {list && list.length > 0 && <SearchBar ingredients={ingredients} list={list} setRerender={setRerender} reset={reset} />}

        </div>
    )
}

export default List
