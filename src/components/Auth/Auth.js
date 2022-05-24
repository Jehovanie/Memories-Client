import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core"
import { GoogleLogin, GoogleLogout } from "react-google-login"
import useStyles from "./styles"
import LockOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import Input from './Input';
import Icon from './icon';



const Auth = () => {
    //for setting up the style.
    const classes = useStyles();

    //for setting up the state in redux
    const dispatch = useDispatch();

    ///for redirect
    const navigate = useNavigate();

    const [isSignup, setSignUp] = useState(false)
    const [showPassword, setShowPassword] = useState(false)


    /// when the form is submit
    const handleSubmit = () => { }

    const handleChange = () => { }

    /// manage state display of the  password : show or hide.
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    /// manage state of one user : create new of alraidy exist.
    const switchMode = () => setSignUp((prevIsSignUp) => !prevIsSignUp)

    //id from google API
    const google_client_id = "970466840444-mmsq4poghjuhs7lphv05t2588jjeb8og.apps.googleusercontent.com";

    // const responseGoogle = (res) => {
    //     console.log(res)
    // }

    ///when the login from the gmail is successed
    const googleSuccess = (res) => {
        console.log("google authentification success ...")
        console.log(res)
        const result = res?.profileObj;
        const token = res?.tokenId;

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


    /**
     * "You have created a new client application that uses libraries for user authentication or authorization that will soon be deprecated.
     *  New clients must use the new libraries instead;
     *  existing clients must also migrate before these libraries are deprecated. 
     *  See the [Migration Guide](https://developers.google.com/identity/gsi/web/guides/gis-migration) for more information."
     */

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