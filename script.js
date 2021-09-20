let inputText = document.querySelector('#inputToDo');
let enterButton = document.querySelector('#enter');
let toDoList = document.querySelector('#list');

let uid = 0;

function enterB() {
    let txt = inputText.value;
    //let li = document.createElement('li');
    let checkButton = document.createElement('input');
    checkButton.type = 'checkbox';
    checkButton.id ="item" + uid;
    checkButton.className = "unchecked"

    // var checkbox = document.querySelector("input[name=checkbox]");

    checkButton.addEventListener('change', function() {
        if (this.checked) {
            this.className = "checked"
            document.getElementById("label"+this.id.slice(4)).className = "checked"

        } else {
            this.className = "unchecked"
            document.getElementById("label"+this.id.slice(4)).className = "unchecked"
        }
    });


    let lbl1 = document.createElement('label');
    lbl1.htmlFor = "item" + uid;
    lbl1.innerHTML = txt;
    lbl1.id = "label" + uid;
    lbl1.className = "unchecked";
    lbl1.contentEditable = "true";



    toDoList.insertBefore(lbl1, toDoList.childNodes[0]);
    lbl1.insertAdjacentElement("afterend",checkButton)

    inputText.value = '';
    uid++;

}



function deleteAll() {
    // change to delete all checked children
    // for (let i = 0; i < toDoList.childNodes.length; i++) {
    //     if (toDoList.childNodes[i].className === 'checked') {
    //         toDoList.removeChild(toDoList.childNodes[i+1]);
    //         toDoList.removeChild(toDoList.childNodes[i]);
    //         i+=2;
    //     }
    //
    //
    // }

    for (let child of toDoList.childNodes) {
        console.log(child)
        if (child.className === 'checked') {
            toDoList.removeChild(child)
        }
    }
    // while (toDoList.firstChild) {
    //     toDoList.removeChild(toDoList.firstChild);
    // }

}
//
// document.getElementById("list").addEventListener("click", function(e) {
//     if (e.target && e.target.matches("unchecked")) {
//         console.log("we reached here")
//     }
// })


// toDoList.addEventListener('click', e=> {
//     if (e.target.name == 'input'){
//         e.target.classList.toggle('checked');
//         console.log('hello there')
//     }
//
// })
