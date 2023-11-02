import React from "react";
import "./App.css";
import {Navbar} from "./layouts/NavbarAndFooter/Navbar";
import {ExploreTopBooks} from "./layouts/HomePage/components/ExploreTopBooks";
import {Carousel} from "./layouts/HomePage/components/Carousel";
import {Heros} from "./layouts/HomePage/components/Heros";
import {LibraryServices} from "./layouts/HomePage/components/LibraryServices";
import {Footer} from "./layouts/NavbarAndFooter/Footer";
import {HomePage} from "./layouts/HomePage/HomePage";
import {SearchBooksPage} from "./layouts/SearchBookPage/SearchBookPages";
import {Route, Routes, Navigate} from "react-router-dom";
import {LoginPage} from "./layouts/AuthPage/LoginPage";
import {RegisterPage} from "./layouts/AuthPage/RegisterPage";

function App() {
    return (
        <div className='d-flex flex-column min-vh-100'>
            <Navbar/>
            <div className='flex-grow-1'>
            <Routes>
                <Route path='*' element={<Navigate to='/' />} />
                <Route path='/' element=<HomePage/>/>
                <Route path='/search' element=<SearchBooksPage/>/>
                <Route path='/login' element=<LoginPage/>/>
                <Route path='/register' element=<RegisterPage/>/>
            </Routes>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
