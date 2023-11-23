import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTemps, postDog, getDogs } from "../../redux/actions/actions";

import validations from "../../helpers/validations";

import styles from "./form.module.css";

const Form = () => {
  const temps = useSelector((state) => state.allTemps);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sortedTemps = temps
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));
  const [selectedTemps, setSelectedTemps] = useState([]);

  const [formError, setFormError] = useState({});

  const [form, setForm] = useState({
    name: "",
    weightMin: "",
    weightMax: "",
    heightMin: "",
    heightMax: "",
    spanMin: "",
    spanMax: "",
    image: "",
    temps: [],
  });

  const handleValidation = () => {
    const errors = validations(form);
    setFormError(errors);
  };

  const handleFormData = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleTempsChange = (event) => {
    const selectedTempId = event.target.value;
    const selectedTemp = temps.find((temp) => temp.id === selectedTempId);

    setSelectedTemps((prevSelectedTemps) => {
      if (prevSelectedTemps.some((temp) => temp.id === selectedTempId)) {
        return prevSelectedTemps.filter((temp) => temp.id !== selectedTempId);
      } else {
        return [...prevSelectedTemps, selectedTemp];
      }
    });
  };

  const handleRemoveTemp = (tempId) => {
    setSelectedTemps((prevSelectedTemps) => {
      return prevSelectedTemps.filter((id) => id !== tempId);
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const arrTemp = selectedTemps.map((temp) => temp.name);
    const tempsOk = arrTemp.join(", ");
    const newDog = {
      name: form.name,
      weightMin: form.weightMin,
      weightMax: form.weightMax,
      heightMin: form.heightMin,
      heightMax: form.heightMax,
      life_span: `${form.spanMin} - ${form.spanMax} years`,
      image: form.image,
      temperament: tempsOk,
    };
    const res = await postDog(newDog);
    console.log(res);
    if (res === true) {
      dispatch(getDogs());
      navigate("/home");
    }
  };

  const disableButton = () => {
    let aux = true;

    if (Object.keys(formError).length === 0) {
      aux = false;
    }

    return aux;
  };

  useEffect(() => {
    dispatch(getTemps());
  }, []);

  useEffect(() => {
    const tempsTransform = selectedTemps.map((tempId) => parseInt(tempId));
    setForm((prevForm) => ({ ...prevForm, temps: tempsTransform }));
  }, [selectedTemps]);

  useEffect(() => {
    handleValidation();
  }, [form]);

  return (
    <div className={styles["form-Container"]}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>Name:</label>
        <input 
        type="text" 
        name="name" 
        value={form.name} 
        onChange={handleFormData} 
        />

        {formError.name ? 
        (<p className={styles.error}>{formError.name}</p>) : 
        (
          <p>
            <br />
          </p>
        )}

        <label>Minimum weight (kg):</label>
        <input
          type="number"
          name="weightMin"
          value={form.weightMin}
          onChange={handleFormData}
        />

        {formError.weightMin ? (
          <p className={styles.error}>{formError.weightMin}</p>
        ) : (
          <p>
            <br />
          </p>
        )}

        <label>Maximum weight (kg):</label>
        <input
          type="number"
          name="weightMax"
          value={form.weightMax}
          onChange={handleFormData}
        />

        {formError.weightMax ? (
          <p className={styles.error}>{formError.weightMax}</p>
        ) : (
          <p>
            <br />
          </p>
        )}

        <label>Minimum height (cm):</label>
        <input
          type="number"
          name="heightMin"
          value={form.heightMin}
          onChange={handleFormData}
        />

        {formError.heightMin ? (
          <p className={styles.error}>{formError.heightMin}</p>
        ) : (
          <p>
            <br />
          </p>
        )}

        <label>Maximum height (cm):</label>
        <input
          type="number"
          name="heightMax"
          value={form.heightMax}
          onChange={handleFormData}
        />

        {formError.heightMax ? (
          <p className={styles.error}>{formError.heightMax}</p>
        ) : (
          <p>
            <br />
          </p>
        )}

        <label>Minimum span life (years):</label>
        <input
          type="number"
          name="spanMin"
          value={form.spanMin}
          onChange={handleFormData}
        />

        {formError.spanMin ? (
          <p className={styles.error}>{formError.spanMin}</p>
        ) : (
          <p>
            <br />
          </p>
        )}

        <label>Maximum span life (years):</label>
        <input
          type="number"
          name="spanMax"
          value={form.spanMax}
          onChange={handleFormData}
        />

        {formError.spanMax ? (
          <p className={styles.error}>{formError.spanMax}</p>
        ) : (
          <p>
            <br />
          </p>
        )}

        <label>Image:</label>
        <input
          type="text"
          name="image"
          value={form.image}
          onChange={handleFormData}
        />

        {formError.image ? (
          <p className={styles.error}>{formError.image}</p>
        ) : (
          <p>
            <br />
          </p>
        )}

        <div className={styles.selectTeams}>
          <label>Temperaments:</label>
          <select name="temps" id="" onChange={handleTempsChange} value="">
            <option value="" disabled>
              Select a temperament{" "}
            </option>
            {sortedTemps.map((temp) => (
              <option key={temp.id} value={temp.id}>
                {temp.name}
              </option>
            ))}
          </select>
          <div>
            {selectedTemps.map((tempId) => {
              const temp = temps.find((elem) => elem.id == tempId.id);
              return (
                <div className={styles["team-checkbox"]}>
                  <span className={styles.teams}>{temp?.name}</span>
                  <button
                    type="button"
                    className={styles.buttonX}
                    onClick={() => handleRemoveTemp(tempId)}
                  >
                    X
                  </button>
                </div>
              );
            })}
          </div>
        </div>


        {formError.temps && <p className={styles.error}>{formError.temps}</p>}
        <br />
        {Object.values(formError).length === 0 && (
          <button
            className={styles.buttonSubmit}
            disabled={disableButton()}
            type="submit"
          >
            Create Dog{" "}
          </button>
        )}
      </form>
    </div>
  );
};

export default Form;