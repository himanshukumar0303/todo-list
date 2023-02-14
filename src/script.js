var addTxt = document.getElementById('addText');
var addBtn = document.getElementById('addBtn');
var container=document.getElementById('list-box');
var listItem = document.getElementsByClassName('list-item');
var deleteAllBtn=document.getElementById('deleteAll');
var cmpltBtn = document.getElementsByClassName('cmpltBtn');
var dltBtn = document.getElementsByClassName('dltBtn');
var text = document.getElementsByClassName('text');
var noto = document.getElementById('showNoto');

// add button function

function addTask(){
   
    let task=localStorage.getItem('task');
    if(task==null){
        var tasks=[];
    }
    else{
        tasks=JSON.parse(task);
    }
    let addValue=addTxt.value;
    if(addValue==""){
        return console.error(error);
    }
    tasks.push(addValue);

    localStorage.setItem('task',JSON.stringify(tasks));
    addTxt.value="";

    showContent();
   
}

// show content function

function showContent(){

    let task=localStorage.getItem('task');
    if(task==null){
        var tasks=[];
    }
    else{
        tasks=JSON.parse(task);
    }
    container.innerHTML="";
    
    tasks.forEach((element ,index)=> {
        var items=createTask(element,index);
        container.appendChild(items);
        let hr=document.createElement('hr');
        container.appendChild(hr);
    });
    
}

// create task function

function createTask(task,index){
    var div=document.createElement('div');
    div.setAttribute('class','list-item');

    var checkBox=document.createElement('input');
    checkBox.type="checkbox";

    var para=document.createElement('p');
    para.setAttribute('class','text');
    para.innerHTML=task;

    var completeBtn=document.createElement('button');
    completeBtn.setAttribute('class','cmpltBtn');
    completeBtn.setAttribute("onclick","editTask("+index+")");
    completeBtn.innerHTML="Edit Task";

    var deleteBtn=document.createElement('button');
    deleteBtn.setAttribute('class','dltBtn');
    deleteBtn.setAttribute("onclick","deleteBtn("+index+")");
    deleteBtn.innerHTML="Delete Task";

    div.appendChild(checkBox);
    div.appendChild(para);
    div.appendChild(completeBtn);
    div.appendChild(deleteBtn);
    return div;

}


addBtn.addEventListener('click',addTask);

// edit task function

function editTask(index){
    let saveText=document.getElementById('saveText');
    let saveBtn=document.getElementById('saveBtn');

    let task=localStorage.getItem('task');
    tasks=JSON.parse(task);

    saveText.value=index;
    addTxt.value=tasks[index];

    saveBtn.style.display="inline-block";
    addBtn.style.display="none";
}

// save button function

function saveTask(){
    let saveIndex=document.getElementById('saveText').value;
    let task=localStorage.getItem('task');
    tasks=JSON.parse(task);
    tasks[saveIndex]=addTxt.value;
    localStorage.setItem('task',JSON.stringify(tasks));
    saveBtn.style.display="none";
    addBtn.style.display="inline-block";
    addTxt.value="";
    showContent(); 
}

document.getElementById('saveBtn').addEventListener('click',saveTask);

// delete button function

function deleteBtn(index){
    let task=localStorage.getItem('task');
    tasks=JSON.parse(task);
    tasks.splice(index,1);
    localStorage.setItem('task',JSON.stringify(tasks));
    showContent();
}

// delete all button 

deleteAllBtn.addEventListener('click',function(){
    let task=localStorage.getItem('task');
    if(task==null){
        var tasks=[];
    }
    else{
        tasks=JSON.parse(task);
        tasks=[];
    }
    localStorage.setItem('task',JSON.stringify(tasks));
    saveBtn.style.display="none";
    addBtn.style.display="inline-block";
    showContent();
});


//enter functionalliy

addTxt.addEventListener('keydown',function(e){
    if(event.key === 'Enter'){
        addTask()
    }
});

function handlerEvent(e){
    var txt=e.target.parentElement;
    if(e.target.checked){
        txt.style.textDecoration="line-through";
    }
    else{
        txt.style.textDecoration="none";
    }
}

document.addEventListener('click',handlerEvent);

//initialize content
showContent();