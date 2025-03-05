import { BrowserRouter, Route, Routes } from "react-router-dom"
import React from "react";
import { LoginPage } from "./Pages/login/Login"
import Syllabus from "./Pages/Syllabus/Syllabus";
import SyllabusFile from "./Pages/Syllabus/SyllabusFile";
import Core from "./Template/Core";

export const APP_ROUTE = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<LoginPage />} />
                <Route path="/" element={<Core />}>
                    <Route path='syllabus/'>
                        <Route exact path='grid' element={<Syllabus />}></Route>
                        <Route exact path=':postId' element={<SyllabusFile />}></Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}