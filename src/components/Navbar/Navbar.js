import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from "react-router-dom"
import memories from "../../_assets/images/memorise.jpg";
import { Avatar, AppBar, Button, Typography, Toolbar } from "@material-ui/core";
import useStyles from './styles';


const Navbar = () => {
    const classes = useStyles();

    ///to act on the state.
    const dispatch = useDispatch();

    ///to can define redirection.
    const navigate = useNavigate();

    ///
    const location = useLocation();


    ///get data from the localStorage on the Browser.
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const logout = () => {
        dispatch({ type: "LOGOUT" })
        navigate("/")
        setUser(null)
    }


    ///check the data and when it change this, page reffhress. 
    useEffect(() => {
        const token = user?.token;

        //JWT

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]) ///when the location is change, this page recharge.

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h3" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="Memories" width="60" align="center" />
            </div>
            <Toolbar className={classes.toolbar} >
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6"> {user.result.name} </Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary"> Sign In</Button>
                )
                }
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;