import React, { useState, useEffect, useContext } from 'react';
import TodoService from '../services/TodoServices';
import TodoCard from '../components/TodoCard';
import AddTask from '../components/AddTask';
import { AuthContext } from '../../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';
import {useCookies} from 'react-cookie';
import {jwtDecode} from 'jwt-decode';

const Content = ({ }) => {
  const [cookies, setCookie, removeCookie] = useCookies('token');
  const navigate = useNavigate();
  const {authState} = useContext(AuthContext);
  const tokenVal = jwtDecode(cookies.token);
  var owner = tokenVal.username;
  const name = tokenVal.name;
  const [todoItems, setTodoItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);
  const [taskValues, setTaskValues] = useState({
    title: '',
    desc: ''
  });
  
  const handleChange = (e) => {
    setTaskValues({
      ...taskValues,
      [e.target.name]: e.target.value 
    });
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await TodoService.get({ owner });
        setTodoItems(res.message.splice(0));
      } catch (err) {
        setError('Failed to load todos.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if(owner)
      fetchTodos();
    else navigate('/login')
  }, [owner]);

  const handleDelete = async (id) => {
    try{
      console.log(id)
      const res = await TodoService.delete({_id: id});
      console.log(res);
      setTodoItems(todoItems.filter((item) => item._id !== id));
    }catch(err){
      console.log(err);
    }
  }
  const handleItemChange = async (item) => {
    const x = {
      ...item
    };
    const obj = todoItems.map((i) => {
      if(item._id !== i._id)
        return i;
      else {
        return x;
      }
    });
    setTodoItems(obj);
    TodoService.update(item);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await TodoService.add({...taskValues, owner});
      console.log(res);
      setTodoItems([
        ...todoItems,
        res.message
      ]);
      setTaskValues({
        title: '',
        desc: ''
      });
    }catch(err){
      console.log(err);
    }
    setVisible(false);
  }

  const TodoItemList = React.memo(({ loading, error, todoItems }) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    navigate('/login');
    return <p>{error}</p>;
  }

  return todoItems.length ? (
    <div className="todo-list-container">
      {todoItems.map((item) => (
        <TodoCard key={item._id} itemOrig={item} handleDelete={() => handleDelete(item._id)} handleChanges={handleItemChange}/>
      ))}
    </div>
  ) : (
    <p>There is nothing here yet, click Add Items to add items.</p>
  );
});

  return (
    <main>
      <h1 id='greetings'>Hello {name}.</h1>
      <div id="todo-list">
        <div id="todo-header">
          <h2>Your Todos</h2>
          <button id='add-todo' onClick={() => setVisible(true)}>
            <svg className='svg' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_2497_26192)">
                <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 13.4876 3.36093 14.891 4 16.1272L3 21L7.8728 20C9.10904 20.6391 10.5124 21 12 21Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 9.00098V15.001" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 12.001H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
              <defs>
                <clipPath id="clip0_2497_26192">
                  <rect width="24" height="24" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
        <TodoItemList loading={loading} error={error} todoItems={todoItems} />
      </div>
      {visible && <AddTask setVisible={setVisible} onChange={handleChange} handleSubmit={handleSubmit} taskValues={taskValues}/>}
    </main>
  );
};

export default Content;
