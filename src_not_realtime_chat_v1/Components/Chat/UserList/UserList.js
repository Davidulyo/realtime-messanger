import UserCard from '../UserCard/UserCard';
import './UserList.css';

function UserList({allUsers}) {

    console.log(allUsers);

    return <>

        <div className='user-list'>
        
            {allUsers.length > 0 && allUsers.map((user, i) => {
                return <UserCard key={i+11} user={user}/>
            })}
        
        </div>
    
    
    </>
}

export default UserList;
