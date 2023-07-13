import React, { useEffect, useState } from "react";

const useValidation = (initialState, validate, callback) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitForm, setSubmitForm] = useState(false);
  // const [percent, setPercent] = useState(0);
  // const [fileImage, setFileImage] = useState(null);

  useEffect(() => {
    if (submitForm) {
      const noErrors = Object.keys(errors).length === 0;
      console.error(errors);
      if (noErrors) {
        callback();
      }
      setSubmitForm(false);
    }
  }, [errors]);

  //funcion que detecta cambios en el input type file de imagenes
  // const handleOnchangeFile = e =>{
  //   const file = (e.target.files[0]);
  //   setFileImage(file);

  // };

  //funcion que se ejecuta cuando el usuario escribe algo
  const handleOnchange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const file = e.target.files[0];
      setValues({
        ...values,
        [name]: file,
      });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }

  };

  //funcion para submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const errorValidation = validate(values);
    setErrors(errorValidation);
    setSubmitForm(true);
  };

  const handleBlur = () => {
    const errorValidation = validate(values);
    setErrors(errorValidation);
  };

  return {
    values,
    errors,
    submitForm,
    // fileImage,
    handleSubmit,
    handleOnchange,
    handleBlur,
    // handleOnchangeFile,
  };
};

export default useValidation;
