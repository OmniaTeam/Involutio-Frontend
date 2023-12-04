import React from "react";
import ReactDOM from "react-dom/client";

import './global.scss'
import './styles/indexStyles.scss'

import { BrowserRouter, Route, Routes } from "react-router-dom";

import IndexPage from "./pages/indexPage.tsx";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

const App = () => {
    return <>
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<IndexPage/>} />
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    </>
};

root.render(<App/>);