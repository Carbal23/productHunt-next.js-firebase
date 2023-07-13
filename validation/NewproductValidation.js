export default function newProductValidation(values) {
  let errors = {};

  //validar el nombre del producto
  if (!values.name) {
    errors.name = "The product name field is obligatory";
  }

  //validar el nombre de la empresa
  if (!values.company) {
    errors.company = "The company name field is obligatory";
  }

  //validar fileimage
  if (!values.fileImage) {
    errors.fileImage = "Please upload an image first!";
  } else if (!/\.(jpg|jpeg|png|gif)$/i.test(values.fileImage.name)) {
    errors.fileImage = "image format invalid";
  }

  //validar url
  if (!values.url) {
    errors.url = "the url field is obligatory";
  } else if (!/^(ftp|http|htpps):\/\/[^ "]+$/.test(values.url)) {
    errors.url = "Url invalid";
  }

  //validar descripcion
  if (!values.description) {
    errors.description = "The description field is obligatory";
  }

  return errors;
}
