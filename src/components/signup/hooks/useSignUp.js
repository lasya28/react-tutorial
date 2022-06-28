import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import styles from "../styles/signupStyles"

export default (onSignUp) => {
    const classes = styles();
    const [showError, setShowError] = useState(false);

    const errorMessage = () => {
        if (showError) {
            return (
                <Typography variant="body1" color="error" className={classes.signUpErrorMessage}>
                    Signup failed
                </Typography>
            )
        }
    };

    const handleSignUp = async (values) => {
        const {name,username,email,mobileNumber, password,confirmPassword} = values;
        try {
            await onSignUp(name,username,email,mobileNumber, password,confirmPassword);
            
            setShowError(false);
        } catch (err) {
            console.log(err);
            if (err.response && err.response.status === 401) {
                setShowError(true);
            } else {
                throw err;
            }
        }
    };

    return {
        errorMessage: errorMessage,
        handleSignUp: handleSignUp
    };
};
