import { useSelector, useDispatch } from 'react-redux';

import { useState } from 'react';

import { createPost, deletePost } from '../../redux/reducers/usersReducer';


const User = () => {
    const usersList = useSelector(state => state.users.list);
    const usersPosts = useSelector(state => state.users.posts);
    const foundUser = usersList.find(user => user.login === localStorage.getItem('userLogin'));
    const foundUserPosts = usersPosts.find(post => post.userId === foundUser.id);

    const [form, setForm] = useState({
        postName: '',
        postMessage: ''
    });

    const dispatch = useDispatch();

    const handleUpdateForm = (formType, formName) => { 
        setForm({
          ...form,
          [formType]: formName
        });
      }

      const handleCreatePost = (e) => {
        e.preventDefault();
      
        if (!form.postName || !form.postMessage) {
          alert('Post name and message are required');
          return;
        }
      
        dispatch(createPost(foundUser.id, form.postName, form.postMessage));
        setForm({
          postName: '',
          postMessage: ''
        });
      }

      const handleDeletePost = (candidateId) => {
        dispatch(deletePost(candidateId));
      }

    return (
        <center>
            <h1>{foundUser.login}</h1>
            <p>Firstname:{foundUser.firstname}</p>
            <p>Lastname:{foundUser.lastname}</p>
            <form>
                <input type="text" placeholder='Enter post name' onChange={e => handleUpdateForm('postName', e.target.value)}/>
                <input type="text" placeholder='Enter post message' onChange={e => handleUpdateForm('postMessage', e.target.value)}/>
                <button onClick={(e) => handleCreatePost(e)}>Send</button>
            </form>
            {usersPosts.length > 0 ? (
              usersPosts.map(el => (
                <div key={el.id}>
                  <h3>{el.postName}</h3>
                  <p>{el.postMessage}</p>
                  <button onClick={(e) => handleDeletePost(el.id)}>Delete</button>
                </div>
              ))
            ) : null }
        </center>
    )
}

export default User;