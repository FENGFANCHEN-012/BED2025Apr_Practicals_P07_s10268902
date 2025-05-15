const express = require("express");
const sql = require("mssql"); // Assuming you've installed mssql
const dbConfig = require("./dbConfig");



const app = express();
const port = process.env.PORT || 3000; // Use environment variable or default port

app.use(express.json()); // middleware inbuilt in express to recognize the incoming Request Object as a JSON Object.
app.use(express.urlencoded()); // middleware inbuilt in express to recognize the incoming Request Object as strings or arrays



app.get("/student",async (req,res)=>{
    let connection
    connection =  await sql.connect(dbConfig)
    const request = connection.request();
    const result =await request.query(`SELECT * FROM Students`)
    res.json(result.recordset)
    res.send("All student information gotten")
    
})

app.get("/student/:Student_id",async(req,res)=>{
    let connection
    connection = await  sql.connect(dbConfig)
    const request = connection.request();
    const id  = req.params.Student_id
    const result = await request.query(`SELECT * FROM students WHERE Student_id = ${id}`)
   
   res.json(result.recordset)
  
})
try{
app.post("/student", async (req,res)=>{
  
    let connection
     const student_info = req.body
    connection =  await sql.connect(dbConfig)
    const request = connection.request();
    const {name,address} = req.body
    
    request.input("name",sql.NVarChar,name)
    request.input("address",sql.NVarChar,student_info.address)
     const sqlQuery = `INSERT INTO Students (name, address) VALUES (@name,@address); SELECT SCOPE_IDENTITY() AS studnet_id;`;
    const result = await request.query(sqlQuery)
      const newStudentId = result.recordset[0].student_id;
        res.status(201).json({
            message: "Student added successfully",
            student_id: newStudentId,
            name,
            address
        });
        if(res.status(404)){
          res.send("404 not found")
        }
        else if (req.status(500)){
          res.send("Internal server error")
        }
})

}
catch(error){
  console.log("error occurs"+error)
}

  


try{
app.put("/student/:student_id",async (req,res)=>{
       let connection;
       const sending = req.body
     const {name,address}  = req.body
        const studentId = req.params.student_id;
       connection = await sql.connect(dbConfig);
       const request = connection.request();
      
        request.input("name",sql.NVarChar,sending.name)
         request.input("student_id", sql.Int, studentId);
        request.input("address",sql.NVarChar,sending.address)
         const sqlquery = `UPDATE Students SET name = @name,address =@address  WHERE student_id = @student_id;`
      const result =  await request.query(sqlquery)
      
    
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: `Student with ID ${student_id} not found` });
        }
      else if(res.status(400)){
        return res.status(400).json("request format error try again")
      }
      else if(res.status(500)){
        return res.status(500).json("internal error")
        
      }
      else{
        return res.status(200).json("change succeeds")
      }
     

})
}
catch(error){
  res.send("error occur")
}

try{
  app.delete("/student/:id",async(req,res)=>{
    let connection;
    const student_id = req.params.id
    connection = await sql.connect(dbConfig);
    const request = connection.request();
    request.input("student_id",sql.Int,student_id)


    const result = await request.query(`DELETE FROM Students WHERE student_id = @student_id`)
    
   

  // validation
  if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: `Student with ID ${student_id} not found` });
        }
    else if(res.status(204)){
      return res.status(204).json("No content")
    }
      
        else if(res.status(500)){
          return res.status(500).json("internal error")
        }
        else{
           res.send("student "+student_id+" has been delete from database")
        }

  })
}
catch(error){
  res.json("error occur"+error)
}
app.listen(port, async () => {
  try {
    // Connect to the database
    await sql.connect(dbConfig);
    console.log("Database connection established successfully");
  } catch (err) {
    console.error("Database connection error:", err);
    // Terminate the application with an error code (optional)
    process.exit(1); // Exit with code 1 indicating an error
}})












app.listen(port, async () => {
  try {
    // Connect to the database
    await sql.connect(dbConfig);
    console.log("Database connection established successfully");
  } catch (err) {
    console.error("Database connection error:", err);
    // Terminate the application with an error code (optional)
    process.exit(1); // Exit with code 1 indicating an error
  }})