import React from "react";
import useStyles from './style';

const Post = () => {

    const classes = useStyles();
    return (
        <div className={classes.card}>
            POST
        </div>
    )
}

export default Post;