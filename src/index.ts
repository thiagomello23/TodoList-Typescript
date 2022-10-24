
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

})

tasksContainer.addEventListener('click', e => {

    // Pega o target que o usuario clicou
    let target = e.target as HTMLInputElement|null;

    // Valida se nao e nulo
    if(!target) return;

    // Caso o usuario tenha clicado no icone de delete
    if(target.classList.contains('task-delete')) {
        const id = target.dataset.index;

        if(!id) return;

        // Deleta o dado da tarefa e renderiza todas as tarefas
        deleteTask(parseInt(id));
        renderTasks(allTasks);
    }

    // Caso o usuario tenha clicado na checkbox
    if(target.dataset.id) {
        let id = parseInt(target.dataset.id);

        // Edita a tarefa (se foi completada ou nao) e renderiza todas as tarefas
        editTasks(id);
        renderTasks(allTasks);
    };

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

// Adiciona uma nova tarefa a um array global chamado "allTasks"
function addTasks(task: typeTaskObject) {

    allTasks.push(task);

    // Faz armazenamento local
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

// Deleta uma tarefa
function deleteTask(id: number) {
    
    // Cria um novo array sem a tarefa deletada
    const attTask = allTasks.filter( task => {
        if(task.id != id) return task;
    })

    // Repassa o array para o array principal
    allTasks = attTask;

    // Salva as modificacoes de maneira local
    localStorage.setItem('todoTask', JSON.stringify(allTasks));

}

// cria templates html das tarefas existentes
function renderTasks(allTasks: (typeTaskObject)[]) {

    let htmlTemplate:string = '';

    // dataset e nome da tarefa
    for(let i = 0; i < allTasks.length; i++) {
                            // Caso a tarefa tenha sido completada, ela ganha a class "task-completed"
        htmlTemplate += `<li ${allTasks[i].completed ? 'class="task-completed"' : ''}>
                            ${allTasks[i].tasks}
                            <div class="task-options">
                                <input type="checkbox" ${allTasks[i].completed ? 'checked' : ''} data-id=${allTasks[i].id}>
                                <i class="fa-solid fa-trash task-delete" data-index=${allTasks[i].id}></i>
                            </div>
                        </li>`
    }

    // Renderiza no html
    tasksContainer.innerHTML = htmlTemplate;

}

// gera um ID "unico" para cada tarefa
function generateId(): number {

    const id: number = new Date().getTime();

    return id;

}

// Init
renderTasks(allTasks);
