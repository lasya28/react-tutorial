import React, { useEffect, useState} from 'react';
import {Button} from "@material-ui/core";
import { Form, Formik} from "formik";
import {FormikTextField} from "../formik";
import styles from "./styles/signupStyles";
import PropTypes from "prop-types";
import { formSchema ,initialValues, validateConfirmPassword} from './services/signupFormService';
import useSignUp from './hooks/useSignUp';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';



const Signup=(props)=>{
    const {location, history,isAuthenticated, onSignUp}=props;
    const classes = styles();
    const {from} = location.state || {from: {pathname: "/login"}};
    const[passwordShown,setPasswordShown]=useState(false);
    const {errorMessage, handleSignUp} = useSignUp(onSignUp);
  
    
    useEffect(() => {
        if (isAuthenticated) {
            history.replace(from);
        }
    });
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
      };
        return (
            <div className={classes.signUpContainer}>
                <Formik initialValues={initialValues}
                        onSubmit={handleSignUp}
                        validationSchema={formSchema}>
                    {
                        (props) => {
                            const {
                                isValid,
                            } = props;
                            return (
                               
                                <Form className={classes.signUpForm}>
                                    <FormikTextField
                                        required
                                        margin="dense"
                                        name="name"
                                        label="Name"
                                    />
                                     <FormikTextField
                                        required
                                        margin="dense"
                                        name="username"
                                        label="Username"
                                    />
                                     <FormikTextField
                                        required
                                        margin="dense"
                                        name="email"
                                        label="Email"
                                    />
                                    <FormikTextField
                                        required   
                                        margin="dense"
                                        name="mobileNumber"
                                        label="Mobile Number"
                                   />
                                    <FormikTextField
                                       required
                                       type={passwordShown ? "text" : "password"}
                                       margin="dense"
                                       name="password"
                                       label="Password"
                                   />   
                                   <i className={classes.eyeIcon} onClick={togglePassword}><VisibilityOffIcon/></i>
    
                                    <FormikTextField
                                        required
                                        type="password"
                                        margin="dense"
                                        name="confirmPassword"
                                        label="Confirm Password"
                                    /> 
                                    <i className={classes.eyeIcon} onClick={togglePassword}><VisibilityOffIcon/></i>
                                    {validateConfirmPassword(props.values) && <p className={classes.errorMessage}>{validateConfirmPassword(props.values)}</p>}
                                    {
                                    errorMessage()
                                    }
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        disabled={!isValid}
                                        color="primary"
                                        className={classes.signUpButton}
                                    >
                                        Signup
                                        
                                    </Button>
                                </Form>
                            );
                        }
                    }
                </Formik>
            </div>
        );
}

Signup.propTypes = {
    location: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    onSignUp: PropTypes.func.isRequired
};

export default Signup;