import React from 'react'

const ModalDelete = ({ recipe, getAllRecipes }) => {

    const deleteRecipe = async () => {
        try {
            await fetch(`/deleteRecipe/${recipe.id_recipe}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            }).then(
                getAllRecipes()
            )

        } catch (error) {
            console.error("deleteRecipe error : " + error.message)
        }
    }

    return (
        <div className="modal" id="modalDelete">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">{recipe.name}</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                        Voulez vous vraiment supprimer la recette : {recipe.name} ?
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-danger" onClick={deleteRecipe} data-dismiss="modal">Supprimer</button>
                        <button type="button" className="btn btn-info" data-dismiss="modal">Annuler</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ModalDelete
