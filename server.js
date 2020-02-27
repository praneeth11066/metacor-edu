const exp=require("express")

const app=exp();
//to access data from excel and middleware
const multer=require('multer');
const xlsxtojson=require("xlsx-to-json-lc");
const xlstojson=require("xls-to-json-lc");

var mc=require('mongodb').MongoClient

//to nodemailer
const nodemailer=require('nodemailer')

    


// path
const path=require("path")

app.use(exp.static(path.join(__dirname,'/dist/Metacor')))

const url="mongodb://praneeth:praneeth@cluster0-shard-00-00-zvree.mongodb.net:27017,cluster0-shard-00-01-zvree.mongodb.net:27017,cluster0-shard-00-02-zvree.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";
var dbo;

var bp=require('body-parser')

app.use(bp.json());
mc.connect(url,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>{
    if(err)
    {
        console.log("err db in connection",err)
    }
    else
    {
        dbo=client.db("studentsdata");
        console.log("DataBase connected")                                            
    }
})



app.get('/readAll/:gbranch',(req,res)=>{
    //console.log(req.params);
    
    dbo.collection("studentdetails").find({gbranch:req.params.gbranch}).toArray((err,data)=>
    {
if(err)
{
   console.log("err is reading",err)
}
  else if(data==null)
  {
    //   res.send({message:"no data found"})
    console.log("data is empty");
    
  }  
else
{
    //console.log(data);
    
   res.send({message:data})
}
})
    })

//update registration form
app.put('/update',(req,res)=>
{
    console.log(req.body);

dbo.collection("studentdetails").updateOne({phonenumber:req.body.phonenumber},{$set:req.body},(err,success)=>{
    if(err)
    {
        console.log("err is update",err)
    }
    else {
        res.send({message:"success"})
    }
});
    
})

//delete registration form

app.delete('/remove/:phonenumber',(req,res)=>
    {
        console.log(req.params);
        var no=(req.params.phonenumber);
        dbo.collection("studentdetails").deleteOne({phonenumber:no},(error,success)=>
        {
            if(error)
            {
                console.log("error occured in delete",error)
            }
            else
            {
               
                dbo.collection("studentdetails").find().toArray((error,data)=>{
                    if(error)
                    {
                        console.log(error);
                        
                    }
                    else{
                        console.log(data);
                        
                        res.json({"message":"success","data":data})
                    }
                })
            }
        })
    })

    
//generateid read data
    app.get('/readid',(req,res)=>{
       // console.log(req.params);
        dbo.collection("studentid").find().toArray((err,data)=>
    {
if(err)
{
   console.log("err is reading",err)
}
  else if(data==null)
  {
      res.send({message:"no data found"})
    console.log("1.data is empty ");
    
  }  
else
{
    console.log("2.gid",data);
    
   res.send({message:data})
}
})
    })
    
   

//generateid save data request handler
    app.post('/saveid',(req,res)=>{
        console.log("requset to save",req.body);
        dbo.collection("studentid").find({gyear:req.body.gyear,gbranch:req.body.gbranch}).toArray((error,data)=>{
             console.log("data length is",data.length);
            if(error)
            {
                console.log("error in finding",error)
            }
            else if(data.length<1)
            {
             dbo.collection("studentid").insertOne(req.body,(err,success)=>{
            if(err)
                {
                    console.log("err is data",err)
                }
                else {
                        res.send({message:"successful"})
                    }
                })
            }
    else{
        res.send({message:"id generated already"})
    }

    })
    })

//read by year
    app.post('/readbyyear',(req,res)=>{
        console.log(req.body);
        yr=(+req.body.gyear); 
        dbo.collection("studentdetails").find({gyear:yr,gbranch:req.body.gbranch}).toArray((err,data)=>{
            if(err){
                console.log("err in reading",err)
            }
            else if(data==null)
            {
                res.send("nodatafound")
            }
            else{
                console.log("data is",data);
                res.send({message:data})
            }

        })
    })


//register student handler (post)

app.use(exp.json());
app.post('/save',(request,response)=>{
    console.log(request.body);
   
 dbo.collection("studentid").find({gyear:request.body.gyear,gbranch:request.body.gbranch}).toArray((error,res)=>{
    // console.log(result);
    let result=res[0]
    console.log(result);
    
    if(error){
         console.log("error in finding",error)
     }
     else if(result.length==0)
     {
        response.send({message:"studentid first"})
     }
     else{
        gyear=JSON.stringify(result.gyear);
        yearcode=gyear.split("");
        //console.log(gyear);
        console.log(result.gbranch)
        gbranch=result.gbranch;
        //console.log(gbranch);
        ye=yearcode[2]+yearcode[3];
        
        id=(ye+gbranch+result.code)
        console.log("id is",id);
        let ct=++result.count;
         if(result.count<=9){
            request.body.studentid=id+"00"+ct;
            request.body.password=id+"00"+ct
            console.log(request.body.studentid);
            console.log(request.body.password);
         }
         else if(result.count<=99)
         {
            request.body.studentid=id+"0"+ct ;
            request.body.password=id+"0"+ct
            console.log(request.body.studentid);
            console.log(request.body.password);
         }
         else{
            request.body.studentid=id+ct
            request.body.password=id+ct
            console.log(request.body.studentid);
            console.log(request.body.password);
            
            
         }
         dbo.collection("studentdetails").insertOne(request.body,(error,success)=>{
             console.log(request.body);
            if(error){
                console.log("error in insert",error)
            }
            else{
                dbo.collection("studentid").updateOne({gyear:request.body.gyear,gbranch:request.body.gbranch},
                    {$set:{count:ct}},(error,suc)=>{
                        if(error){
                            console.log("error in update",error);
                            
                        }
                        else{
                            const transport = nodemailer.createTransport({
                            
                                service: 'gmail',
                                
                                auth: {
                                    user: 'praneethreddy11066@gmail.com',
                                    pass: 'vini@bro',
                                }

                            });
                            const mailOptions = {
                                from: '"praneeth" <praneethreddy11066@gmail.com>',
                                to: `email:${request.body.email}`,

                        text: `username and password :${request.body.studentid}`
                        };
                        transport.sendMail(mailOptions, (error, info) =>{
                            if (error) {
                                console.log(error);
                            }
                            console.log(`message send: ${info}`);
                            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                            response.send({message:"email sent"})
                        });
                        }
                    })
               
            }
        }) 
     }
 })
 
})

//placement details

//multers disk storage settings
var storage =multer.diskStorage({destination:function (req, file, cb) {cb(null, './placement/') },   
 filename: function (req, file, cb) {       
 var datetimestamp = Date.now();       
 cb(null, `${new Date().getTime()}_${file.originalname}`) 
 }
});
// upload middleware
const upload=multer({ storage: storage});
// convert excel to json route
app.post("/uploadplacement",upload.single('placement'),(req,res)=>{    
    if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx')
    {        
    exceltojson = xlsxtojson;   
    } 
else {        exceltojson = xlstojson;   
 }    
try {       
     exceltojson({            
    input: req.file.path, //the same path where we uploaded our file           
     output: null, //since we don't need output.json           
 lowerCaseHeaders:true }, 
function(err,result){            
    if(err) {               
     return res.json({error_code:1,err_desc:err, data: null}); 
    }           
 dbo.collection("placements").insertMany(result, (err, data) => {              
    console.log(data);              
res.json({"message":"placement Sheet uploaded successfully"});  
 });  
});   
 } 
catch (e){        
    res.json({error_code:1,err_desc:"Corupted excel file"}); 
}
});



app.get('/readplacement',(req,res)=>{
    console.log(req.params);
    
    dbo.collection("placements").find().toArray((err,data)=>
    {
if(err)
{
   console.log("err is reading",err)
}
  else if(data==null)
  {
    //   res.send({message:"no data found"})
    console.log("data is empty");
    
  }  
else
{
    console.log(data);
    
   res.send({message:data})
}
})
    })
    

    //fee details
var storage =multer.diskStorage({destination:function (req, file, cb) {cb(null, './fee/') },   
 filename: function (req, file, cb) {       
 var datetimestamp = Date.now();       
 cb(null, `${new Date().getTime()}_${file.originalname}`) 
 }
});
// upload middleware
//const upload=multer({ storage: storage});
// convert excel to json route
app.post("/savefee",upload.single('fee'),(req,res)=>{    
    if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx')
    {        
    exceltojson = xlsxtojson;   
    } 
else {        exceltojson = xlstojson;   
 }    
try {       
     exceltojson({            
    input: req.file.path, //the same path where we uploaded our file           
     output: null, //since we don't need output.json           
 lowerCaseHeaders:true }, 
function(err,result){            
    if(err) {               
     return res.json({error_code:1,err_desc:err, data: null}); 
    }           
 dbo.collection("fee").insertMany(result, (err, data) => {              
    console.log(data);              
res.json({error_code:0,err_desc:null, data: data["ops"],"message":"placement Sheet uploaded successfully"});  
 });  
});   
 } 
catch (e){        
    res.json({error_code:1,err_desc:"Corupted excel file"}); 
}
});


app.get('/readfee',(req,res)=>{
    console.log(req.params);
    
    dbo.collection("fee").find().toArray((err,data)=>
    {
if(err)
{
   console.log("err is reading",err)
}
  else if(data==null)
  {
    //   res.send({message:"no data found"})
    console.log("data is empty");
    
  }  
else
{
    console.log(data);
    
   res.send({message:data})
}
})
    })

    


    // read by student

app.get('/readOne/:studentid',(req,res)=>{
    console.log(req.params);
    
    dbo.collection("studentdetails").find({studentid:req.params.studentid}).toArray((err,data)=>
    {
        console.log
if(err)
{
   console.log("err is reading",err)
}
  else if(data==null)
  {
     res.send({message:"no data found"})
    console.log("data is empty");
    
  }  
else
{
    console.log(data);
    
   res.send({message:data})
}
})
})


app.get('/readFee/:fee',(req,res)=>{
    console.log("fee",req.params);
    
    dbo.collection("fee").find({studentid:req.params.fee}).toArray((err,data)=>
    {
        console.log
if(err)
{
   console.log("err is reading",err)
}
  else if(data==null)
  {
     res.send({message:"no data found"})
    console.log("data is empty");
    
  }  
else
{
    console.log(data);
    
   res.send({message:data})
}
})
})
app.get('/readPlacement/:placements',(req,res)=>{
    console.log("branch",req.params);
    
    dbo.collection("placements").find({gbranch:req.params.placements}).toArray((err,data)=>
    {
        
if(err)
{
   console.log("err is reading",err)
}
  else if(data==null)
  {
     res.send({message:"no data found"})
    console.log("data is empty");
    
  }  
else
{
    console.log(data);
    
   res.send({message:data})
}
})
})



//login with student id
app.post('/login',(req,res)=>{
    console.log(req.body)
    let studentid=(req.body.username);
    console.log(studentid)
    dbo.collection("studentdetails").findOne({studentid:studentid},(error,obj)=>{ 
        if(error){
            console.log("error in finding",error)
        }
        else if(obj===null){
            res.send({message:"invalid-studentid"})
        }
        else{
            console.log(obj);     
            if(req.body.password!==obj.password){
                res.send({message:"invalid-password"})
            }
            else{
                console.log(obj);
                res.send({message:"login-success",name:obj})
            }
        }
    })
})
const port=2130;
app.listen(process.env.PORT || port,()=>{
    console.log(`server listening ${port}.......`)
})