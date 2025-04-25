const express =  require("express")
const app  = express();
const PORT = 3001;
app.get("/",(req,res)=>{
    res.send("Welcome to Homework API")
})

  app.get("/intro",(req,res)=>{
    res.send("I am chen fengfan, my dream is to become a mature person and a capble person")
  })

  app.get("/name",(req,res)=>{
    res.send("Fengfan chen")
  })

  app.get("/hobbies",(req,res)=>{
    const hobby = ["coding", "reading", "cycling"]
    res.json(hobby)
    
  })
 

  app.get("/food",(req,res)=>{
    res.send("western food")
  })

  app.get("/student",(req,res)=>{
    const student = {
        "name": "Alex",
        "hobbies": ["coding", "reading", "cycling"],
        "intro": "Hi, I'm Alex, a Year 2 student passionate about building APIs!"
      }
    
    res.json(student)
  })
  app.get("/studet",(req,res)=>{
    const student_data = req["name"]
    alert("Hi! I am "+ student_data)
  })
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });


