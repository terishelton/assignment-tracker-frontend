import React from 'react'

import * as assignments from '../../api/assignments'

import ListGraded from './List/List.Graded'

class GradedContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            assignments: [],
            loading: true
        }
        this.gradedAssignments = this.gradedAssignments.bind(this)
    }

    async componentDidMount() {
        this.gradedAssignments().then(() => this.setState({ loading: false }))
    }
    
    async gradedAssignments() {
        const { response } = await assignments.getGradedAssignments()
        this.setState({ assignments: response })
    }

    render() {
        const { assignments, loading } = this.state

        if (loading) return <div>Loading...</div>

        return(
            <main className='container'>
                <ListGraded assignments={assignments} />
            </main>
        )
    }
}

export default GradedContainer