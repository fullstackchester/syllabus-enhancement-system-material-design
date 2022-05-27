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
import FirebaseProvider from "./Context/FirebaseContext";
import SyllabusFile from "./Pages/Syllabus/SyllabusFile";
import SubjectFile from "./Pages/Subject/SubjectFile";
import SyllabusAdd from "./Pages/Syllabus/SyllabusAdd";
import SubjectEdit from "./Pages/Subject/SubjectEdit";
import SyllabusEdit from "./Pages/Syllabus/SyllabusEdit";

function App() {

	return (
		<FirebaseProvider>
			<div className="App">
				<BrowserRouter>
					<Routes>
						<Route index element={<Landing />} />
						<Route exact path='/' element={<Landing />} />
						<Route exact path='/signup' element={<Signup />} />
						<Route exact path='/' element={<Layout />} >
							<Route index element={<Dashboard />} />

							<Route exact path='syllabus' element={<Syllabus />} />
							<Route exact path='syllabus/:postId' element={<SyllabusFile />} />
							<Route exact path='syllabus/new-syllabus/:postId' element={<SyllabusAdd />} />
							<Route exact path='syllabus/edit-syllabus/:postId' element={<SyllabusEdit />} />


							<Route exact path='dashboard' element={<Dashboard />} />
							<Route exact path='subjects' element={<Subject />} />
							<Route exact path='subjects/:subjectId' element={<SubjectFile />} />
							<Route exact path='subjects/new-subject/:subjectId' element={<SubjectAdd />} />
							<Route exact path='subjects/edit-subject/:subjectId' element={<SubjectEdit />} />

							<Route exact path='faculty' element={<Faculty />} />
							<Route exact path='faculty/:uid' element={<FacultyProfile />} />

							<Route exact path='account/:uid' element={<Account />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</div>
		</FirebaseProvider>
	)
}

export default App;
