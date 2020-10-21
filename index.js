window.addEventListener('load', () => {
  'use strict';
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const taskManager = document.querySelector('.task-manager');
  const buttonAdd = document.querySelector('.button-add');
  const buttonClear = document.querySelector('.button-clear');
  const textField = document.querySelector('.text-filed');
  let taskList = document.querySelector('.task-list');
  let number = 0;

  const buttonClickEvent = (e) => {
    if (e.type === 'keypress' && e.keyCode !== 13) return null;
    if (textField.value) {
      const li = document.createElement('li');
      const liClone = {};
      li.number = number++;
      li.innerText = textField.value;
      liClone.text = textField.value;
      liClone.done = false;
      taskList.appendChild(li);
      tasks.push(liClone);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      textField.value = '';
      textField.placeholder = '';
    }
  };

  function liEventListener(e) {
    const targetLi = e.target;
    if (targetLi.localName === 'li') {
      tasks[targetLi.number].done = targetLi.classList.toggle('done');
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  if (tasks.length) textField.placeholder = '';
  const fragment = document.createDocumentFragment('div');
  tasks.forEach( item => {
    const li  = document.createElement('li');
    li.innerText = item.text;
    li.number = number++;
    if (item.done) li.classList.add('done');
    fragment.appendChild(li);
  });
  taskList.appendChild(fragment);


  buttonAdd.addEventListener('click', buttonClickEvent);
  window.addEventListener('keypress', buttonClickEvent);

  buttonClear.addEventListener('click', () => {
    taskList.removeEventListener('mousedown', liEventListener);
    taskManager.removeChild(taskList);
    taskList = document.createElement('ol');
    taskList.addEventListener('mousedown', liEventListener);
    taskList.classList.add('task-list');
    taskManager.insertBefore(taskList, taskManager.firstChild);
    localStorage.clear();
    tasks = [];
    textField.value = '';
    textField.placeholder = 'Привет, напиши свое первое задание :)';
  });

  taskList.addEventListener('mousedown', liEventListener);
});
