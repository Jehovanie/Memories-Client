import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";

import { getPosts } from "./actions/posts_actions";

import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";

import memories from "./images/memorise.jpg";
import { Container, AppBar, Grow, Grid, Typography } from "@material-ui/core";
import useStyles from './styles';

const App = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        dispatch(getPosts())
    }, [currentId, dispatch]) ///the effect does not execute if none of its variables change.


    return (
        <Container maxWidth="lg">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h3" align="center">
                    Memories
                </Typography>
                <img className={classes.image} src={memories} alt="Memories" width="60" align="center" />
            </AppBar>
            <Grow in>
                <Container>
                    <Grid className={classes.mainResponse} container justifyContent="space-between" alignitem="stretch" spacing={2}>
                        <Grid item xs={12} sm={7} md={8} lg={9}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid item xs={12} sm={5} md={4} lg={3}>
                            <Form currentId={currentId} setCurrentId={setCurrentId} />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    );
};

export default App;