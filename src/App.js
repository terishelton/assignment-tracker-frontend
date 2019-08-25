import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Header from './components/shared/Header'
import Navigation from './components/shared/navigation/Navigation'
import Login from './components/auth/Login.Form'
import Signup from './components/auth/Signup.Form'
import StudentsContainer from './components/students/Container'
import './App.css';

import * as auth from './api/auth'

class App extends React.Component {
	constructor() {
		super()
		this.state = {
			currentUserId: null,
			currentUserRole: null,
			currentUserName: null,
			loading: true
		}

		this.loginUser = this.loginUser.bind(this)
		this.signupUser = this.signupUser.bind(this)
		this.logoutUser = this.logoutUser.bind(this)
	}

	async componentDidMount() {
		const token = window.localStorage.getItem('assignment-tracker')
		if (token) {
			const { user }  = await auth.profile()
			this.setState({ 
				currentUserId: user._id, 
				currentUserName: user.firstName,
				currentUserRole: user.admin,
				loading: false 
			})
		}
		this.setState({ loading: false })
	}

	async signupUser(user) {
		await auth.signup(user)
		const profile = await auth.profile()
		this.setState({ 
			currentUserId: profile.user._id,
			currentUserRole: profile.user.admin,
			currentUserName: profile.user.firstName
		})
	}

	async loginUser(user) {
		await auth.login(user)
		const profile = await auth.profile()
		this.setState({ 
			currentUserId: profile.user._id, 
			currentUserRole: profile.user.admin,
			currentUserName: profile.user.firstName
		})
	}
	
	logoutUser() {
		window.localStorage.removeItem('assignment-tracker')
		this.setState({ currentUserId: null })
	}

	render () {
		const { currentUserId, currentUserRole, currentUserName, loading } = this.state
		if (loading) return <div>Loading...</div>

		return (
			<Router>
				<Header />
				<Navigation 
					currentUserId={currentUserId}
					currentUserRole={currentUserRole}
					currentUserName={currentUserName}
					logoutUser={this.logoutUser}
				/>
				<Switch>
					<Route path='/login' exact component={() => {
						return currentUserId ? (
						<Redirect to="/students" />
						)
						: (
						<Login onSubmit={this.loginUser} />
						)
					}} />

					<Route path='/signup' exact component={() => {
						return currentUserId ? (
						<Redirect to="/students" />
						)
						: (
						<Signup onSubmit={this.signupUser} />
						)
					}} />

					<Route path='/students' render={() => {
						return currentUserId 
						? <StudentsContainer
							currentUserId={currentUserId}
							currentUserRole={currentUserRole}
							currentUserName={currentUserName}
							/> 
						: <Redirect to='/login' />
					}} />

					<Redirect to='/login' />
				</Switch>
			</Router>
		)
	}
}

export default App;
