import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts_actions";
import Posts from '../Posts/Posts';
import Form from '../Form/Form';

import useStyle from "./styles"
import { Container, Grow, Grid } from "@material-ui/core";


const Home = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        dispatch(getPosts())
    }, [currentId, dispatch]) ///the effect does not execute if none of its variables change.


    return (
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
    );
};

export default Home;