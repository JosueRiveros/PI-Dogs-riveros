import styles from "./paginado.module.css";

function Pagination({ handleNext, handlePrev, totalPages, page }) {
  return (
    <div className={styles.containerPaginado}>
      {page > 1 && ( //la pagina para regresar solo se renderiza si es mayor a 1
        <button className={styles.button} onClick={handlePrev}> 
          Previous
        </button>
      )} 
      <span className={styles.pageNumber}>Page {page} of {totalPages}</span>
      {page !== totalPages && (
        <button className={styles.button} onClick={handleNext}>
          Next
        </button>
      )}
    </div>
  );
}

export default Pagination;
