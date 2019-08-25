import React from 'react'
import { Route } from 'react-router-dom'

import List from './List/List'
import * as assignments from '../../api/students'

export default class Container extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            assignments: [],
            loading: true
        }
        this.refreshAssignments = this.refreshAssignments.bind(this)
    }

    async componentDidMount() {
        this.refreshAssignments().then(() => this.setState({ loading: false }))
    }
    
    async refreshAssignments() {
        const { currentUserId } = this.props
        const { response } = await assignments.getCurrentStudentAssignments(currentUserId)
        this.setState({ assignments: response.assignment })
    }

    render() {
        const { assignments, loading } = this.state

        if (loading) return <div>Loading...</div>

        return(
            <main className='container'>
                <Route path='/assignments' exact component={() => <List assignments={assignments} />} />
            </main>
        )
    }
}