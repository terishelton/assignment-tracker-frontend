import React from 'react'
import { withRouter } from 'react-router'
import { Route } from 'react-router-dom'

import * as assignments from '../../api/students'

import List from './List/List'
import EditForm from './Forms/Edit.Form'
import NewForm from './Forms/New.Form'

class StudentAssignmentContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            assignments: [],
            loading: true,
            confirmation: false
        }
        this.refreshAssignments = this.refreshAssignments.bind(this)

        this.createAssignment = this.createAssignment.bind(this)
        this.deleteAssignment = this.deleteAssignment.bind(this)
        this.editAssignment = this.editAssignment.bind(this)
    }

    async componentDidMount() {
        this.refreshAssignments().then(() => this.setState({ loading: false, confirmation: false }))
    }
    
    async refreshAssignments() {
        const { currentUserId } = this.props
        const { response } = await assignments.getCurrentStudentAssignments(currentUserId)
        this.setState({ assignments: response })
    }

    async createAssignment(assignment) {
        const { currentUserId, history } = this.props

        await assignments.createAssignment({ user: { _id: currentUserId }, assignment })
        await this.refreshAssignments().then(() => this.setState({ loading: false }))

        history.push(`/my-assignments`)
    }

    async editAssignment(assignment) {
        const { currentUserId, history } = this.props
        
        await assignments.editAssignment({ user: { _id: currentUserId}, assignment })
        await this.refreshAssignments().then(() => this.setState({ loading: false }))

        history.push(`/my-assignments`)
    }

    async deleteAssignment (assignment) {
        const { currentUserId, history } = this.props
        
        await assignments.deleteAssignment({ user: { _id: currentUserId }, assignment })
        await this.refreshAssignments().then(() => this.setState({ loading: false }))
        
        history.push(`/my-assignments`)
        this.setState({ confirmation: true })
    }

    render() {
        const { assignments, loading } = this.state

        if (loading) return <div>Loading...</div>

        return(
            <main className='container'>
                { this.state.confirmation &&
                    <div className="deleteConfirmation">Assignment deleted.</div>
                }
                <Route path='/my-assignments' exact component={ () => 
                    <List 
                        assignments={assignments}
                        deleteAssignment={this.deleteAssignment}
                    />} 
                />
                <Route path='/my-assignments/new' exact component={ () => 
                    <NewForm onSubmit={this.createAssignment} />} 
                />

                <Route path='/my-assignments/:assignmentId/edit' exact component={({match}) => {
                    const assignment = assignments.find(assignment => assignment._id === match.params.assignmentId)
                    return <EditForm onSubmit={this.editAssignment} assignment={assignment} />
                }}/>
            </main>
        )
    }
}

export default withRouter(StudentAssignmentContainer)