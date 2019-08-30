import React from 'react'

import * as assignments from '../../api/assignments'

import ListUngraded from './List/List.Ungraded'

class UngradedContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            assignments: [],
            loading: true
        }
        this.ungradedAssignments = this.ungradedAssignments.bind(this)
    }

    async componentDidMount() {
        this.ungradedAssignments().then(() => this.setState({ loading: false }))
    }

    async ungradedAssignments() {
        const { response } = await assignments.getUnGradedAssignments()
        this.setState({ assignments: response })
    }

    // TODO: finish this + I need a route on the front end and the back end!
    //async createGrade(assignment) {
        //const { currentUserId, history } = this.props

        //await assignments.createAssignment({ user: { _id: currentUserId }, assignment })
        //await this.refreshAssignments().then(() => this.setState({ loading: false }))
    //}

    render() {
        const { assignments, loading } = this.state

        if (loading) return <div>Loading...</div>

        return(
            <main className='container'>
                <ListUngraded 
                    assignments={assignments} 
                    //createGrade={this.createGrade}
                />
            </main>
        )
    }
}

export default UngradedContainer