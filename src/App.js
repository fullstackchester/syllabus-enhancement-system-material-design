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
import AccountProfileEdit from "./Pages/Account/AccountProfileEdit";
import FacultyEdit from "./Pages/Faculty/FacultyEdit";
import MyFiles from "./Pages/My Files/MyFiles";
import MyFileView from "./Pages/My Files/MyFileView";
import MyFileAdd from "./Pages/My Files/MyFileAdd";
import MyFileEdit from "./Pages/My Files/MyFileEdit";
import Protected from "./Components/Routing/ProtectedRoute";
import AuthListener from "./Components/Routing/AuthListenerRoute";
import Restricted from "./Components/Routing/RestrictedRoute";
import Practice from "./Pages/Practice";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { changeTheme } from './JS/States'

function App() {
	const theme = useSelector((state) => state.mode)
	const customTheme = createTheme({
		palette: {
			mode: theme,
		},
	});
	return (
		<FirebaseProvider>
			<ThemeProvider theme={customTheme}>
				<CssBaseline />
				<div className="App">
					<BrowserRouter>
						<Routes>
							<Route index element={
								<AuthListener>
									<Landing />
								</AuthListener>
							} />
							<Route exact path='/' element={
								<AuthListener>
									<Landing />
								</AuthListener>
							} />
							<Route exact path='/signup' element={
								<AuthListener>
									<Signup />
								</AuthListener>
							} />
							<Route exact path='/' element={
								// Protected Routes will redirect
								// user from login/authentication page
								// if not authenticated

								<Protected>
									<Layout />
								</Protected>}>
								<Route index element={
									<Restricted>
										<Dashboard />
									</Restricted>
								} />

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
								<Route exact path='faculty/edit-faculty/:uid' element={<FacultyEdit />} />

								<Route exact path='my-files/:uid' element={<MyFiles />} />
								<Route exact path='my-files/:uid/:postId' element={<MyFileView />} />
								<Route exact path='my-files/:uid/new-syllabi/:postId' element={<MyFileAdd />} />
								<Route exact path='my-files/:uid/edit-syllabi/:postId' element={<MyFileEdit />} />

								<Route exact path='account/:uid' element={<Account />} />
								<Route exact path='account/edit-profile/:uid' element={<AccountProfileEdit />} />

								<Route exact path='practice' element={<Practice />} />
							</Route>

						</Routes>
					</BrowserRouter>
				</div>
			</ThemeProvider>
		</FirebaseProvider>
	)
}

export default App;
