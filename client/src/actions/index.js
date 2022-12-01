export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const SET_ALL_RECIPES = "GET_ALL_RECIPES";
export const CHANGE_PAGE = "GET_ALL_RECIPES";
export const GET_ALL_DIET_TYPES = "GET_ALL_DIET_TYPES"
export const GET_RECIPE = "GET_RECIPE"
export const GET_RECIPE_BY_ID = "GET_RECIPE_BY_ID"
export const LETTER_SORT = "LETTER_SORT"
export const SCORE_SORT = "SCORE_SORT"
export const DIET_FILTER = "DIET_FILTER"
export const RANDOM_ORDER = "RANDOM_ORDER"


export const getRecipes = () => async (dispatch) => {
    return fetch("http://localhost:3001/recipes")   
    .then((response) => response.json())
    .then((json) => dispatch({ type: GET_ALL_RECIPES, payload: json }));      
};

export const getDietTypes = () => async (dispatch) => {
    return fetch("http://localhost:3001/diets")
      .then((response) => response.json())
      .then((json) => dispatch({ type: GET_ALL_DIET_TYPES, payload: json}));
  };
  
export const getRecipe = (name) => async (dispatch) => {
    return fetch(`http://localhost:3001/recipes?name=${name}`)
        .then((response) => response.json())
        .then((json) => dispatch({ type: GET_RECIPE, payload: json }))
        .catch((r) => alert(r));
};
  
export const getRecipeById = (id) => async (dispatch) => {
    return fetch(`http://localhost:3001/recipes/${id}`)
        .then((response) => response.json())
        .then((json) => dispatch({ type: GET_RECIPE_BY_ID, payload: json }));
};


export const addRecipe = (data) => async () => {
    return (
        fetch('http://localhost:3001/recipes', {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(data)})
            .then((response) => response.json())
            .then((json) => alert(`${json}`))
    )
}

export function lettersSort (payload) {
    return {
        type: LETTER_SORT,
        payload
    }
}

export function scoreSort (payload) {
    return {
        type: SCORE_SORT,
        payload
    }
}

export function dietFilter(payload) {
    return {
        type: DIET_FILTER,
        payload
    }
};

export function randomOrder () {
    return {
        type: RANDOM_ORDER
    }
}



