import React from "react";

import useStyles from './style';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@material-ui/core";


const Post = ({ post }) => {

    const classes = useStyles();
    return (
        <Card className={classes.card} >
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.creator}</Typography>
                <Typography variant="body2">{post.createdAt}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{ color: "white" }} size="small" onClick={() => { }}>
                    See More ...
                </Button>
            </div>
            <div className={classes.delails}>
                <Typography variant="body2" color="textsecondary">
                    {post.tags.map((tag) => `#${tag} `)}
                </Typography>
            </div>
            <CardContent>
                <Typography className={classes.title} variant="h5" gutterBottom>
                    {post.message}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardAction}>
                <Button size="small" color="primary" onClick={() => { }}>
                    Like : {post.likeCount}
                </Button>
                <Button size="small" color="primary" onClick={() => { }}>
                    Delete
                </Button>
            </CardActions>
        </Card>
    )
}

export default Post;