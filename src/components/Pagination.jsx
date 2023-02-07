import React from 'react';
import { Pagination, PaginationItem } from "@material-ui/lab"

import useStyles from "./styles";
import { Link } from "react-router-dom"
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { getPosts } from '../actions/posts_actions';

const Paginate = ({ page }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const state = useSelector((state) => state.posts) /// use for handling to [ store.getState()];
    useEffect(() => {
        if (page) dispatch(getPosts(page));
    }, [page]);

    return (
        <Pagination
            classes={{ ul: classes.ul }}
            count={state.numberOfPages}
            page={state.currentPage}
            variant="outlined"
            color="primary"
            renderItem={
                (item) => (
                    <PaginationItem
                        {...item}
                        component={Link}
                        to={`/posts?page=${item.page}`}
                    />
                )
            }

        />
    )

}

export default Paginate;