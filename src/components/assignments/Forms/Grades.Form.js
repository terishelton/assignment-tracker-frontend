import React from 'react'

export default class Form extends React.Component {
	constructor (props) {
		super(props)
		const { assignment = {} } = this.props
		const { userScore = '', totalPossible = '' } = assignment
		this.state = { 
            userScore,
			totalPossible
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange ({ target: { name, value } }) {
		this.setState({ [name]: value })
	}

	handleSubmit (e) {
		e.preventDefault()
        const { assignment } = this.props
        
        if (assignment && assignment._id) {
           const body = Object.assign({}, this.state, { _id: assignment._id })
           this.props.onSubmit(body)
        } else {
           this.props.onSubmit(this.state)
        }
	}

	render () {
		return (
			<form onSubmit={this.handleSubmit}>
				<div className='form-group'>
					<label htmlFor='userScore'>User Score</label>
					<input
						className='form-control'
						id='userScore'
						onChange={this.handleChange}
						name='userScore'
						type='number'
						value={this.state.userScore} />
				</div>
                <div className="outof">out of</div>
				<div className='form-group'>
					<label htmlFor='totalPossible'>Total Possible</label>
					<input
						className='form-control'
						id='totalPossible'
						onChange={this.handleChange}
						name='totalPossible'
						type='number'
						value={this.state.totalPossible} />
				</div>
				<button type='submit' className='btn btn-primary'>Save</button>
			</form>
		)
	}
}
