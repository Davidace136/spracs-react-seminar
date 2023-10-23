import React, { useState } from 'react';

import './App.css';

function App() {
  

  const handleNewTask = () => {

    if (!taskTitle) {
      alert('제목 넣어라');
      
    } else{
      let task = {
        id: Date.now(), //난수 생성 하기는 좀 귀찮아서 겹칠 수 없다는 전제 하에 ㅎㅎ
        title: taskTitle,
        importance: taskImportance,
        content: taskContent,
        deadline: taskDeadline,
      };
  
      setTasks([...tasks, task]);
      setTaskTitle('');
      setTaskContent('');
      setTaskDeadline('');
      // setTaskImportance(''); //일단 새로운 포스트를 등록할 차례라도 그 전 중요도는 유지하는 쪽으로 했어영
    }

  };

  const [tasks, setTasks] = useState([]);

  const [taskTitle, setTaskTitle] = useState('');

  const [taskContent, setTaskContent] = useState('');

  const [taskDeadline, setTaskDeadline] = useState('');

  const [taskImportance, setTaskImportance] = useState('높음'); 

  const [filter, setFilter] = useState('all');

  const handleRemoveTask = (taskId) => {
    const tasksAfterRemoval = tasks.filter((task) => task.id !== taskId);
    setTasks(tasksAfterRemoval);
  };

  const handleNewFilter = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') {
      return true;
    }
    return task.importance === filter;
  });

  const filterButtonClassName = (thisFilterName) => {
    if(thisFilterName === filter){
      return 'active';
    } else{
      return '';
    }
  }

  return (
    <div className="App">
      <h1>My Todo List</h1>
      <div className='input-div'>
        <input className='input-title'
          type="text"
          value={taskTitle}
          onChange={(newTitle) => setTaskTitle(newTitle.target.value)}
          placeholder="제목 요기"
        />
        <textarea className='input-content'
          rows={4}
          height={4}
          type="text"
          value={taskContent}
          onChange={(newContent) => setTaskContent(newContent.target.value)}
          placeholder="내용 요기"
        />
        <input className='input-deadline'
          type="text"
          value={taskDeadline}
          onChange={(newDeadline) => setTaskDeadline(newDeadline.target.value)}
          placeholder="기한 요기"
        />
        <div onChange={(onChangeValue) => setTaskImportance(onChangeValue.target.value)}>
          <input type="radio" value="높음" name="Importance" defaultChecked='true'/>높은 중요도
          <input type="radio" value="중간" name="Importance"/>중간 중요도
          <input type="radio" value="낮음" name="Importance"/>낮은 중요도
        </div>
        <button onClick={handleNewTask}>할 일 추가</button>
      </div>
      
      <div className="filter-buttons">
        <button
          className={filterButtonClassName('all')}
          onClick={() => handleNewFilter('all')}
        >
          전체
        </button>
        <button
          className={filterButtonClassName('높음')}
          onClick={() => handleNewFilter('높음')}
        >
          높음
        </button>
        <button
          className={filterButtonClassName('중간')}
          onClick={() => handleNewFilter('중간')}
        >
          중간
        </button>
        <button
          className={filterButtonClassName('낮음')}
          onClick={() => handleNewFilter('낮음')}
        >
          낮음
        </button>
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <div className='list-inner-div'>
              <h3>{task.title}</h3>
              <p>중요도 - {task.importance}</p>
              <p>기한 - {task.deadline}</p>
              <button onClick={() => handleRemoveTask(task.id)}>다했당 ㅎㅎ</button>
            </div>
            <p>{task.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;