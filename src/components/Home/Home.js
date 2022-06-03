import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { getPostBySearch, getPosts } from "../../actions/posts_actions";
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from "../Pagination";

import useStyle from "./styles"
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from "@material-ui/core";
import { useNavigate, useLocation } from 'react-router-dom';

import ChipInput from "material-ui-chip-input";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {

    /// to get class style
    const classes = useStyle();

    ///to dispatch an action
    const dispatch = useDispatch();

    ///we need it to set the updatePost
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        dispatch(getPosts())

    }, [currentId, dispatch]) ///the effect does not execute if none of its variables change.

    ///to redirect anywhere
    const navigate = useNavigate();

    ///for form to search and tags.
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    ///action for int the 
    const handleAdd = (tagToAdd) => setTags([...tags, tagToAdd])
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete))

    ///dispatch the search by element.
    const searchPost = () => {

        if (search.trim() || tags) {
            dispatch(getPostBySearch({ search, tags: tags.join(',') }))
        } else {
            navigate("/")
        }
    }

    const handlePressKey = (e) => {
        if (e.keyCode === 13) { ///e.keyCode : is the code of text input by the user.
            searchPost();
        }
    }

    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container
                    justifyContent="space-between"
                    alignitem="stretch"
                    spacing={2}
                    className={classes.gridContainer}
                >

                    <Grid item xs={12} sm={6} md={8} lg={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3} lg={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">

                            <TextField
                                name="search"
                                variant="outlined"
                                label="Search Memories"
                                onKeyUp={handlePressKey /** onKeyUp : when user releases a key */}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            <ChipInput
                                style={{ margin: "10px 0" }}
                                variant="outlined"
                                label="Search Tags"
                                name="tags"
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                            />

                            <Button
                                className={classes.searchButton}
                                color="primary"
                                variant="contained"
                                onClick={searchPost}
                            >
                                Search

                            </Button>

                        </AppBar>

                        <Form currentId={currentId} setCurrentId={setCurrentId} />

                        <Paper className={classes.pagination} elevation={6}>
                            <Pagination />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};

export default Home;