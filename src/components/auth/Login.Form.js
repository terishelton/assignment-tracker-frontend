// import React from 'react'
// import Form from './Form'

// export default ({ onSubmit }) => (
// 	<main className='container'>
// 		<section className='row justify-content-md-center'>
// 			<div className='col col-lg-5'>
// 				<h1>Login</h1>
// 				<Form onSubmit={onSubmit} />
// 			</div>
// 		</section>
// 	</main>
// )

import React from 'react'
import { withRouter } from 'react-router'

class Login extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			email: '',
			password: ''
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange ({ target: { name, value } }) {
		this.setState({ [name]: value })
	}

	handleSubmit (e) {
		e.preventDefault()
		this.props.onSubmit(this.state)
		this.props.history.push('/students')
	}

	render () {
		return (
			<main className='container'>
 				<section className='row justify-content-md-center'>
 					<div className='col col-lg-5'>
 						<h2>Login</h2>
						<form onSubmit={this.handleSubmit}>
							<div className='form-group'>
								<label htmlFor='email'>Email</label>
								<input
									className='form-control'
									id='email'
									onChange={this.handleChange}
									name='email'
									type='text'
									value={this.state.email} 
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='password'>Password</label>
								<input
									className='form-control'
									id='password'
									onChange={this.handleChange}
									name='password'
									type='password'
									value={this.state.password} 
								/>
							</div>
							<button type='submit' className='btn btn-primary'>Submit</button>
						</form>
					</div>
				</section>
			</main>
		)
	}
}

export default withRouter(Login)