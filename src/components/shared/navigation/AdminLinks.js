import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

const AdminLinks = ({ currentUserName, history, logoutUser }) => {
	const logout = () => {
		logoutUser()
		history.push('/login')
	}

	return (
		<ul className='nav justify-content-start'>
			<li className='nav-item'>
				<Link className='nav-link' to='/students'>
					All Students
				</Link>
			</li>
			<li className='nav-item'>
				<Link className='nav-link' to={`/assignments/ungraded`}>
					Ungraded Assignments
				</Link>
			</li>
            <li className='nav-item'>
				<Link className='nav-link' to={`/assignments/graded`}>
					Graded Assignments
				</Link>
			</li>
			<li className='nav-item welcome-nolink'>
                <span>Welcome, {currentUserName}!</span>
			</li>
			<li className='nav-item'>
				<button
				className='btn btn-link'
				onClick={logout}>
					Logout
				</button>
			</li>
		</ul>
	)
}

export default withRouter(AdminLinks)
