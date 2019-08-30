import React from 'react'

export default ({ assignments }) => {
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
					<div className='assignmentGrade'>
						{assignment.userScore} / {assignment.totalPossible}
					</div>
            </div>
			
		</li>
	))

	if (assignments.length === 0) {
		return (
			<>
				<h2>Graded Assignments</h2>
				<div>No graded assignments yet. Maybe time to catch up?</div>
			</>
		)
	}

	return (
		<>
			<h2>Graded Assignments</h2>
			<ul className='assignmentList graded'>
				{ list }
			</ul>
		</>
	)
}