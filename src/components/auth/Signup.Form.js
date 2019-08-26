import React from 'react'
import { withRouter } from 'react-router'

class Signup extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
            firstName: '',
            lastName: '',
			email: '',
            password: '',
            admin: false,
            error: false,
            firstNameError: '',
            lastNameError: '',
            emailError: '',
            passwordError: ''
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange ({ target: { name, value } }) {
		this.setState({ 
            [name]: value,
            admin: false,
            error: false,
            firstNameError: '',
            lastNameError: '',
            emailError: '',
            passwordError: ''
        })
	}

    validateEmail(email) {
        const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        return regex.test(email)
    }

	handleSubmit (e) {
        e.preventDefault()

        if (this.state.firstName === '') {
            this.setState({ error: true, firstNameError: 'Please enter your first name.' })
        } else if (this.state.lastName === '') {
            this.setState({ error: true, lastNameError: 'Please enter your last name.' })
        } else if ((this.state.email === '') || (!this.validateEmail(this.state.email)) ) {
            this.setState({ error: true, emailError: 'Please enter a valid email address. '})
        } else if (this.state.password.length < 8 ) {
            this.setState({ error: true, passwordError: 'Please enter a password of at least 8 characters.' })
        } else {
            this.props.onSubmit(this.state)
            this.props.history.push('/assignments')
        }
	}

	render () {
		return (
			<main className='container'>
                <section className='row'>
                    <div className='col col-lg-5'>
                        <h2>Signup</h2>
                        <form onSubmit={this.handleSubmit} noValidate>
                            <div className='form-group'>
                                <label htmlFor='firstName'>First Name</label>
                                <input
                                    className='form-control'
                                    id='firstName'
                                    onChange={this.handleChange}
                                    name='firstName'
                                    type='text'
                                    value={this.state.firstName}
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='lastName'>Last Name</label>
                                <input
                                    className='form-control'
                                    id='lastName'
                                    onChange={this.handleChange}
                                    name='lastName'
                                    type='text'
                                    value={this.state.lastName} 
                                />
                            </div>
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
                            { this.state.error && this.state.firstNameError &&
                                <div className="errorMessage">
                                    {this.state.firstNameError}
                                </div>
                            }
                            { this.state.error && this.state.lastNameError &&
                                <div className="errorMessage">
                                    {this.state.lastNameError}
                                </div>
                            }
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

export default withRouter(Signup)