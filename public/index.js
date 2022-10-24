"use strict";
// Elementos html
const form = document.getElementById('form');
const tasksContainer = document.getElementById('tasksContainer');
// Armazenamento local
let dados = localStorage.getItem('todoTask');
let allTasks;
if (dados) {
    allTasks = JSON.parse(dados);
}
else {
    allTasks = [];
}
// EVENTOS
form.addEventListener('submit', e => {
    e.preventDefault();
    // Pegando os dados do input
    const inputValue = document.getElementById('inputValue');
    // Validando os dados
    if (!inputValue.value)
        return;
    // Cria um objeto para uma nova tarefa, e o retorna
    const task = createTasks(inputValue.value);
    // Adicionando uma nova tarefa a um array com todas as tarefas
    addTasks(task);
    // Renderizando todas as tarefas em um html template
    renderTasks(allTasks);
    // Debug
    console.log(allTasks);
});
tasksContainer.addEventListener('click', e => {
    let target = e.target;
    if (!target || !target.dataset.id)
        return;
    let id = parseInt(target.dataset.id);
    editTasks(id);
    // debug
    console.log(allTasks);
});
// FUNÇÕES
// cria uma nova tarefa em formato de objeto
function createTasks(newTask) {
    const taskObject = {
        id: 0,
        tasks: '',
        completed: false
    };
    taskObject.tasks = newTask;
    taskObject.id = generateId();
    taskObject.completed = false;
    return taskObject;
}
function addTasks(task) {
    allTasks.push(task);
    localStorage.setItem('todoTask', JSON.stringify(allTasks));
}
// modifica uma tarefa especifica (para dizer se foi completada ou nao)
function editTasks(identificador) {
    allTasks.forEach(task => {
        if (task.id == identificador) {
            task.completed = !task.completed;
        }
    });
    // adiciona a mudanca no armazenamento local
    localStorage.setItem('todoTask', JSON.stringify(allTasks));
}
// cria templates html das tarefas existentes
function renderTasks(allTasks) {
    let htmlTemplate = '';
    // dataset e nome da tarefa
    for (let i = 0; i < allTasks.length; i++) {
        htmlTemplate += `<li>
                            ${allTasks[i].tasks}
                            <input type="checkbox" ${allTasks[i].completed ? 'checked' : ''} data-id=${allTasks[i].id}>
                        </li>`;
    }
    tasksContainer.innerHTML = htmlTemplate;
}
// gera um ID "unico" para cada tarefa
function generateId() {
    const id = new Date().getTime();
    return id;
}
// Init
renderTasks(allTasks);
