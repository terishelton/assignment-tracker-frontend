import React from 'react'

export default ({ assignments }) => {
	const list = assignments.map(assignment => (
		<li key={assignment._id} className='d-flex justify-content-between'>
			<div className='assignmentTitle'>
				{assignment.title}
			</div>
			<div className='assignmentDescription'>
                {assignment.description}
			</div>
            <div className='assignmentLink'>
                Project Link
            </div>
			<div className='assignmentGrade'>
                Grade
            </div>
            <div className='edits'>
                Edit / Delete
            </div>
			
		</li>
	))

	return (
		<>
			<h2>My Assignments</h2>
			<ul className='assignmentList'>
				{ list }
			</ul>
		</>
	)
}