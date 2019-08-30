import React from 'react'
import { withRouter } from 'react-router'

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
        this.createGrade = this.createGrade.bind(this)
    }

    async componentDidMount() {
        this.ungradedAssignments().then(() => this.setState({ loading: false }))
    }

    async ungradedAssignments() {
        const { response } = await assignments.getUnGradedAssignments()
        this.setState({ assignments: response })
    }

    async createGrade(assignment) {
        await assignments.gradeAssignments({ assignment })
        this.ungradedAssignments().then(() => this.setState({ loading: false }))

        this.props.history.push('/assignments/ungraded')
    }

    render() {
        const { assignments, loading } = this.state

        if (loading) return <div>Loading...</div>

        return(
            <main className='container'>
                <ListUngraded 
                    assignments={assignments} 
                    createGrade={this.createGrade}
                />
            </main>
        )
    }
}

export default withRouter(UngradedContainer)