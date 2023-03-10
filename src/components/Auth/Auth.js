import React, { useState } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core"
import { GoogleLogin } from '@react-oauth/google';

import useStyles from "./styles"
import LockOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import Input from './Input';
import Icon from './icon';
import { signing, signup } from "../../actions/auth_action"
import swal from 'sweetalert';
import { GOOGLE_ID } from '../../constants/actionType';
import jwt_decode from 'jwt-decode';

const initialState = { firstname: "", lastName: "", email: "", password: "", confirmPassword: "" };

const Auth = () => {

    const dataUser = useStore((state) => state.auth)

    //for setting up the state in redux
    const dispatch = useDispatch();

    if (dataUser.getState().auth.authData) {

        const message = dataUser.getState().auth.authData?.message

        dispatch({ type: 'AUTH', authData: null })
        swal("Oops", message, "error")
    }



    //for setting up the style.
    const classes = useStyles();



    ///for redirect
    const navigate = useNavigate(); /// alternative of the history.

    ///setting for the form singup or signin
    const [isSignup, setSignUp] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(initialState);

    /// when the form is submit
    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignup) {
            dispatch(signup(formData, navigate))
        } else {
            dispatch(signing(formData, navigate))
        }
    }

    const handleChange = (e) => {
        /**
         * DYNAMIC :
         * On the input : the e.target.name is the name of the property , and the e.target.value is the value of this.
         */
        setFormData({ ...formData, [e.target.name]: e.target.value })

    }

    /// manage state display of the  password : show or hide.
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    /// manage state of one user : create new of alraidy exist.
    const switchMode = () => setSignUp((prevIsSignUp) => !prevIsSignUp)

    //id from google API
    const google_client_id = GOOGLE_ID;

    ///when the login from the gmail is successed
    const googleSuccess = (res) => {
        console.log("google authentification success ...")

        const userObject = jwt_decode(res.credential)
        const result = { ...userObject, imageUrl: userObject.picture }
        const token = res.credential

        try {

            ///call the reducer to set the state
            dispatch({ type: "AUTH", data: { result, token } })

            //redirect to the home
            navigate("/")

        } catch (error) {
            console.log(error)
        }
    }

    ///when the login with google email is faillure.
    const googleFailure = async (error) => {
        console.log(error)
        console.log("Google Sign In was unsuccessful. Try Again later")
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>

                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography variant="h5">
                    {isSignup ? "Sign Up" : "Sign In"}
                </Typography>

                <form className={classes.form} onSubmit={handleSubmit}>

                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstname" label="First Name" handleChange={handleChange} half />
                                    <Input name="lastname" label="Last Name" handleChange={handleChange} half />
                                </>
                            )
                        }

                        <Input name="email" label="Email Adress" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />

                        {
                            isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
                        }
                    </Grid>

                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? "Sign Up" : "Sign In"}
                    </Button>

                    {/* ------------------------- SECTION LOGIN FROM GOOGLE API ---------------------------- */}


                    <GoogleLogin
                        clientId={google_client_id}
                        render={(renderProps) => (
                            <Button className={classes.googleBottom}
                                color="primary"
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}
                                variant="contained"
                            >
                                Google Sign In
                            </Button>
                        )}
                        isSignedIn={true}
                        cookiePolicy={"single_host_origin"}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                    />
                    {/* ------------------------- END OF THE SECTION  LOGIN FROM GOOGLE API ---------------------------- */}

                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode} >
                                {isSignup ? "Already have an acount? Sign In " : "Don't have an account ? Sing Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>

        </Container>
    );
};

export default Auth;