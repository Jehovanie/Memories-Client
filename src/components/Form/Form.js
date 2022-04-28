import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { createPost } from '../../actions/posts_actions'
import FileBase from "react-file-base64";

import useStyles from './style';
import { TextField, Button, Typography, Paper } from '@material-ui/core';


const Form = () => {

    const classes = useStyles();

    const [postsData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createPost(postsData));
    }

    const clear = () => { }
    return (
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6"> Creating a Memory</Typography>
                <TextField
                    name="creator"
                    variant="outlined"
                    label="Creator"
                    fullWidth
                    value={postsData.creator}
                    onChange={(e) => setPostData({ ...postsData, creator: e.target.value })}
                />
                <TextField
                    name="title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    value={postsData.title}
                    onChange={(e) => setPostData({ ...postsData, title: e.target.value })}
                />
                <TextField
                    name="message"
                    variant="outlined"
                    label="Message"
                    fullWidth
                    value={postsData.message}
                    onChange={(e) => setPostData({ ...postsData, message: e.target.value })}
                />
                <TextField
                    name="tags"
                    variant="outlined"
                    label="Tags"
                    fullWidth
                    value={postsData.tags}
                    onChange={(e) => setPostData({ ...postsData, tags: e.target.value })}
                />

                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={(base64) => setPostData({ ...postsData, selectedFile: base64 })}
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