import React from 'react'
import { withRouter } from 'react-router'

class Login extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			email: '',
			password: '',
			error: false,
			emailError: '',
            passwordError: ''
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange ({ target: { name, value } }) {
		this.setState({ 
			[name]: value,
			error: false,
			emailError: '',
			passwordError: ''
		})
	}

	handleSubmit (e) {
		e.preventDefault()

		if (this.state.email === '') {
            this.setState({ error: true, emailError: 'Please enter a valid email address. '})
        } else if (this.state.password.length < 8 ) {
            this.setState({ error: true, passwordError: 'Please enter a valid password.' })
        } else {
			this.props.onSubmit(this.state)
			this.props.history.push('/students')
		}
	}

	render () {
		return (
			<main className='container'>
 				<section className='row'>
 					<div className='col col-lg-5'>
 						<h2>Login</h2>
						<form onSubmit={this.handleSubmit} noValidate>
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
							{ this.state.error && this.state.emailError &&
                                <div className="errorMessage">
                                    {this.state.emailError}
                                </div>
                            }
                            { this.state.error && this.state.passwordError &&
                                <div className="errorMessage">
                                    {this.state.passwordError}
                                </div>
                            }
						</form>
					</div>
				</section>
			</main>
		)
	}
}

export default withRouter(Login)