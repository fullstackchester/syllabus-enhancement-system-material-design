import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import React from 'react'
import './index.scss'
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
import Restricted from "./Components/Routing/RestrictedRoute";
import Practice from "./Pages/Practice";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Alert, Snackbar } from '@mui/material'
import { Box } from "@mui/system";
import { useDispatch, useSelector } from 'react-redux'
import Authentication from "./Pages/Authentication/Authentication";
import ForgetPassword from "./Pages/Authentication/ForgetPassword";
import AuthListener from "./Components/Routing/AuthListenerRoute";
import { notify } from './Features/PopAlert'
import { grey } from '@mui/material/colors'
import SchoolYear from "./Pages/School Year/SchoolYear";
import SchoolYearAdd from "./Pages/School Year/SchoolYearAdd";
import { LoginPage } from "./Pages/login/Login";
import { APP_ROUTE } from "./route";
function App() {

	const dispatch	= useDispatch()
	const THEME		= useSelector((state) => state.theme.mode)
	const POP_ALERT = useSelector((state) => state.alert.value)

	const customTheme = createTheme({
		palette: {
			mode: THEME,
			background: {
				default: THEME === 'dark' ? '#121212' : grey[50]
			}
		},
		typography: {
			fontFamily:			`'Open Sans', sans-serif`,
			fontWeightRegular:	400,
			fontWeightMedium:	500,
			fontWeightLight:	300,
			fontWeightBold:		700,
		}
	});
	return (
		<APP_ROUTE />
		// <FirebaseProvider>
		// 	<ThemeProvider theme={ customTheme }>
		// 		<CssBaseline />
		// 		<Box
		// 			component='div'
		// 			className='App'>
		// 			<BrowserRouter>
		// 				<Routes>
		// 					<Route index element={<LoginPage />} />
		// 					<Route index element={<AuthListener><Landing /></AuthListener>} />
		// 					<Route exact path='/' element={<LoginPage />} />
		// 					{/* <Route exact path='/' element={<AuthListener><Landing /></AuthListener>} /> */}
		// 					<Route exact path='/signup' element={<Signup />} />
		// 					<Route exact path='/authentication' element={<Authentication />} >
		// 						<Route exact path='forget-password' element={<ForgetPassword />} />
		// 					</Route>

		// 					<Route
		// 						exact
		// 						path='/'
		// 						element={<Protected><Layout /></Protected>}>

		// 						<Route index element={<Restricted><Dashboard /></Restricted>} />
		// 						<Route exact path='dashboard' element={<Restricted><Dashboard /></Restricted>} />

		// 						<Route exact path='syllabus' element={<Restricted><Syllabus /></Restricted>} />
		// 						<Route exact path='syllabus/:postId' element={<SyllabusFile />} />
		// 						<Route exact path='syllabus/new-syllabus/:postId' element={<SyllabusAdd />} />
		// 						<Route exact path='syllabus/edit-syllabus/:postId' element={<SyllabusEdit />} />

		// 						<Route exact path='school-year' element={<Restricted><SchoolYear /></Restricted>} />
		// 						<Route exact path='school-year/new-school-year/:syId' element={<SchoolYearAdd />} />

		// 						<Route exact path='subjects' element={<Restricted><Subject /></Restricted>} />
		// 						<Route exact path='subjects/:subjectId' element={<SubjectFile />} />
		// 						<Route exact path='subjects/new-subject/:subjectId' element={<SubjectAdd />} />
		// 						<Route exact path='subjects/edit-subject/:subjectId' element={<SubjectEdit />} />

		// 						<Route exact path='faculty' element={<Restricted><Faculty /></Restricted>} />
		// 						<Route exact path='faculty/:uid' element={<FacultyProfile />} />
		// 						<Route exact path='faculty/edit-faculty/:uid' element={<FacultyEdit />} />

		// 						<Route exact path='my-files/:uid' element={<MyFiles />} />
		// 						<Route exact path='my-files/:uid/:postId' element={<MyFileView />} />
		// 						<Route exact path='my-files/:uid/new-syllabi/:postId' element={<MyFileAdd />} />
		// 						<Route exact path='my-files/:uid/edit-syllabi/:postId' element={<MyFileEdit />} />

		// 						<Route exact path='account/:uid' element={<Account />} />
		// 						<Route exact path='account/edit-profile/:uid' element={<AccountProfileEdit />} />

		// 						<Route path='/practice' element={<Practice />} />
		// 					</Route>
		// 				</Routes>
		// 			</BrowserRouter>
		// 		</Box>

		// 		<Snackbar
		// 			open={POP_ALERT.visible}
		// 			anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
		// 			onClose={() => {
		// 				dispatch(notify({
		// 					status: '',
		// 					message: '',
		// 					visible: false
		// 				}))
		// 			}}
		// 			autoHideDuration={5000} >
		// 			<Alert severity={POP_ALERT.status} >
		// 				{POP_ALERT.message}
		// 			</Alert>
		// 		</Snackbar>

		// 	</ThemeProvider>
		// </FirebaseProvider>
	)
}

export default App;
