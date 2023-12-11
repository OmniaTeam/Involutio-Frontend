import React, {useEffect} from "react";
import ReactDOM from "react-dom/client";

import './global.scss'
import './styles/indexStyles.scss'
import './styles/headerStyles.scss'
import './styles/sidebarStyles.scss'
import './styles/cardsStyles.scss'
import './styles/modalStyles.scss'
import './styles/chartsStyles.scss'

import { useGetUserQuery } from "./services/authService.ts";
import { setName, setRole } from "./store/reducers/IUserSlice.ts";
import { useAppDispatch } from "./hooks/redux.ts";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { setupStore } from "./store/store.ts";

import IndexPage from "./pages/indexPage.tsx";
import AuthPage from "./pages/application/authPage.tsx";
import AppLayout from "./layouts/appLayout.tsx";
import HomePage from "./pages/application/homePage.tsx";
import EmployeesPage from "./pages/application/employeesPage.tsx";
import ReportsPage from "./pages/application/reportsPage.tsx";
import EmployeePage from "./pages/application/employeePage.tsx";
import ErrorPage from "./pages/errorPage.tsx";
import DepartmentsPage from "./pages/application/departmentsPage.tsx";
import DepartmentPage from "./pages/application/departmentPage.tsx";

const store = setupStore()

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

const App = () => {
    const dispatch = useAppDispatch()
    const getUser = useGetUserQuery('')

    useEffect(() => {
        console.log(getUser)
        if (getUser.isSuccess) {
            dispatch(setName(getUser.data.login))
            dispatch(setRole(getUser.data.role))
        }
    }, [getUser])

    return <>
        <React.StrictMode>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" index={true} element={<IndexPage/>}/>
                        <Route path="/auth" element={<AuthPage/>}/>
                        <Route path="/application" element={<AppLayout/>}>
                            <Route path={''} element={<HomePage/>}/>
                            <Route path={'employees'} element={<EmployeesPage/>}/>
                            <Route path={'reports'} element={<ReportsPage/>}/>
                            <Route path={'employee/:id'} element={<EmployeePage/>}/>
                            <Route path={'departments'} element={<DepartmentsPage/>}/>
                            <Route path={'department/:id'} element={<DepartmentPage/>}/>
                        </Route>
                        <Route path="/*" element={<ErrorPage/>}/>
                        <Route path="/*/*" element={<ErrorPage/>}/>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </React.StrictMode>
    </>
};

root.render(<App/>);