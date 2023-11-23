import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getDogs,
  getTemps,
  filterByTemps,
  filterByData,
  sortByName,
  sortByWeight,
  setPage,
  resetAux
} from "../../redux/actions/actions";

import styles from "./filters.module.css";

const Filters = () => {
  const temps = useSelector((state) => state.allTemps);
  const dispatch = useDispatch();
  const [tempSearch, setTempSearch] = useState("");

  const sortedTemps = temps.slice().sort((a, b) => a.name.localeCompare(b.name));

  useEffect(() => {
    dispatch(getTemps());
  }, []);

  const handleTempsFilter = (event) => {
    const temp = event.target.value;
    dispatch(setPage(1));
    dispatch(filterByTemps(temp));
  };

  const handleOrderBy = (event) => {
    const { value } = event.target;
    dispatch(sortByName(value));
  };

  const handleOrderWeight = (event) => {
    const { value } = event.target;
    dispatch(sortByWeight(value));
  };

  const handleDataRoute = (event) => {
    const { value } = event.target;
    dispatch(filterByData(value));
    dispatch(setPage(1));
  };

  const handleReset = () => {
    dispatch(setPage(1));
    dispatch(getDogs());
    dispatch(resetAux());
    setTempSearch("");

    document.getElementById("tempFilter").selectedIndex = 0;
    document.getElementById("orderByFilter").selectedIndex = 0;
    document.getElementById("orderWFilter").selectedIndex = 0;
    document.getElementById("dataRouteFilter").selectedIndex = 0;
    dispatch(filterByData([]));
    dispatch(filterByTemps([]));
   };

  // Filtrar la lista de equipos según el valor de temperamento
  const filteredTemps = sortedTemps.filter((temp) =>
    temp.name.toLowerCase().includes(tempSearch.toLowerCase())
  );

return (
  <div>
    <div className={`${styles.containerFilters} container`}>

      <input
        type="text"
        placeholder="Temperament Filter"
        value={tempSearch}
        onChange={(e) => {
          setTempSearch(e.target.value);
        }}
      />

      <select
        id="tempFilter"
        defaultValue={"default"}
        onChange={handleTempsFilter}
      >
        <option value="default">By Temperaments</option>
        {filteredTemps?.map((temp) => (
          <option key={temp.id} value={temp.name}>
            {temp.name}
          </option>
        ))}
      </select>

      <select
        id="orderByFilter"
        defaultValue={"default"}
        onChange={handleOrderBy}
      >
        <option value="default">By ABC</option>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>

      <select
        id="orderWFilter"
        defaultValue={"default"}
        onChange={handleOrderWeight}
      >
        <option value="default">By Weight</option>
        <option value="max">Max to min</option>
        <option value="min">Min to max</option>
      </select>

      <select
        id="dataRouteFilter"
        defaultValue={"default"}
        onChange={handleDataRoute}
      >
        <option value="default">By Data</option>
        <option value="All">All Data</option>
        <option value="Api">API Data</option>
        <option value="DataBase">DB Data</option>
      </select>

      <button onClick={handleReset} className={styles.button}>
        RESET
      </button>
    </div>
  </div>
);
};

export default Filters;