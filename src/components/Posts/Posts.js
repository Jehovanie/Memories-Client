import React from 'react';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './style';

import { Grid, CircularProgress, Card, Typography, CardContent, Button } from "@material-ui/core";
import { Link } from 'react-router-dom';

const Posts = ({ setCurrentId }) => {

    ///this is the only way to get the posts
    const posts = useSelector((state) => state.posts) /// use for handling to [ store.getState()];

    const classes = useStyles();

    if (Array.isArray(posts)) {

        var posts_jsx = posts.map((post) => (
            <Grid item key={post._id} xs={12} sm={12} md={6} lg={4}>
                <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
        ));
    } else {

        return (
            <Card className={classes.cardError} >
                <CardContent>
                    <Typography variant="body2" component="p" color="textSecondary">
                        Nothing post like your recherche ...
                    </Typography>
                </CardContent>
                <Typography className={classes.title} variant="h6" gutterBottom>
                    Create new post like.
                </Typography>
                <Button size="small" color="primary">
                    <Link to="/"> Go to the Home page ... </Link>
                </Button>
            </Card >
        )
    }

    return (
        !posts.length ?
            <CircularProgress /> :
            (
                <Grid className={classes.container} container alignItems="stretch" spacing={1}>
                    {posts_jsx}
                </Grid>
            )
    )

}

export default Posts;