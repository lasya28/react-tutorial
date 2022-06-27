import React, { useEffect,useState} from 'react';
import {Button} from "@material-ui/core";
import {Form, Formik} from "formik";
import {FormikTextField} from "../formik";
import styles from "./styles/signupStyles";
import PropTypes from "prop-types";
import { formSchema ,initialValues,isPasswordAndConfirmPasswordMatching,isValidMobileNumber,isValidPassword} from './services/signupFormService';
import useSignUp from './hooks/useSignUp';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';



const Signup=(location, history,isAuthenticated, onSignUp)=>{
    const classes = styles();
    const [mobileNumber, setmobileNumber] = useState("");
    const [password,setPassword]=useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    const [confirmPassword,setConfirmPassword]=useState("");
    const {from} = location.state || {from: {pathname: "/login"}};
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
                                        value={mobileNumber}
                                        margin="dense"
                                        name="mobileNumber"
                                        label="Mobile Number"
                                        onChange={(e) => {
                                            setmobileNumber(e.target.value); 
                                        }           
                                   }
                                    />
                                    {mobileNumber}
                                    {props.status}
                                    {isValidMobileNumber(mobileNumber,isValid) && <div className={classes.errorMessage}>{isValidMobileNumber(mobileNumber,isValid)}</div>}
                                    {/* <div className='classes.passwordDiv'> */}
                                    <FormikTextField
                                       required
                                       value={password}
                                       margin="dense"
                                       name="password"
                                       type={passwordShown ? "text" : "password"}
                                       label="Password"
                                       onChange={(e)=>{
                                           setPassword(e.target.value);
                                       }}  
                                       
                                   />   
                                    {/* <div className={classes.eyeSymbol} onClick={togglePassword}><VisibilityOffIcon/></div>  */}
                                   {/* </div> */}
        
                                    {isValidPassword(password) && <p className={classes.errorMessage}>{isValidPassword(password)}</p>}
                                     <FormikTextField
                                        required
                                        value={confirmPassword}
                                        type="password"
                                        margin="dense"
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        onChange={(e)=>{
                                            setConfirmPassword(e.target.value);
                                        }}
                                    /> 
                                    {isPasswordAndConfirmPasswordMatching(password,confirmPassword) && <p className={classes.errorMessage}>{isPasswordAndConfirmPasswordMatching(password,confirmPassword)}</p>}
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