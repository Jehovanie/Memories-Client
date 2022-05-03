import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatedPost } from '../../actions/posts_actions'
import FileBase from "react-file-base64";

import useStyles from './style';
import { TextField, Button, Typography, Paper } from '@material-ui/core';

import swal from "sweetalert";


const Form = ({ currentId, setCurrentId }) => {

    const classes = useStyles();
    const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
    const dispatch = useDispatch();


    const [focus, setFocus] = useState({ creator: false, title: '', message: false, tags: false, selectedFile: false });


    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null) // get the current post to update 

    useEffect(() => {
        if (post) setPostData(post)
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {

            if (postData.creator !== "" && postData.title !== "" && postData.message !== "") {

                dispatch(updatedPost(currentId, postData))
                swal("Good Job", "Post Apdated !!!", "success")
            } else {
                swal("Oops", "Please complete the form", "error")
            }

        } else {

            if (postData.creator !== "" && postData.title !== "" && postData.message !== "") {

                dispatch(createPost(postData));
                swal("Good Job", "Post Added!", "success")
            } else {
                swal("Oops", "Please complete the form", "error")
            }
        }
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
        setFocus({ creator: false, title: false, message: false });

    }


    return (
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? "Editing" : "Creating"} a Memory</Typography>
                <TextField
                    name="creator"
                    variant="outlined"
                    label="Creator"
                    fullWidth
                    value={postData.creator}
                    onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
                    onFocus={() => setFocus({ ...focus, creator: true })}
                />

                {/* <div className={classes.ErrorInput}  >ERROR : this is must be requered !</div> */}
                {focus.creator && postData.creator === "" && <div className={classes.ErrorInput} style={{ display: "block" }}>This can't be empty !</div>}

                <TextField
                    name="title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                    onFocus={() => setFocus({ ...focus, title: true })}
                />
                {focus.title && postData.title === "" && <div className={classes.ErrorInput} style={{ display: "block" }}>This can't be empty !</div>}

                <TextField
                    name="message"
                    variant="outlined"
                    label="Message"
                    fullWidth
                    value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                    onFocus={() => setFocus({ ...focus, message: true })}
                />
                {focus.message && postData.message === "" && <div className={classes.ErrorInput} style={{ display: "block" }}>This can't be empty !</div>}

                <TextField
                    name="tags"
                    variant="outlined"
                    label="Tags"
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
                />

                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                    />

                </div>

                <Button className={`${classes.bottomSubmit} ${classes.btn}`} variant="contained" color="primary" size="large" type="submit" fullWidth>
                    Submit
                </Button>
                <Button className={classes.btn} variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
                    Clear
                </Button>
            </form>
        </Paper>
    );
};

export default Form;