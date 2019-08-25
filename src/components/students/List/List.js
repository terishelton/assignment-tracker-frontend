import React from 'react'

export default ({ students }) => {
	const list = students.map(student => (
		<li key={student._id} className='d-flex justify-content-between'>
			<span className='studentInfo'>
				{student.firstName} {student.lastName} &ndash; {student.email}
			</span>
			<span className='studentGrades'>
				student score goes here in Admin view
			</span>
			
			
		</li>
	))

	return (
		<>
			<h2>All Students</h2>
			<ul className='studentList'>
				{ list }
			</ul>
		</>
	)
}