import React from 'react'

import StudentLinks from './StudentLinks'
import AdminLinks from './AdminLinks'
import UnauthenticatedLinks from './UnauthenticatedLinks'

export default ({ currentUserId, currentUserName, currentUserRole, logoutUser }) => (
    <section className='bg-light border-bottom mb-4'>
        <div className='container'>
        { 
            !currentUserId
                ? <UnauthenticatedLinks /> 
                : ( currentUserId && currentUserRole === false
                    ? <StudentLinks 
                        currentUserId={currentUserId} 
                        currentUserName={currentUserName}
                        currentUserRole={currentUserRole}
                        logoutUser={logoutUser}
                        />
                    : <AdminLinks 
                        currentUserId={currentUserId} 
                        currentUserName={currentUserName}
                        currentUserRole={currentUserRole}
                        logoutUser={logoutUser}
                    /> 
                )
        }
        </div>
    </section>
)
