import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormRegistration from '../../components/FormRegistration/FormRegistration';
import {  GetUserById, addNew, update } from '../../services/ServiceUser';
import { useNavigate } from 'react-router-dom';
import './SaveUserPage.css'

function SaveUserPage() {
    const { id } = useParams(); 
    const userId = +id;
    const [user, setUser] = useState(null); 
    const navigator = useNavigate();

    useEffect(() => {
        if (id) {
            const fetchUser = async () => {
                const fetchedUser = await GetUserById(+userId);
                setUser(fetchedUser); 
            };
            fetchUser();
        }
    }, [id, userId]);

    return (
        <>
            {user ? (
                <div className='save-user-page'>
                <h2 >Update user</h2>
                <FormRegistration 
                    initialUser={user} 
                    onSubmit={(user) => {
                        navigator("/admin") 
                        update(user, userId)
                    }} 
                    isAdmin = {true}
                />
                </div>
                
            ) : (
                <div className='save-user-page'>
                <h2>Add new user</h2>
                <FormRegistration onSubmit={(user) => {
                    addNew(user)
                    navigator("/admin")
                }} 
                isAdmin = {true}
                />
                 </div>
            )}
        </>
    );
}

export default SaveUserPage;
