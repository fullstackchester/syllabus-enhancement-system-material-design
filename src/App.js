import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./Pages/Landing";
import React from 'react'
import './index.css'
import Signup from "./Pages/Signup";
import Account from "./Pages/Account/Account";
import Layout from "./Template/Layout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Syllabus from "./Pages/Syllabus/Syllabus";
import Faculty from "./Pages/Faculty/Faculty";
import Subject from "./Pages/Subject/Subject";
import SubjectAdd from "./Pages/Subject/SubjectAdd";
import FacultyProfile from "./Pages/Faculty/FacultyProfile";

function App() {

	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route index element={<Landing />} />
					<Route exact path='/' element={<Landing />} />
					<Route exact path='/signup' element={<Signup />} />
					<Route exact path='/' element={<Layout />} >
						<Route index element={<Account />} />
						<Route exact path='account' element={<Account />} />
						<Route exact path='dashboard' element={<Dashboard />} />
						<Route exact path='syllabus' element={<Syllabus />} />
						<Route exact path='subjects' element={<Subject />} />
						<Route exact path='subjects/new-subject/:subjectId' element={<SubjectAdd />} />

						<Route exact path='faculty' element={<Faculty />} />
						<Route exact path='faculty/:uid' element={<FacultyProfile />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App;
