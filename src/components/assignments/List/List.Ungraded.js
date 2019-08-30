import React from 'react'
import GradesForm from '../Forms/Grades.Form'

export default ({ assignments, createGrade }) => {
	const list = assignments.map(assignment => (
		<li key={assignment._id} className='assignmentItem'>
			<div className='assignmentInfoContainer'>
				<div className='assignmentTitle'>
					{assignment.title} <span>by</span> {assignment.student[0].firstName} {assignment.student[0].lastName}
				</div>
				<div className='assignmentDescription'>
					{assignment.description}
				</div>
				<div className='assignmentLink'>
					<a href={assignment.link}>Project Link</a>
				</div>
			</div>
			<div className='assignmentGradeContainer'>
				<GradesForm onSubmit={createGrade} assignment={assignment} />
            </div>
			
		</li>
	))

	if (assignments.length === 0) {
		return (
			<>
				<h2>Ungraded Assignments</h2>
				<div>No ungraded assignments. Yay! You're all caught up.</div>
			</>
		)
	}

	return (
		<>
			<h2>Ungraded Assignments</h2>
			<ul className='assignmentList ungraded'>
				{ list }
			</ul>
		</>
	)
}