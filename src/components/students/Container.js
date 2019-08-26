import React from 'react'
import { Route } from 'react-router-dom'

import List from './List/List'
import * as students from '../../api/students'

export default class Container extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            students: [],
            loading: true
        }
        this.refreshStudents = this.refreshStudents.bind(this)
    }

    async componentDidMount() {
        this.refreshStudents().then(() => this.setState({ loading: false }))
    }
    
    async refreshStudents() {
        const { response } = await students.getAllStudents()
        this.setState({ students: response })
    }

    render() {
        const { students, loading } = this.state
        const { currentUserRole } = this.props

        if (loading) return <div>Loading...</div>

        return(
            <main className='container'>
                <Route path='/students' exact component={() => <List students={students} currentUserRole={currentUserRole} />} />
            </main>
        )
    }
}