import './App.css';
import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Button } from './components/Button';
import { InputBar } from './components/InputBar';
import { TaskList } from './components/TaskList';


function App() {
  
  const [currTask, setCurrTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [isDone, setIsDone] = useState([]);
  const [idsList, setIdList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('/api/tasks');
      const json = await response.json();
      if(response.ok){
        const tasksNames = json.map((task) => {
          return task.title;
        })
        setTaskList(tasksNames);

        const tasksIsDone = json.map((task) => {
          return task.isDone;
        })
        setIsDone(tasksIsDone);

        const taskIds = json.map((task) => {
          return task._id;
        })
        setIdList(taskIds);
      }
    }
    fetchTasks();
  }, [])


  function addTask() {
    const taskArr = taskList.slice();
    taskArr.push(currTask);
    const doneArr = [...isDone, false];
    doneArr.push(false);
    setTaskList(taskArr);
    setIsDone(doneArr);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const task = {title: currTask, isDone: 0};
    const jsonTask = JSON.stringify(task);
    const response = await fetch('/api/tasks', {
      method: 'POST',
      body: jsonTask,
      headers: {
        'Content-type': 'application/json'
      }
    });
    const json = await response.json();

    if(!response.ok){
      setError(json.error);
    }

    if (response.ok) {
      setError(null);
      setCurrTask('');

    }
  }

  return (
      <div className="App container">
        <Header />
        <div className='input-line'>
          <form onSubmit={handleSubmit}>
            <InputBar className='input' currTask={currTask} setCurrTask={setCurrTask}/>
            <Button type="submit" text="Add Task" handleClick={addTask}/>
          </form>
        </div>
        <TaskList taskList={taskList} setTaskList={setTaskList} 
        isDone={isDone} setIsDone={setIsDone} idsList={idsList} setIdsList={setIdList}/>
      </div>
  );
}

export default App;
