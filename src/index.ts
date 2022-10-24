
// Elementos html
const form = document.getElementById('form') as HTMLFormElement;
const tasksContainer = document.getElementById('tasksContainer') as HTMLUListElement;

// Data object interface
interface typeTaskObject {
    id: number,
    tasks: string,
    completed: boolean
}

// Armazenamento local
let dados = localStorage.getItem('todoTask');
let allTasks: (typeTaskObject)[];

if(dados) {
    allTasks = JSON.parse(dados);
} else {
    allTasks = []
}

// EVENTOS
form.addEventListener('submit', e => {

    e.preventDefault();

    // Pegando os dados do input
    const inputValue = document.getElementById('inputValue') as HTMLInputElement;
    
    // Validando os dados
    if(!inputValue.value) return;

    // Cria um objeto para uma nova tarefa, e o retorna
    const task = createTasks(inputValue.value);

    // Adicionando uma nova tarefa a um array com todas as tarefas
    addTasks(task);

    // Renderizando todas as tarefas em um html template
    renderTasks(allTasks);

    // Debug
    console.log(allTasks);

})

tasksContainer.addEventListener('click', e => {

    let target = e.target as HTMLInputElement|null;

    if(!target || !target.dataset.id) return;

    let id = parseInt(target.dataset.id);

    editTasks(id);

    // debug
    console.log(allTasks);

})

// FUNÇÕES
// cria uma nova tarefa em formato de objeto
function createTasks(newTask: string): typeTaskObject {

    const taskObject: typeTaskObject = {
        id: 0,
        tasks: '',
        completed: false
    }

    taskObject.tasks = newTask;
    taskObject.id = generateId();
    taskObject.completed = false;

    return taskObject;

}

function addTasks(task: typeTaskObject) {

    allTasks.push(task);
    localStorage.setItem('todoTask', JSON.stringify(allTasks));

}

// modifica uma tarefa especifica (para dizer se foi completada ou nao)
function editTasks(identificador: number) {

    allTasks.forEach( task => {

        if(task.id == identificador) {
            task.completed = !task.completed;
        }

    });

    // adiciona a mudanca no armazenamento local
    localStorage.setItem('todoTask', JSON.stringify(allTasks));

}

// cria templates html das tarefas existentes
function renderTasks(allTasks: (typeTaskObject)[]) {

    let htmlTemplate:string = '';

    // dataset e nome da tarefa
    for(let i = 0; i < allTasks.length; i++) {
        htmlTemplate += `<li>
                            ${allTasks[i].tasks}
                            <input type="checkbox" ${allTasks[i].completed ? 'checked' : ''} data-id=${allTasks[i].id}>
                        </li>`
    }

    tasksContainer.innerHTML = htmlTemplate;

}

// gera um ID "unico" para cada tarefa
function generateId(): number {

    const id: number = new Date().getTime();

    return id;

}

// Init
renderTasks(allTasks);