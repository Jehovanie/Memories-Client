import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Container } from "@material-ui/core";
import Navbar from './components/Navbar/Navbar';
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth"
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {

    // check user connected
    const user = JSON.parse(localStorage.getItem("profile"));
    return (
        <BrowserRouter>
            <Container maxWidth="lg">
                <Navbar />

                {/* route definition */}
                <Routes>
                    <Route path="/" element={<Navigate to='/posts' replace />} />
                    <Route path="/posts" element={<Home />} />
                    <Route path="/posts/search" element={<Home />} />
                    <Route path="/posts/:id" element={<PostDetails />} />
                    <Route path="/auth" element={(!user && <Auth />) || (<Navigate to="/" replace />)} />
                </Routes>
                {/* end of route definition  */}
            </Container>
        </BrowserRouter>
    );
};

export default App;