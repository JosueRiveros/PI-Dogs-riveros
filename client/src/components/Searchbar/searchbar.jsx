import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchName } from "../../redux/actions/actions";
import styles from "./searchbar.module.css";
import { setPage } from "../../redux/actions/actions";
const SearchBar = () => {
  const dispatch = useDispatch();
  const [nameToFilter, setNameToFilter] = useState("");

  const handleSearch = () => {
    if (!nameToFilter || !isNaN(nameToFilter))
       return alert("Enter a valid name");
     dispatch(searchName(nameToFilter));
     dispatch(setPage(1));
  };

  const handleChange = (event) => {
    setNameToFilter(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={styles.containerSearch}>
      <input
        type="text"
        value={nameToFilter}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        placeholder="Enter a name"
        className={styles.inputSearch}
      />
      <button
        onClick={handleSearch}
        className={`${styles.btnSearch} btn btnPrimary`}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
