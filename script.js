let inputText = document.querySelector('#inputToDo');
let enterButton = document.querySelector('#enter');
let toDoList = document.querySelector('#list');


function enterB() {
    let txt = inputText.value;
    let li = document.createElement('li')
    li.innerHTML= txt;
    li.contentEditable = "true";
    toDoList.insertBefore(li, toDoList.childNodes[0]);
    inputText.value = '';


}

function deleteAll() {
    // change to delete all checked children
    while (toDoList.firstChild) {
        toDoList.removeChild(toDoList.firstChild);
    }

}
toDoList.addEventListener('click', e=> {
    if (e.target.tagName == 'LI'){
        e.target.classList.toggle('checked');
    }

})
