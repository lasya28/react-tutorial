import {makeStyles} from "@material-ui/core/styles";

export default makeStyles((theme) =>
    ({
        signUpContainer: {
            display: "flex",
            justifyContent: "center",
            padding: "20px 40px",
        },
        signUpForm: {
            display: "flex",
            flexDirection: "column",
            width: "30%"
        },
        signUpButton: {
            marginTop: "10%",
            width:"30%",
            marginLeft:"40%"
        
        },
        signUpErrorMessage: {
            marginTop: "8px",
            display:"inline"
        },
        errorMessage:{
            color:"red"
        },
        eyeSymbol:{
            float:"right",
        },
        passwordDiv:{
            display:"flex",
            
        }
    })
);
