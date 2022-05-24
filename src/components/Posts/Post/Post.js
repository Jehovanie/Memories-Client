import React from "react";

import useStyles from './style';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@material-ui/core";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizonIcon from '@material-ui/icons/MoreHoriz';
import moment from "moment";
import { useDispatch } from "react-redux";
import { delete_post, add_like_post } from "../../../actions/posts_actions";



const Post = ({ post, setCurrentId }) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <Card className={classes.card} >
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.creator}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{ color: "white" }} size="small" onClick={() => setCurrentId(post._id)}>
                    <MoreHorizonIcon fontSize="medium" />
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">
                    {post.tags.map((tag) => `#${tag} `)}
                </Typography>
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography variant="body2" component="p" color="textSecondary">
                    {post.message}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardAction}>
                <Button size="small" color="primary" onClick={() => dispatch(add_like_post(post._id))}>
                    <ThumbUpAltIcon fontSize="small" />
                    &nbsp; Like  &nbsp; {post.likes.length}
                </Button>
                <Button size="small" color="primary" onClick={() => dispatch(delete_post(post._id))}>
                    <DeleteIcon fontSize="small" /> &nbsp;
                    Delete
                </Button>
            </CardActions>
        </Card >

    )
}

export default Post;