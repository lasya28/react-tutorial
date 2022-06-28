import {object, string} from "yup";

export const initialValues = {
    name:'',
    username: '',
    email:'',
    mobileNumber:'',
    password: '',
    confirmPassword:''

};


export const formSchema = object({
    name: string("Enter name")
        .required("Name is required"),
    username: string("Enter username")
        .required("Username is required"),
    email: string("Enter email")
        .required("Email is required"),
    mobileNumber: string("Enter Mobile Number")
        .required("Mobile no is required")
        .matches(/^\d{10}$/, "Enter valid phone number"),
    password: string("Enter password")
        .required("Password is required")
        .matches(/(?=.*?[A-Z])/,"Password should contain atleast one Uppercase")
        .matches(/(?=.*?[0-9])/,"Password should contain atleast one digit")
        .matches(/(?=.*?[#?!@$%^&*-])/,"Password should contain atleast one special character")
        .matches(/^.{8,64}$/,"Password should be of minimum 8 characters and maximum 64 characters"),
    confirmPassword: string("Enter confirm password")
        .required("Confirm Password is required")
});

export const validateConfirmPassword = values => {
    if (values.confirmPassword!=="" && values.password!==values.confirmPassword) {
      return 'CurrentPassword doesnt match with Password';
    }
    return null;
  };


