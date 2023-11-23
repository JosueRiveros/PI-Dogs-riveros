import axios from "axios";
import {
  URL,
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
  RESET_AUX} from "./actionsTypes";

export const setPage = (numPage) => {
  return { type: SET_PAGE, payload: numPage };
};

export const getDogs = () => {
  return async (dispatch) => {
    try {
    const { data } = await axios.get(`${URL}/dogs`)
    return dispatch({ type: GET_DOGS, payload: data });
    } catch (error) {
     console.log(error)
    }
  }
}

export const getId = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/dogs/${id}`);
      return dispatch({ type: GET_ID, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getTemps = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/temperaments`);
      return dispatch({ type: GET_TEMPS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const postDog = async (newDog) => {
  try {
    console.log(newDog)
    const created = await axios.post(`${URL}/dogs`, newDog);
    window.alert("Dog created");
    getDogs();
    return true;
  } catch (error) {
    window.alert(error?.response?.data?.error);
  }
};

export const resetDetail = () => {
  return { type: RESET_DETAIL, payload: [] };
};
export const resetAux = () => {
  return { type: RESET_AUX, payload: [] };
};
export const sortByWeight = (order) => {
  return { type: SORT_BY_WEIGHT, payload: order };
};

export const sortByName = (order) => {
  return { type: SORT_BY_NAME, payload: order };
};

export const filterByData = (filter) => {
  return { type: FILTER_BY_DATA, payload: filter };
};

export const filterByTemps = (temp) => {
  return { type: FILTER_BY_TEMPS, payload: temp };
};

export const searchName = (name) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/dogs?name=${name}`);
      return dispatch({ type: SEARCH_NAME, payload: data });
    } catch (error) {
      alert("Dog not found. Try again please");
      console.log(error);
    }
  };
};
