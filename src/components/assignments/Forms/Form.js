import React from 'react'

export default class Form extends React.Component {
	constructor (props) {
		super(props)
		const { assignment = {} } = this.props
		const { title = '', description = '', link = '' } = assignment
		this.state = { 
			title, 
			description, 
			link, 
			error: false, 
			titleError: '',
			descError: '',
			linkError: ''
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange ({ target: { name, value } }) {
		this.setState({ [name]: value, error: false, titleError: '', descError: '', linkError: '' })
	}

	handleSubmit (e) {
		e.preventDefault()
		const { assignment } = this.props

		if (this.state.title === '') {
			this.setState({ error: true, titleError: 'Please enter a title for your assignment.' })
		} else if (this.state.description === '') {
			this.setState({ error: true, descError: 'Please enter a description for your assignment.'})
		} else if (this.state.link === '') {
			this.setState({ error: true, linkError: 'Please enter a link for your assignment.'})
		} else {
			if (assignment && assignment._id) {
				const body = Object.assign({}, this.state, { _id: assignment._id })
				this.props.onSubmit(body)
			} else {
				this.props.onSubmit(this.state)
			}
		}
	}

	render () {
		return (
			<form onSubmit={this.handleSubmit}>
				<div className='form-group'>
					<label htmlFor='title'>Title</label>
					<input
						className='form-control'
						id='title'
						onChange={this.handleChange}
						name='title'
						type='text'
						value={this.state.title} />
				</div>
				<div className='form-group'>
					<label htmlFor='content'>Description</label>
					<textarea
						className='form-control'
						id='description'
						onChange={this.handleChange}
						name='description'
						type='textarea'
						value={this.state.description} />
				</div>
				<div className='form-group'>
					<label htmlFor='link'>Project Link</label>
					<input
						className='form-control'
						id='link'
						onChange={this.handleChange}
						name='link'
						type='text'
						value={this.state.link} />
				</div>
				<button type='submit' className='btn btn-primary'>Submit</button>
				{ this.state.error && this.state.titleError &&
					<div className="errorMessage">
						{this.state.titleError}
					</div>
				}
				{ this.state.error && this.state.descError &&
					<div className="errorMessage">
						{this.state.descError}
					</div>
				}
				{ this.state.error && this.state.linkError &&
					<div className="errorMessage">
						{this.state.linkError}
					</div>
				}
			</form>
		)
	}
}
