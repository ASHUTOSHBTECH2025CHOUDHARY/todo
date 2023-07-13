const path=require('path');
const express=require('express');
const port=4444;
const {v4:uuidv4} =require('uuid')
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

let todos=[]

app.get("/gettodos",(req,res,next)=>{
    res.send(todos);
})

app.post("/addtodos",(req,res)=>{
    let name =req.body.name;
    // console.log(req.body.name)
    // console.log(name)
    todos.push({
        id:uuidv4(),
        name
    })
    res.redirect('/gettodos')
})

app.post("/deletetodos",(req,res)=>{
    const {id}=req.body;

    todos=todos.filter((task)=>{
        if(task.id===id) return false

        return true
    })
    res.redirect('/gettodos')
})
app.post("/increasing",(req,res)=>{
    const {id}=req.body;
    let index;
    todos.forEach((element,i) => {
        if(element.id===id){
            index=i;
        }
    });
    let todo=todos[index];
    todos[index]=todos[index-1];
    todos[index-1]=todo;
    res.redirect('/gettodos')
})
app.post("/decreasing",(req,res)=>{
    const {id}=req.body;
    let index;
    todos.forEach((element,i) => {
        if(element.id===id){
            index=i;
        }
    });
    let todo=todos[index];
    todos[index]=todos[index+1];
    todos[index+1]=todo;
    res.redirect('/gettodos')
})
app.listen(port,()=>{
    console.log(`https://localhost:${port}`)
})