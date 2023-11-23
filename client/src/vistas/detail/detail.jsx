import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getId, resetDetail } from "../../redux/actions/actions";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

const Detail = () => {
  const dog = useSelector((state) => state.detail);

  const { id } = useParams();
  const dispatch = useDispatch();

  



  useEffect(() => {
    dispatch(getId(id));
    return () => {
      dispatch(resetDetail());
    };
  }, []);



  return (
    <div className={styles.containerDetail}>
      <div className={`${styles.contentDetail} container`}>
        <div className={styles.imageContainer}>
          <img src={dog.image} alt="" className={styles.image} />
        </div>
        <div className={styles.infoContainer}>
          <h3>Name: {dog.name ? dog.name : "loading..."}</h3>
          
          <div className={styles.texts}>
            <h3>Id: {dog.id ? dog.id : "loading..."}</h3>
            <h3>Height: {dog.heightMin ? dog.heightMin : "loading"} - {dog.heightMax ? dog.heightMax : "loading..."}</h3>
            <h3>Weight: {dog.weightMin ? dog.weightMin : "loading"} - {dog.weightMax ? dog.weightMax : "loading..."}</h3>
            <h3>
              Temperament: {dog.temperament ? dog.temperament : dog.tempNames ? dog.tempNames : "loading..."}
            </h3>
          </div>
        </div>
        <h3>
          Life Span: {dog.life_span ? dog.life_span : "loading..."}
        </h3>
      </div>
    </div>
  );
};

export default Detail;