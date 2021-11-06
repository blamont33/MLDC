const express = require('express')
require('dotenv').config()
const cors = require("cors")
const pool = require("./db")
const { formatDate, formatDateTo } = require('./utils/formatDateForDb')
const PORT = process.env.PORT || 5000
const app = express()

//middleware
app.use(cors());
app.use(express.json());

//create ingredient
app.post("/addIngredient", async (req, res) => {
    try {
        const { ingredient } = req.body;

        const addIngredient = await pool.query("insert into ingredients values (default, $1)", [ingredient]);
        res.json(addIngredient.rows)
    } catch (error) {
        console.error("addIngredient error : " + error)
    }
})

//create recipe
app.post("/addRecipe", async (req, res) => {

    try {
        const { name, link, nb_persons, making, ingredients, calories } = req.body;

        const getRecipeId = await pool.query("insert into recipes values (default, $1, $2, $3, $4, $5) returning id_recipe", [name, link, nb_persons, making, calories]);
        const id_recipe = getRecipeId.rows[0].id_recipe;

        await ingredients.forEach(element => {
            pool.query("insert into recipes_ingredients values ($1, $2, $3, $4) ", [element.id_ingredient, id_recipe, element.quantity, element.measure]);
        });
        res.json(getRecipeId.rows)
    } catch (error) {
        console.error("addRecipe error : " + error)
    }
})

//Save menu
app.post("/addMenu", async (req, res) => {

    const { recipes } = req.body;

    if (recipes[0].id_menu) {
        try {
            const id_menu = recipes[0].id_menu;
            await pool.query("update menu set updated_at = default where id_menu = $1", [id_menu]);
            await pool.query("delete from menu_recipes where id_menu = $1", [id_menu]);
            await recipes.forEach(recipe => {
                pool.query("insert into menu_recipes values ($1, $2)", [id_menu, recipe.id_recipe])
            })
    
        } catch (error) {
            console.error("updateMenu error : " + error)
        }
    } else {
        try {
            const getMenuId = await pool.query("insert into menu values (default, default, default) returning id_menu");
            const id_menu = await getMenuId.rows[0].id_menu

            await recipes.forEach(recipe => {
                pool.query("insert into menu_recipes values ($1, $2)", [id_menu, recipe.id_recipe])
            })

            res.json(getMenuId.rows[0])

        } catch (error) {
            console.error("addMenu error : " + error)
        }
    }
});

//Delete menu
app.delete("/deleteMenu/:id", async (req, res) => {
    try {
        const {id} = req.params
        console.log(id)
        await pool.query("delete from menu_recipes where id_menu = $1", [id])
        await pool.query("delete from menu where id_menu = $1", [id])
    } catch (error) {
        console.error("deleteMenu error : " + error)
    }
})


//get recipes
app.get("/allRecipes", async (req, res) => {
    try {
        const getRecipes = await pool.query("select * from recipes order by name")
        res.json(getRecipes.rows)
    } catch (error) {
        console.error("allRecipes error : " + error)
    }
});

//get recipes by id
app.get("/recipeById", async (req, res) => {
    try {
        const ids_recipe = req.query;

        if (ids_recipe.id) {
            var dynamicRequest = "select * from recipes where id_recipe in ("
            var dynamicList = []

            for (let index = 1; index <= ids_recipe.id.length; index++) {
                dynamicRequest = dynamicRequest + "$" + index + ", ";
                dynamicList.push(ids_recipe.id[index - 1])
            }
            dynamicRequest = dynamicRequest.substring(0, dynamicRequest.length - 2) + ")"

            const recipes = await pool.query(dynamicRequest, dynamicList)
            res.json(recipes.rows)
        }
    } catch (error) {
        console.error("recipeById error : " + error)
    }
})

//get ingredients by recipe
app.get("/ingredientByRecipe/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const ingredients = await pool.query("select * from ingredients i inner join recipes_ingredients ri on i.id_ingredient = ri.id_ingredient where ri.id_recipe = $1", [id]);

        res.json(ingredients.rows)
    } catch (error) {
        console.error("ingredientByRecipe error : " + error)
    }
});

//Get all ingredients
app.get("/allIngredients", async (req, res) => {
    try {
        const ingredients = await pool.query("select id_ingredient, initcap(name) as name from ingredients i order by i.name ")
        res.json(ingredients.rows)
    } catch (error) {
        console.error("allIngredients error : " + error)
    }
})

//Update recipe
app.put("/updateRecipe", async (req, res) => {
    try {
        const { name, link, nb_persons, making, ingredients, id_recipe, calories } = req.body;
        await pool.query(`update recipes r set name = $1, link = $2, nb_persons= $3, making = $4, cal = $5 where r.id_recipe = $6;`, [name, link, nb_persons, making, calories, id_recipe]);
        await pool.query(`delete from recipes_ingredients r where r.id_recipe = $1;`, [id_recipe]);
        await ingredients.forEach(element => {
            pool.query("insert into recipes_ingredients values ($1, $2, $3, $4) ", [element.id_ingredient, id_recipe, element.quantity, element.measure]);
        });
    } catch (error) {
        console.error("updateRecipe error : " + error)
    }
})

//get menus by date
app.get("/menusDate", async (req, res) => {
    try {
        const { date } = req.query
        const menus = await pool.query("select * from menu m inner join menu_recipes mr on m.id_menu = mr.id_menu where m.updated_at >= $1 and m.updated_at < $2", [formatDate(date), formatDateTo(date)]);
        res.json(menus.rows)
    } catch (error) {
        console.error("menusDate error : " + error)
    }
})

//get all menus
app.get("/allMenus", async (req, res) => {
    try {
        const dates = await pool.query("select updated_at from menu group by updated_at order by updated_at DESC");

        res.json(dates.rows)
    } catch (error) {
        console.error("allMenus error : " + error)
    }
})

//Get finale list
app.get("/finalList", async (req, res) => {
    try {
        const recipes = req.query;
        var dynamicRequest = "";
        var dynamicList = [];
        for (let index = 1; index <= recipes.recipe.length; index++) {
            dynamicRequest = dynamicRequest + "$" + index + ", ";
            dynamicList.push(recipes.recipe[index - 1])
        }
        dynamicRequest = dynamicRequest.substring(0, dynamicRequest.length - 2);

        const list = await pool.query("select i.name, SUM(ri.quantity) as quantity , ri.measure from ingredients i " +
            "inner join recipes_ingredients ri on i.id_ingredient = ri.id_ingredient " +
            `where ri.id_recipe in (${dynamicRequest}) ` +
            "group by i.name, ri.measure " +
            "order by i.name", dynamicList)

        res.json(list.rows)
    } catch (error) {
        console.error("finalList error : " + error)
    }
})

//Delete recipe
app.delete("/deleteRecipe/:id", async (req, res) => {
    try {
        console.log(req.params)
        const { id } = req.params;
        await pool.query("delete from recipes_ingredients where id_recipe = $1", [id]);
        await pool.query("delete from recipes where id_recipe = $1", [id]);
    } catch (error) {
        console.error("deleteRecipe error : " + error)
    }
})

app.listen(PORT, () => {
    console.log(`Le serveur est lancé sur le port : ${PORT}`)
})