export default function loginValidation (values){
    let errors = {};

    //validar email
    if(!values.email){
        errors.email = "the email field is obligatory"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
        errors.email = "Email invalid"
    };

    //validar password
    if(!values.password){
        errors.password = "The password field is obligatory"
    } else if(values.password.length < 6){
        errors.password = "The password must be almost of 6 characters"
    }

    return errors;

}