import React from 'react'
import { withRouter } from 'react-router'

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
        this.updateGrade = this.updateGrade.bind(this)
    }

    async componentDidMount() {
        this.gradedAssignments().then(() => this.setState({ loading: false }))
    }
    
    async gradedAssignments() {
        const { response } = await assignments.getGradedAssignments()
        this.setState({ assignments: response })
    }

    async updateGrade(assignment) {
        await assignments.gradeAssignments({ assignment })
        await this.gradedAssignments().then(() => this.setState({ loading: false }))

        this.props.history.push('/assignments/graded')
    }

    render() {
        const { assignments, loading } = this.state

        if (loading) return <div>Loading...</div>

        return(
            <main className='container'>
                <ListGraded 
                    assignments={assignments} 
                    updateGrade={this.updateGrade}
                />
            </main>
        )
    }
}

export default withRouter(GradedContainer)