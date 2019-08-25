import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

const AuthenticatedLinks = ({ currentUserId, history, logoutUser }) => {
	const logout = () => {
		logoutUser()
		history.push('/login')
	}

	// if user.admin = false
	// show these links...
	// else show these other links...

	return (
		<ul className='nav justify-content-start'>
			<li className='nav-item'>
				<Link className='nav-link' to='/'>
					Home
				</Link>
			</li>
			<li className='nav-item'>
				<Link className='nav-link' to='/students'>
					All Students
				</Link>
			</li>
			<li className='nav-item'>
				<Link className='nav-link' to={`/students/${currentUserId}/assignments/new`}>
					Create an Assignment
				</Link>
			</li>
			<li className='nav-item align-self-end'>
				Welcome, firstName!
			</li>
			<li className='nav-item align-self-end'>
				<button
				className='btn btn-link'
				onClick={logout}>
					Logout
				</button>
			</li>
		</ul>
	)
}

export default withRouter(AuthenticatedLinks)
