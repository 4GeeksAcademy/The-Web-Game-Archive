import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import LeaderBoards from "./pages/LeaderBoards.jsx";
import Users from "./pages/Users.jsx";
import HigherLower from "./pages/HigherLower.jsx";
import FairPrice from "./FairPrice.jsx";
import Potterdle from "./Potterdle.jsx";
import MithrilClicker from "./MithrilClicker.jsx";
import Pokemon from "./Pokemon.jsx";
import Aimlabs from "./Aimlabs.jsx";
import UserRegister from "./pages/UserRegister.jsx";

import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<LeaderBoards />} path="/leaderboards" />
                        <Route element={<Users />} path="/users" />
                        <Route element={<HigherLower />} path="/higherlower" />
                        <Route element={<FairPrice />} path="/fairprice" />
                        <Route element={<Potterdle />} path="/potterdle" />
                        <Route element={<MithrilClicker />} path="/mithrilclicker" />
                        <Route element={<Pokemon />} path="/pokemon" />
                        <Route element={<Aimlabs />} path="/aimlabs" />
                        <Route element={<UserRegister />} path="/user-register" />

                        {/* Estos venían con el template y de momento no nos hacen falta pero los dejo por si acaso */}
                        {/* <Route element={<Single />} path="/single/:theid" /> */}
                        {/* <Route element={<Demo />} path="/demo" /> */}
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
