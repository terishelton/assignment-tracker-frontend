//const { REACT_APP_API_DOMAIN } = process.env
const BASE_URL = 'http://localhost:5000'

export const getGradedAssignments = async() => {
	const token = window.localStorage.getItem('assignment-tracker')
	const response = await fetch(`${BASE_URL}/api/assignments/graded`, {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		},
		method: 'GET'
	})

    const json = await response.json()
	return json
}

export const getUnGradedAssignments = async() => {
	const token = window.localStorage.getItem('assignment-tracker')
	const response = await fetch(`${BASE_URL}/api/assignments/ungraded`, {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		},
		method: 'GET'
	})

    const json = await response.json()
	return json
}