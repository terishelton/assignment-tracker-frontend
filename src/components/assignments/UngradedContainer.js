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

    render() {
        const { assignments, loading } = this.state

        if (loading) return <div>Loading...</div>

        return(
            <main className='container'>
                <ListUngraded assignments={assignments} />
            </main>
        )
    }
}

export default UngradedContainer