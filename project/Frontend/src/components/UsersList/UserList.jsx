import PropTypes from 'prop-types';
import EditUserBtn from '../EditUserBtn/EditUserBtn'
import './UserList.css'
import RemoveUserBtn from '../RemoveUserBtn/RemoveUserBtn';
import ShowDevicesUserBtn from '../ShowDevicesUserBtn/ShowDevicesUserBtn';
import AddNewUserBtn from '../AddNewUserBtn/AddNewUserBtn';

function UserList({ users = [], updateFunction})
{
    return (
        <div className="list-users">
            <h2 className="list-users-title">Users List</h2>
            <AddNewUserBtn updateFunction={updateFunction}/>   
            {users.length === 0 ? 
            (
                <p className="no-users-message">No users available.</p> 
            ) : (
                <>           
                <ul className="user-list">
                {users.map(({ id, firstName, lastName, email}) => (
                    <li key={id} className="user-item">
                        <h3 className="user-name">{firstName} {lastName}</h3>
                        <p className="user-email">{email}</p>
                        <ShowDevicesUserBtn userId={id}/>
                        <EditUserBtn userId={id} updateFunction={updateFunction}/>
                        <RemoveUserBtn userId={id} updateFunction={updateFunction}/>
                    </li>
                    ))}
                </ul>
                </>

            )}
        </div>
    );
}

export default UserList

UserList.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            firstName: PropTypes.string,
            lastName: PropTypes.string,
            email: PropTypes.string.isRequired
        })
    ).isRequired,
    updateFunction: PropTypes.func.isRequired
};