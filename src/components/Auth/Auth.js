import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core"
import useStyles from "./styles"
import LockOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import Input from './Input';


const Auth = () => {
    const classes = useStyles();
    const [isSignup, setSignUp] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = () => { }
    const handleChange = () => { }
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)
    const switchMode = () => setSignUp((prevIsSignUp) => !prevIsSignUp)

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

                    <Grid container justify="flex-end">
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