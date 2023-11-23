import { Link } from "react-router-dom";

import styles from "./card.module.css";

const Card = (props) => {
  return (
    <Link to={`/detail/${props.id}`} className={styles.link}>
      <div className={styles.card}>
        <div className={styles.det}>
          <h3>
            <p>
              <span>{props.name}</span>
            </p>
          </h3>
          <div className={styles.des}>
          <p>
            Weight: <span>{props.weightMin} - {props.weightMax}</span>
            <br/>
            Height: <span>{props.heightMin} - {props.heightMax}</span>
          </p>
          <p>
            Temperament: <span>{props.temperament}</span>
          </p>
          </div>
        </div>
        <div className={styles.imageCont}>
          <img
            src={props.image}
            alt={`dog ${props.name}`}
          />
        </div>
      </div>
    </Link>
  );
};

export default Card;
