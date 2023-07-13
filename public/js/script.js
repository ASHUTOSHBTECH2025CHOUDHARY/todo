const addtask=document.querySelector('#addtask')
const newtask=document.querySelector('#newtask')
const tasklist=document.querySelector('#tasklekh')

function addtodom(todos){
    tasklist.innerText  ='';
    todos.forEach((element,index) => {
       let li=document.createElement('li');
       li.innerHTML=`
       <span id="div2">${element.name}</span>
       <span id="div1">
       <button atrid=${element.id} class="upbtn">⬆️</button>
       <button atrid=${element.id} class="deletbtn">🗑️</button>
       <button atrid=${element.id} class="dwtbtn">⬇️</button>
       </span>`;
       tasklist.append(li)
    });
    
    console.log(todos)
}
// function addtodom1(todos,id){
//     tasklist.innerText  ='';
//     todos.forEach(element => {
//        if(element.id!==id){
//         let li=document.createElement('li');
//        li.innerHTML=`
//        <span>${element.name}</span>
//        <button atrid=${element.id} class="upbtn">⬆️</button>
//        <button atrid=${element.id} class="deletbtn">🗑️</button>
//        <button atrid=${element.id} class="dwtbtn">⬇️</button>`;
//        tasklist.append(li)
//     }
//     });
//     console.log(todos)
// }
addtask.addEventListener('click',(ev)=>{
    ev.preventDefault();
    // console.log('tried to add task')
    axios.post('/addtodos',{
        name:newtask.value
    }).
    then((res)=>{
        let todos=res.data;
        // console.log(todos);
        newtask.value=''
        addtodom(todos);
    })
    .catch((err)=>{
        console.log(err);
    })
})

axios.get('/gettodos').then((res)=>{
    let todos=res.data;
    addtodom(todos)
}).catch((err)=>{
    console.log(err)
})

tasklist.addEventListener('click',(ev)=>{
    let atrid=ev.target.getAttribute('atrid');
    let btnclass=ev.target.className;
    if(btnclass==='deletbtn'){
        
        axios.post('/deletetodos',{
            id:atrid
        }).then((res)=>{
            let todos=res.data;
            addtodom(todos);
        }).catch((err)=>{
            console.log(err);
        })
    }
    else if(btnclass==='upbtn'){
        axios.post('/increasing',{
            id:atrid
        }).then((res)=>{
            let todos=res.data;
            addtodom(todos)
        }).catch((err)=>{
            console.log(err)
        })
    }
    else{
        axios.post('/decreasing',{
            id:atrid
        }).then((res)=>{
            let todos=res.data;
            addtodom(todos)
        }).catch((err)=>{
            console.log(err)
        })
    }
})