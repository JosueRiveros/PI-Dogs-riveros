import { Link, useLocation } from "react-router-dom";
import SearchBar from "../Searchbar/searchbar";
import styles from "./nav.module.css";
import logo from "../../assets/logo.png";
const Nav = () => {
  const location = useLocation();

  return (
    <div className={styles.navCont}>
      <nav className={styles.nav}>
        <div className={styles.logoContainer}>
          <img src={logo} className={styles.logo} alt="Logo" />
        </div>
        <div className={styles.centeredLinks}>
          <Link to="/home" className={styles.link}>
            HOME
          </Link>
          <Link to="/create" className={styles.link}>
            CREATE DOG
          </Link>
        </div>
        <div className={styles.searchBarContainer}>
           {location.pathname === "/home" && <SearchBar/>}
        </div>
      </nav>
    </div>
  );
};

export default Nav;
