import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, setPage } from "../../redux/actions/actions";
import Card from "../Card/card";
import Pagination from "../Paginado/paginado";

import styles from "./cards.module.css";

function Cards() {
  const [perPage, setPerPage] = useState(8);
  
  const dispatch = useDispatch();
  

  const { allDogs, page, aux, filteredByData } = useSelector(
    (state) => state
  );
  const selectDogs = aux.length>0 ? aux : filteredByData.length>0 ? filteredByData : allDogs; // selectDogs = allDogs
  const startIndex = (page - 1) * perPage; //1-1*8=0
  const endIndex = perPage * page; //8*1 = 8
  const showDogs = selectDogs.slice(startIndex, endIndex); //Indice 0 al indice 7
  const totalPages = Math.ceil(selectDogs.length / perPage); // devuelve entero mas proximo hacia delante
                                                            //10 perros / 8 = 1.25 => 2 paginas
  const handleNext = () => {
    if (page !== totalPages) { //si pagina 1 es diferente a totalpage = 10
      dispatch(setPage(page + 1)); //se despacha y se suma page
    }
  };

  const handlePrev = () => {
    if (page > 1) {       //puedes retroceder siempre y cuando sea mayor a 1
      dispatch(setPage(page - 1)); //se despacha y se resta pague
    }
  };
  useEffect(() => {
    dispatch(getDogs());
  }, []);
  return (
    <div className="container">
      <Pagination
        handleNext={handleNext}
        handlePrev={handlePrev}
        page={page}
        totalPages={totalPages}
      />
      <div className={styles.cardCont}>
        {showDogs?.map((dog) => (
          <Card
            key={dog.id}
            id={dog.id}
            name={dog.name}
            weightMin={dog.weightMin}
            weightMax={dog.weightMax}
            heightMin={dog.heightMin}
            heightMax={dog.heightMax}
            temperament={dog.temperament}
            image={dog.image}
          />
        ))}
      </div>
    </div>
  );
}

export default Cards;
