const addBtn = document.getElementById('addBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

addBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const li = document.createElement('li');
  li.innerHTML = `
    ${taskText}
    <button class="delete-btn">Delete</button>
  `;
  
  taskList.appendChild(li);
  taskInput.value = '';

  li.querySelector('.delete-btn').addEventListener('click', () => {
    taskList.removeChild(li);
  });
});
