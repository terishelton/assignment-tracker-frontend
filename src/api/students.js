//const { REACT_APP_API_DOMAIN } = process.env
const BASE_URL = 'http://localhost:5000'

export const getAllStudents = async() => {
	const token = window.localStorage.getItem('assignment-tracker')
	const response = await fetch(`${BASE_URL}/api/students`, {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		},
		method: 'GET'
	})

	const json = await response.json()
	return json
}

export const getCurrentStudentAssignments = async(user) => {
	const token = window.localStorage.getItem('assignment-tracker')
	const response = await fetch(`${BASE_URL}/api/students/${user}/assignments`, {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		},
		method: 'GET'
	})

	const json = await response.json()
	return json
}

export const createAssignment = async(user) => {
	const token = window.localStorage.getItem('assignment-tracker')
	const response = await fetch(`${BASE_URL}/api/students/${user.user._id}/assignment`, {
		body: JSON.stringify(user.assignment),
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		},
		method: 'POST'
	})

	const json = await response.json()
    return json.response
}

export const editAssignment = async(user) => {
	const token = window.localStorage.getItem('assignment-tracker')
	const response = await fetch(`${BASE_URL}/api/students/${user.user._id}/assignment/${user.assignment._id}`, {
		body: JSON.stringify(user.assignment),
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		},
		method: 'PATCH'
	})

	const json = await response.json()
    return json.response
}

export const deleteAssignment = async(user) => {
	const token = window.localStorage.getItem('assignment-tracker')
	const response = await fetch(`${BASE_URL}/api/students/${user.user._id}/assignment/${user.assignment._id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		},
		method: 'DELETE'
	})

	const json = await response.json()
    return json.response
}