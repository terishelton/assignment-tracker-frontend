const { REACT_APP_API_DOMAIN } = process.env
const BASE_URL = REACT_APP_API_DOMAIN //'http://localhost:5000'

export const signup = async (user) => {
    const response = await fetch(`${BASE_URL}/api/signup`, {
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    })

    const json = await response.json()
    localStorage.setItem('assignment-tracker', json.token)
    return json
}

export const login = async (user) => {
    const response = await fetch(`${BASE_URL}/api/login`, {
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    })

    const json = await response.json()
    localStorage.setItem('assignment-tracker', json.token)
    return json
}

export const profile = async (user) => {
    const token = localStorage.getItem('assignment-tracker')
    const response = await fetch(`${BASE_URL}/api/profile`, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        method: 'GET',
    })
    
    const json = await response.json()
    return json
}