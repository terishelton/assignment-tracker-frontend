import React from 'react'

export default ({ students, currentUserRole }) => {
	const scoreColor = (student) => {
		const percentage = student.overallGrade / student.overallGradePossible

		if (percentage > 0.8) {
			return 'text-success'
		} else if ((percentage > 0.6) && (percentage < 0.79)) {
			return 'text-warning'
		} else if (percentage < 0.6 ) {
			return 'text-danger'
		}
	}

	const list = students.map(student => (
		<li key={student._id} className='d-flex justify-content-between'>
			<span className='studentInfo'>
				{student.firstName} {student.lastName} &ndash; {student.email}
			</span>
			{ currentUserRole === true &&
				<span className={`assignmentGrade ${scoreColor(student)}`}>
					{student.overallGrade} / {student.overallGradePossible}
				</span>
			}
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