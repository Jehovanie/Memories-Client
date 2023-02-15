import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useStyles from './style';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from "@material-ui/core";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizonIcon from '@material-ui/icons/MoreHoriz';
import moment from "moment";
import { useDispatch } from "react-redux";
import { delete_post, add_like_post } from "../../../actions/posts_actions";
import { ThumbUpAltOutlined } from "@material-ui/icons";


const Post = ({ post, setCurrentId }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('profile'));

    const navigate = useNavigate();

    useEffect(() => {
        /// i use this to change the status of the post when user is logout.
    }, [location])

    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
                ?
                (<> <ThumbUpAltIcon fontSize="small" />  &nbsp; {post.likes.length > 2 ? `You and ${post.likes.length - 1} other persons.` : `${post.likes.length} Like${post.likes.length > 1 ? "s" : ""}`}  </>)
                :
                (<> <ThumbUpAltOutlined fontSize="small" /> &nbsp; {post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}  </>);
        }
        return <> <ThumbUpAltOutlined fontSize="small" /> &nbsp; Like </>
    }

    const openPost = () => navigate(`/posts/${post._id}`)


    return (
        <Card className={classes.card} raised elevation={6} >

            <ButtonBase className={classes.cardActionBase} onClick={openPost}>

                <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />

                <div className={classes.overlay}>
                    <Typography variant="h6">{post.name}</Typography>
                    <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                </div>

                {/** dont allow the other to edit post only the creator can change. */}
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (

                    <div className={classes.overlay2}>
                        <Button style={{ color: "white" }} size="small" onClick={() => setCurrentId(post._id)}>
                            <MoreHorizonIcon fontSize="medium" />
                        </Button>
                    </div>
                )}
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary">
                        {post.tags.map((tag) => `#${tag} `)}
                    </Typography>
                </div>
                <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
                <CardContent>
                    <Typography variant="body2" component="p" color="textSecondary">
                        {(post.message.length > 150) ? post.message.substr(0, 150) + "...lire la suite" : post.message}
                    </Typography>
                </CardContent>

            </ButtonBase>

            <CardActions className={classes.cardAction}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(add_like_post(post._id))}>
                    <Likes />
                </Button>

                {/** dont allow the other to edit post only the creator can delete. */}
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (

                    <Button size="small" color="primary" onClick={() => dispatch(delete_post(post._id))}>
                        <DeleteIcon fontSize="small" /> &nbsp;
                        Delete
                    </Button>
                )}
            </CardActions>
        </Card >
    )
}

export default Post;