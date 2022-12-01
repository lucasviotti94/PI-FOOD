
import {
  GET_ALL_RECIPES,
  GET_ALL_DIET_TYPES,
  GET_RECIPE,
  GET_RECIPE_BY_ID,
  LETTER_SORT,
  SCORE_SORT,
  DIET_FILTER,
  RANDOM_ORDER
} from '../actions'


const initialState = {
    allrecipes: [],
    recipes: [],
    dietTypes: [],
    recipeDetail: []  
  };

export default function rootReducer(state=initialState, action) {


    switch (action.type) {

        case GET_ALL_RECIPES:
          return {            
            ...state,
            allrecipes: action.payload,
            recipes: action.payload,
          }

        case GET_RECIPE:

          const results = action.payload !== [] && action.payload;

          return {
            ...state,
            recipes: results,
          };

        case GET_ALL_DIET_TYPES:
          return {
            ...state,
            dietTypes: action.payload,
          };

        case GET_RECIPE_BY_ID:
          return {
            ...state,
            recipeDetail: action.payload,
          };

        case LETTER_SORT:
          let sortedByLetter = state.recipes;
          sortedByLetter = action.payload === 'AZ' ?
          sortedByLetter.sort(function(a, b) {
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            return 0;
          }) :
          sortedByLetter.sort(function(a, b) {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
            return 0;
          });          
          return {
            ...state,
            recipes: sortedByLetter
          }

        case SCORE_SORT:
          let sortedByScore = state.recipes;
          sortedByScore = action.payload === 'ASC' 
          ?
          sortedByScore.sort(function(a, b) {
            if (a.healthScore > b.healthScore) return 1;
            else if (a.healthScore < b.healthScore) return -1;
            else return 0;
          }) 
          :
          sortedByScore.sort(function(a, b) {
            if (a.healthScore < b.healthScore) return 1;
            else if (a.healthScore > b.healthScore) return -1;
            else return 0;
          });

          return {
            ...state,
            recipes: sortedByScore
          }

          case DIET_FILTER:
            const allRecipesState = state.recipes;          
            const filteredDiets = allRecipesState.filter(r => r.dietTypes?.some(d => d.toLowerCase() === action.payload.toLowerCase()))           
            return {
              ...state,
              recipes: filteredDiets
            };
          
          case RANDOM_ORDER:

            var recipesState = state.recipes;
            var newArray = ((array) => {
              for (let i = array.length - 1; i > 0; i--) {
                  let indiceAleatorio = Math.floor(Math.random() * (i + 1));
                  [array[i], array[indiceAleatorio]] = [array[indiceAleatorio], array[i]]
              };
              return array;
            })(recipesState);

            return {
              ...state,
              recipes: newArray
            }            
        
        default:
          return state;
    }
}