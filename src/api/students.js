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
	//const assignments = json.response.assignment // return just the assignments
	return json
}