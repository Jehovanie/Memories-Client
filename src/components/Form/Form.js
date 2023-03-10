import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatedPost } from '../../actions/posts_actions'
import FileBase from "react-file-base64";

import useStyles from './style';
import { TextField, Button, Typography, Paper } from '@material-ui/core';

///customise message alert
import swal from "sweetalert";


const Form = ({ currentId, setCurrentId }) => {


    const classes = useStyles();
    const navigate = useNavigate();

    ///new data to create
    const [postData, setPostData] = useState({ title: "", message: "", tags: "", selectedFile: "" });
    /// to dispatch action creat post
    const dispatch = useDispatch();

    const location = useLocation()

    const [focus, setFocus] = useState({ title: "", message: false, tags: false, selectedFile: false });

    // get the current post to update 
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null)

    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if (post) setPostData(post)
    }, [post, location])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {

            if (postData.title !== "" && postData.message !== "") {

                dispatch(updatedPost(currentId, { ...postData, name: user?.result?.name }))
                swal("Good Job", "Post Apdated !!!", "success")
            } else {
                swal("Oops", "Please complete the form", "error")
            }

        } else {

            if (postData.title !== "" && postData.message !== "") {

                ///
                dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
                swal("Good Job", "Post Added!", "success")
            } else {
                swal("Oops", "Please complete the form", "error")
            }
        }
        clear();
    }


    const clear = () => {
        setCurrentId(null);
        setPostData({ title: '', message: '', tags: '', selectedFile: '' });
        setFocus({ title: false, message: false });

    }


    /// chech and cancel if not user is connected.
    if (!user?.result?.name) {

        return (
            <Paper className={classes.paper} >
                <Typography align="center">
                    Please Sign In to create your own memories and like other's memories.
                </Typography>
            </Paper>
        )
    }


    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? "Editing" : "Creating"} a Memory</Typography>
                <TextField
                    name="title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    value={postData.title ?? ""}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                    onFocus={() => setFocus({ ...focus, title: true })}
                />

                {/* display an instruction for user */}
                {focus.title && postData.title === "" && <div className={classes.ErrorInput} style={{ display: "block" }}>This can't be empty !</div>}

                <TextField
                    name="message"
                    variant="outlined"
                    label="Message"
                    fullWidth
                    multiline
                    minRows={3}
                    value={postData.message ?? ""}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                    onFocus={() => setFocus({ ...focus, message: true })}
                />
                {/* display an instruction for user */}
                {focus.message && postData.message === "" && <div className={classes.ErrorInput} style={{ display: "block" }}>This can't be empty !</div>}

                <TextField
                    name="tags"
                    variant="outlined"
                    label="Tags"
                    fullWidth
                    value={postData.tags ?? ""}
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
                />

                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        value={postData.selectedFile ?? ""}
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