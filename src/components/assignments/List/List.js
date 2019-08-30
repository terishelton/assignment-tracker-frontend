import React from 'react'
import { Link } from 'react-router-dom'

export default ({ assignments, deleteAssignment }) => {
	const scoreColor = (assignment) => {
		const percentage = assignment.userScore / assignment.totalPossible

		if (percentage >= 0.8) {
			return 'text-success'
		} else if ((percentage >= 0.6) && (percentage < 0.8)) {
			return 'text-warning'
		} else if (percentage < 0.6 ) {
			return 'text-danger'
		}
	}

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
					<a href={assignment.link}>Project Link</a>
				</div>
				<div className='edits'>
					<Link to={`/my-assignments/${assignment._id}/edit/`} className='btn btn-secondary'>Edit</Link><button className='btn btn-danger' onClick={() => deleteAssignment(assignment)}>Delete</button>
				</div>
			</div>
			<div className='assignmentGradeContainer'>
				{assignment.userScore
				? (
					<div className={`assignmentGrade ${scoreColor(assignment)}`}>
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