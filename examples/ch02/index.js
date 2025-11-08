const todos = [
    { description: 'Walk the dog', done: false },
    { description: 'Water the plants', done: false },
    { description: 'Sand the chairs', done: false },
];

const addTodoInput = document.getElementById('todo-input');
const addTodoButton = document.getElementById('add-btn');
const todoList = document.getElementById('todos-list');


addTodoButton.addEventListener("click", () => {
    addTodo();
})
addTodoInput.addEventListener("input", () => {
    addTodoButton.disabled = addTodoInput.value.length < 3;
} );

addTodoInput.addEventListener("keydown", ({key}) => {
    if (key === 'Enter' && addTodoInput.value.length > 3) {
        addTodo();
    }
});
 for(const todo of todos) {
     todoList.append(renderTodoInReadMode(todo));
 }

function renderTodoInEditMode(todo) {
    const li = document.createElement('li');
    const input = document.createElement('input') ;
    input.type = 'text';
    input.value = todo.description;
    li.append(input)
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.addEventListener('click', () => {
        const idx = todos.indexOf(todo);
        updateTodo(idx, input.value);
    })
    li.append(saveBtn)
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel'
    cancelBtn.addEventListener('click', () => {
        const idx = todos.indexOf(todo)
        todoList.replaceChild(
        renderTodoInReadMode(todo),
            todoList.childNodes[idx]
    )
    });

    li.append(cancelBtn)

    return li
 }


function addTodo() {
    const description = addTodoInput.value;
    const createdTodo ={description: description, done: false}
    todos.push(createdTodo);
    const todo = renderTodoInReadMode(createdTodo);
    todoList.append(todo);
    addTodoInput.value = '';
    addTodoButton.disabled = true;
}

function removeTodo(index) {
    todos.splice(index, 1);
    console.log(todoList.childNodes[index]);
    todoList.childNodes[index].remove();
}

function strikeTodo(index) {
    // const li = todoList.getElementsByTagName("li");
    todos[index].done = true;
    const updatedTodo = renderTodoInReadMode(todos[index]);
    todoList.replaceChild(updatedTodo, todoList.childNodes[index]);
}


function updateTodo(index, description) {
    todos[index].description = description
    const todo = renderTodoInReadMode(description)
    todoList.replaceChild(todo, todoList.childNodes[index])
}
function renderTodoInReadMode(todo) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.innerText = todo.description;
    if(todo.done) {
        span.classList.add('done');
    }
    if(!todo.done){
        span.addEventListener('dblclick', () => {
            const idx = todos.indexOf(todo);
            todoList.replaceChild(renderTodoInEditMode(todo),todoList.childNodes[idx]);
        });

    }
    li.append(span);
    if(!todo.done) {
        const button = document.createElement('button');
        button.textContent = "Done";
        button.addEventListener('click', () => {
            const idx = todos.indexOf(todo);
            strikeTodo(idx);
        })
        li.append(button);
    }
    return li;
 }