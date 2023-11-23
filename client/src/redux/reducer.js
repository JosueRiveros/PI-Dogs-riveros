import {
  GET_DOGS,
  GET_ID,
  GET_TEMPS,
  POST_DOG,
  RESET_DETAIL,
  SORT_BY_WEIGHT,
  SORT_BY_NAME,
  FILTER_BY_DATA,
  FILTER_BY_TEMPS,
  SEARCH_NAME,
  SET_PAGE,
  RESET_AUX
} from "./actions/actionsTypes";
const initialState = {
  allDogs: [],
  filteredByData: [],
  copy: [],
  allTemps: [],
  detail: [],
  aux: [],
  page: 1,
};
const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_DOGS:
      return {...state, allDogs: payload};
    case SET_PAGE:
      return { ...state, page: payload};
    case GET_ID:
      return {...state, detail: payload};
    case RESET_DETAIL:
      return {...state, detail: payload};
    case RESET_AUX:
      return {...state, aux: payload};
    case GET_TEMPS:
      return {...state, allTemps: payload};
    case SORT_BY_WEIGHT:
      const arr = state.aux.length > 0 ? state.aux : state.allDogs;
      const orderW = arr.slice().sort((a, b) => {
        const weightA = a.weightMin;
        const weightB = b.weightMin;

        if (payload === "min") {
          if(weightA < weightB) return -1;
          if(weightA > weightB) return 1;
          return 0;
        } else if (payload === "max") {
          if(weightA > weightB) return -1;
          if(weightA < weightB) return 1;
          return 0;
        }

      });
      console.log(orderW)
      return {
        ...state,
        aux: orderW};
    case SORT_BY_NAME:
      const array = state.aux.length > 0 ? state.aux : state.allDogs;
      const order = array.slice().sort((a, b) => {
        const nameA = a.name;
        const nameB = b.name;

        if (payload === "asc") {
          return nameA.localeCompare(nameB);
        } else if (payload === "desc") {
          return nameB.localeCompare(nameA);
        }

        return 0;
      });

      console.log(order);
      return {
        ...state,
        aux: order,
      };


    case FILTER_BY_DATA:
      let filteredData = [];
      if (payload === "DataBase") {
        if (state.copy.length === 0) {
          filteredData = state.allDogs.filter(
            (dog) => typeof dog.id !== "number"
          );
        } else {
          filteredData = state.copy.filter(
            (dog) => typeof dog.id !== "number"
          );
          if (filteredData.length === 0) {
            return state;
          } else return { ...state, aux: filteredData };
        }
      } else if (payload === "Api") {
        
        if (state.copy.length === 0) {
          filteredData = state.allDogs.filter(
            (dog) => typeof dog.id === "number"
          );
        } else {
          filteredData = state.copy.filter(
            (dog) => typeof dog.id === "number"
          );
          
          if (filteredData.length === 0) {
            return state;
          } else return { ...state, aux: filteredData };
        }
      } else if (payload === "All") {
        if (state.copy.length === 0) {
          filteredData = state.allDogs;
        } else {
          filteredData = state.copy;
          return { ...state, aux: filteredData };
        }
      }
      return { ...state, filteredByData: filteredData };

    case FILTER_BY_TEMPS:

      if (state.aux.length === 0 && state.filteredByData.length === 0) {
        const filterTemp = state.allDogs.filter((dog) => {
          if (dog.temperament) {
            return dog.temperament?.includes(payload);
          } 

        });
        state.copy = filterTemp;
        return { ...state, aux: filterTemp };
      } else if (state.filteredByData.length === 0) {
        const filterTemp = state.aux.filter((dog) => {
          if (dog.temperament) {
            return dog.temperament?.includes(payload);
          } 

        });
        if (filterTemp.length === 0) {
          return state;
        }
        state.copy = filterTemp;
        return { ...state, aux: filterTemp };
      } else {
        const filterTemp = state.filteredByData.filter((dog) => {
          if (dog.temperament) {
            return dog.temperament?.includes(payload);
          } 

        });
        if (filterTemp.length === 0) {
          return state;
        }
        state.copy = filterTemp;
        return { ...state, aux: filterTemp };
      }

    case SEARCH_NAME:
      return {...state, aux: payload };
    
    case POST_DOG:
      return { ...state, payload };
    default:
      return {
        ...state};
  }
};

export default rootReducer;
