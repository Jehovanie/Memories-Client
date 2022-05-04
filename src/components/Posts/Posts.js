import React from 'react';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './style';

import { Grid, CircularProgress } from "@material-ui/core";

const Posts = ({ setCurrentId }) => {
    const posts = useSelector((state) => state.posts) /// use for handling to [ store.getState()];
    const classes = useStyles();

    return (
        !posts.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={1}>
                {posts.map((post) => (
                    <Grid item key={post._id} xs={12} sm={12} md={6} lg={4}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    )
}

export default Posts;