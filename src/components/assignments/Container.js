import React from 'react'
import { withRouter } from 'react-router'
import { Route, Redirect } from 'react-router-dom'

import * as assignments from '../../api/students'

import List from './List/List'
import ListUngraded from './List/List.Ungraded'
import ListGraded from './List/List.Graded'
import EditForm from './Forms/Edit.Form'
import NewForm from './Forms/New.Form'

class Container extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            assignments: [],
            loading: true
        }
        this.refreshAssignments = this.refreshAssignments.bind(this)

        this.createAssignment = this.createAssignment.bind(this)
        //this.deleteAssignment = this.deleteAssignment.bind(this)
        this.editAssignment = this.editAssignment.bind(this)
    }

    async componentDidMount() {
        this.refreshAssignments().then(() => this.setState({ loading: false }))
    }
    
    async refreshAssignments() {
        const { currentUserId } = this.props
        const { response } = await assignments.getCurrentStudentAssignments(currentUserId)
        this.setState({ assignments: response.assignment })
    }

    async createAssignment(assignment) {
        const { currentUserId, history } = this.props

        await assignments.createAssignment({ user: { _id: currentUserId }, assignment })
        await this.refreshAssignments().then(() => this.setState({ loading: false }))

        history.push(`/assignments`)
    }

    async editAssignment(assignment) {
        const { currentUserId, history } = this.props
        
        await assignments.editAssignment({ user: { _id: currentUserId}, assignment })
        await this.refreshAssignments().then(() => this.setState({ loading: false }))

        history.push(`/assignments`)
    }

    render() {
        const { assignments, loading } = this.state
        const { users, currentUserRole } = this.props

        if (loading) return <div>Loading...</div>

        return(
            <main className='container'>
                <Route path='/assignments' exact component={ () => 
                    <List assignments={assignments} />} 
                />
                <Route path='/assignments/new' exact component={ () => 
                    <NewForm onSubmit={this.createAssignment} />} 
                />
                <Route path='/assignments/:assignmentID/edit' exact component={({ match }) => {
                    const user = users.find(user => user._id === match.params.userId)
                    const assignment = user.assignments.find(user => user._id === match.params.assignmentID)
                    return <EditForm onSubmit={this.editAssignment} assignment={assignment} />
                }}/>
                <Route path='/assignments/ungraded' exact component={ () => {
                    return currentUserRole === false
                    ? <Redirect to="/assignments" />
                    : <ListUngraded assignments={assignments} />
                }}/>
                <Route path='/assignments/graded' exact component={ () => {
                    return currentUserRole === false
                    ? <Redirect to="/assignments" />
                    : <ListGraded assignments={assignments} />
                }}/>
            </main>
        )
    }
}

export default withRouter(Container)