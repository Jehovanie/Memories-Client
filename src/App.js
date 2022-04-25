import React from 'react';
import { Container, AppBar, Grow, Grid, Typography } from "@material-ui/core";

import memories from "./images/memorise.jpg";

import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";

import useStyles from './styles';

const App = () => {

    const classes = useStyles();

    return (
        <Container maxWidth="lg">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">
                    Memories
                </Typography>
                <img className={classes.image} src={memories} alt="Memories" width="60" align="center" />
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justify="space-between" alignItem="stretch" spacing={4}>
                        <Grid item xs={12} sm={7}>
                            <Posts />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    );
};

export default App;