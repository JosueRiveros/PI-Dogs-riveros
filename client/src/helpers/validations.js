const validations = (form) => {
  const errors = {};
  if (!form.name) {
    errors.name = "A name is required";
  } else if (!/^[a-zA-Z ]+$/.test(form.name)) {
    errors.name = "Cannot contain special characters or numbers.";
  } else if (form.name.length > 20) {
    errors.name = "Cannot contain more than 20 characters";
  }

  if (!form.weightMin) {
    errors.weightMin = "A minimum weight is required";
  } else if (parseInt(form.weightMin) <= 0) {
    errors.weightMin = "The minimum weight must be higher";
  } else if (parseInt(form.weightMin) >= parseInt(form.weightMax) ) {
    errors.weightMin = "Cannot be higher or equal than the maximum weight";
  } else if (!/^\d+$/.test(form.weightMin)) {
    errors.weightMin = "Cannot be decimal";
  }

  if (!form.weightMax) {
    errors.weightMax = "A maximum weight is required";
  } else if (parseInt(form.weightMax) <= 0) {
    errors.weightMax = "The maximum weight must be higher";
  } else if (parseInt(form.weightMax) <= parseInt(form.weightMin)) {
    errors.weightMax = "Cannot be less or equal than the minimum weight";
  } else if (!/^\d+$/.test(form.weightMax)) {
    errors.weightMax = "Cannot be decimal";
  }

  if (!form.heightMin) {
    errors.heightMin = "A minimum height is required";
  } else if (parseInt(form.heightMin) <= 0) {
    errors.heightMin = "The minimum height must be higher";
  } else if (parseInt(form.heightMin) >= parseInt(form.heightMax)) {
    errors.heightMin = "Cannot be higher or equal than the maximum height.";
  } else if (!/^\d+$/.test(form.heightMin)) {
    errors.heightMin = "Cannot be decimal";
  }

  if (!form.heightMax) {
    errors.heightMax = "A maximum height is required";
  } else if (parseInt(form.heightMax) <= 0) {
    errors.heightMax = "The maximum height must be higher";
  } else if (parseInt(form.weightMax) <= parseInt(form.weightMin)) {
    errors.heightMax = "Cannot be less or equal than the minimum height";
  } else if (!/^\d+$/.test(form.heightMax)) {
    errors.heightMax = "Cannot be decimal";
  }

  if (!form.spanMin) {
    errors.spanMin = "A minimum span life is required";
  } else if (parseInt(form.spanMin) <= 0) {
    errors.spanMin = "The minimum span life must be higher";
  } else if (parseInt(form.spanMin) >= parseInt(form.spanMax)) {
    errors.spanMin = "Cannot be less or equal than the maximum span life";
  } else if (!/^\d+$/.test(form.spanMin)) {
    errors.spanMin = "Cannot be decimal";
  }

  if (!form.spanMax) {
    errors.spanMax = "A maximum span life is required";
  } else if (parseInt(form.spanMax) <= 0) {
    errors.spanMax = "The maximum span life must be higher";
  } else if (parseInt(form.spanMax) <= parseInt(form.spanMin)) {
    errors.spanMax = "Cannot be less or equal than the minimum span life";
  } else if (!/^\d+$/.test(form.spanMax)) {
    errors.spanMax = "Cannot be decimal";
  }

  if (!form.image) {
    errors.image = "Image URL required";
  } else if (!/\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i.test(form.image)) {
    errors.image = "The URL entered is not a valid image URL";
  }

  if (form.temps.length === 0) {
    errors.temps = "At least one temperament is required";
  }

  return errors;
};
export default validations;
