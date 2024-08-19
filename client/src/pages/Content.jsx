import React, { useState, useEffect } from 'react';
import TodoService from '../services/TodoServices';
import TodoCard from '../components/TodoCard';
import AddTask from '../components/AddTask';

const Content = ({ }) => {
  const owner = 'miamimagna';
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

    fetchTodos();
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
      const res = await TodoService.add({...taskValues});
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
      <h1 id='greetings'>Hello {owner}.</h1>
      <div id="todo-list">
        <div id="todo-header">
          <h2>Your Todos</h2>
          <button id='add-todo' onClick={() => setVisible(true)}>Add Todo</button>
        </div>
        <TodoItemList loading={loading} error={error} todoItems={todoItems} />
      </div>
      {visible && <AddTask setVisible={setVisible} onChange={handleChange} handleSubmit={handleSubmit} taskValues={taskValues}/>}
    </main>
  );
};

export default Content;
