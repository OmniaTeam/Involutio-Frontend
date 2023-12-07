import React from "react";
import ReactDOM from "react-dom/client";

import './global.scss'
import './styles/indexStyles.scss'
import './styles/headerStyles.scss'
import './styles/sidebarStyles.scss'
import './styles/employeeCardStyled.scss'

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import IndexPage from "./pages/indexPage.tsx";
import AuthPage from "./pages/application/authPage.tsx";
import AppLayout from "./layouts/appLayout.tsx";
import HomePage from "./pages/application/homePage.tsx";
import EmployeesPage from "./pages/application/employeesPage.tsx";
import ReportsPage from "./pages/application/reportsPage.tsx";
import EmployeePage from "./pages/application/employeePage.tsx";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

const App = () => {
    return <>
        <React.StrictMode>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" index={true} element={<IndexPage/>}/>
                        <Route path="/auth" element={<AuthPage/>}/>
                        <Route path="/application" element={<AppLayout/>}>
                            <Route index={true} element={<HomePage/>}/>
                            <Route path={'employees'} element={<EmployeesPage/>}/>
                            <Route path={'reports'} element={<ReportsPage/>}/>
                            <Route path={'employee/:id'} element={<EmployeePage/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </React.StrictMode>
    </>
};

root.render(<App/>);