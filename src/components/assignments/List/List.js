import React from 'react'

export default ({ assignments }) => {
	const list = assignments.map(assignment => (
		<li key={assignment._id} className='assignmentItem'>
			<div className='assignmentInfoContainer'>
				<div className='assignmentTitle'>
					{assignment.title}
				</div>
				<div className='assignmentDescription'>
					{assignment.description}
				</div>
				<div className='assignmentLink'>
					{assignment.link}
				</div>
				<div className='edits'>
					<button className='btn btn-secondary'>Edit</button><button className='btn btn-danger'>Delete</button>
				</div>
			</div>
			<div className='assignmentGradeContainer'>
				{assignment.userScore
				? (
					<div className='assignmentGrade'>
						{assignment.userScore} / {assignment.totalPossible}
					</div>
				) : (
					<div className='assignmentGradePending'>Grade TBD</div>
				)}
            </div>
			
		</li>
	))

	if (assignments.length === 0) {
		return (
			<>
				<h2>My Assignments</h2>
				<div>No assignments yet. Add an assignment by clicking "Create an Assignment" in the top bar.</div>
			</>
		)
	}

	return (
		<>
			<h2>My Assignments</h2>
			<ul className='assignmentList'>
				{ list }
			</ul>
		</>
	)
}