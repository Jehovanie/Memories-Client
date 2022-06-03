import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts_actions";
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from "../Pagination";

import useStyle from "./styles"
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from "@material-ui/core";
import { useNavigate, useLocation } from 'react-router-dom';

import ChipInput from "material-ui-chip-input";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const classes = useStyle();

    const dispatch = useDispatch();

    const [currentId, setCurrentId] = useState(null);


    const query = useQuery();
    const navigate = useNavigate();

    const page = query.get('page') || 1;

    const searchQuery = query.get('searchQuery');



    useEffect(() => {
        dispatch(getPosts())
    }, [currentId, dispatch]) ///the effect does not execute if none of its variables change.


    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container
                    justifyContent="space-between"
                    alignitem="stretch"
                    spacing={2}
                    className={classes.gridContainer}
                >

                    <Grid item xs={12} sm={6} md={8} lg={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3} lg={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">


                            <TextField name="search"
                                variant="outlined"
                                label="Search Memories"
                                value="TEST"
                                onChange={() => { }}
                            />

                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />

                        <Paper className={classes.pagination} elevation={6}>
                            <Pagination />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};

export default Home;