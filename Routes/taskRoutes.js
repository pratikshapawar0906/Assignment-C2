const express=require('express')
const router=express.Router();

let tasks=[];
let taskId=1;

//Validation middleware
function validateTask(req,res,next){
    const{title, description}=req.body;
    if(!title, description){
        return( res.status(400).json({ error:" Title and description are required"}))
    }
    next();

}

//Get 
router.get('/',(req,res)=>{
    let result=[...tasks];

    //sorting
    if(req.query.sort==='asc'){
        result.sort((a,b)=>a.id-b.id);
    } else if(req.query.sort==="desc"){
        result.sort((a,b)=>b.id-a.id)
    }


//pagination
const page=parseInt(req.query.page)|| 1;
const limit =parseInt(req.query.limit)|| result.length;
const start=(page-1)*limit;
const paginated= result.slice(start, start+limit)

res.json(paginated)
})

// Get task/:id
router.get('/:id',(req,res ) =>{
    const task=tasks.find (t=>t.id===parseInt(req.params.id))
    if(!task) return res.status(404).json({ error:'Task not found'})
        res.json(task);
})

//post /tasks
router.post('/', validateTask,(req,res)=>{
    const {title,description}=req.body;
    const newtaks={id:taskId++, title,description}
    tasks.push(newtaks)
    res.status(201).json(newtaks)
})

//put /task/:id
router.put('/:id',validateTask,(req,res)=>{
  const task=tasks.find(t=>t.id===parseInt(req.params.id))
  if(!task) return res.status(404).json({ error:'Task not found'})
    task.title=req.body.title;
    task.description=req.body.description;
    res.json(task);
})

//delete /tasks/:id
router.delete('/:id',(req,res)=>{
    const index=tasks.findIndex(t=>t.id===parseInt(req.params.id))
    if(index=== -1) return res.status(404).json({ error:'task not found'})

    tasks.splice(index,1);
    res.status(204).send()
})
module.exports=router