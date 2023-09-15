const express = require('express');
const jwt = require('jsonwebtoken');
const MY_KEY = "AbhishekAbbi";
// const popupS = require('popups');

const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');


const app = express();
const port = 5173 || process.env.PORT;
const { User, Problem, Submission } = require('./models.js');


const mongoURL = "mongodb+srv://abhishekabbiwork:Wakanda4ever@codeabhi.5t1zaqe.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoURL).then(
  result => {
    console.log("connected to mongodb");
  }
).catch(
  err => {
    console.log(err);
  }
);


app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
let corsOptions = {
  origin : ['http://localhost:3000'],
}
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(cookieParser());



const auth = async (req, res, next) => {
  


  const authHeader = req.cookies.authorization;
  if (!authHeader) {
    req.body.msg="no";

   
    return res.status(403).json({ msg: "no" });
  }

  const decoded = jwt.decode(authHeader, MY_KEY);

  if (!decoded._id) {
    req.body.msg="no";
    return res.status(400).json({ msg: "no" });
  }

  req.body.msg="yes";

  req.body.userid = decoded._id;

  console.log("user authenticated");

  next();


}


app.get('/authorize',auth,async (req,res) => {
  const userid = req.body.userid;

  let curruser = await User.findById(userid);

  res.status(200).json({name:curruser.name});

  

})
app.get("/", (req, res) => {
  res.json({ msg: "hello world" });


});


app.post('/signup', async function (req, res) {

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  


  if (!email || !password) {
    res.status(400).json({ msg: 'Missing input' })
    return;
  }

  let alreadyexist = await User.findOne({ email: email });



  if (alreadyexist) {

    res.status(409).json({ msg: 'This email already exists' })
    return;
  }
  const NewUser = new User({
    name,
    email,
    password,


  })

  NewUser.save()
    .then(result => {
      console.log("Sign up done");
      
    })
    .catch(err => {
      res.send(err);
    })

  //  res.status(200).json({msg:'Sign up succesful'})

})

app.get('/signup', (req, res) => {
  res.send('GET request to signup endpoint successful!');
});


app.get('/login', (req, res) => {
  res.send('GET request to login endpoint successful!');
});



app.post('/login', async function (req, res) {

  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.status(400).json({ msg: 'Missing input' })
    return;
  }

  let curruser = await User.find({ email: email }).limit(1);
 


  if (!curruser[0]) {
    res.status(404).json({ msg: 'Email not found' })

    return;
  }

  if (curruser[0]) {
    curruser = curruser[0].toJSON();
    if (curruser.password != password) {
      res.status(409).json({ msg: 'Wrong email or password' })
      return;
    }
    else{
      const token = jwt.sign(curruser, MY_KEY);


      res.cookie('authorization', token, { httpOnly: true , sameSite: 'Lax' });
      return res.json({url: 'http://localhost:3000/',token});
    }
  }
  
    
  

});

app.post('/logout',(req,res) =>{
  res.clearCookie('authorization');
  res.json({url: 'http://localhost:3000/',msg:"Logged Out Succesfully"});
});


app.get("/me", auth, async (req, res) => {
  const userid = req.body.userid;
  let curruser = await User.findById(userid);

  if (!curruser) {

    res.status(404).send("user not found" + userid);
  }

  res.json({ curruser });

})

app.post("/problem/:probid",auth,async function(req, res) {
  const isCorrect = Math.random() <0.5;
  const no = req.params.probid;
  const submission = req.body.submission;
  const userid = req.body.userid;
  const status = isCorrect?"ac" : "nac";
  const msg = req.body.msg;

  if(msg=="no"){
    res.json({msg:msg});
    return;
  }
  else{


  response = await Problem.findOne({no:no});
    
  const data = response;
  const name= data.name;
  
     

   const newsubmission= new Submission({
    no,
    name,
    userid,
    submission,
    status,
    
   });


   newsubmission.save().then(result =>{
    res.json({submission,msg:"submitted",url:`http://localhost:3000/submission/${newsubmission._id}`});
   }).catch(err=>console.log(err));
  }
    
});

app.get("/submissions",auth,async (req,res) => {
  const userid = req.body.userid;
  const msg = req.body.msg;
  
  // console.log(userid + "userid");
  let usersubmission = await Submission.find({userid : userid});

  
    
  
  
  if(!usersubmission){
    res.json({msg:"No user submissions found"});
  }
  
  res.json(
    
    usersubmission  )
});

app.get("/submission/:submissionid",auth,async (req,res) => {
  const userid = req.body.userid;
  const submissionid = req.params.submissionid;
  
  let usersubmission = await Submission.findById(submissionid).limit(1);

  
    
  
  
  if(!usersubmission){
    res.json({msg:"No user submissions found"});
  }
  
  res.json(
    
    usersubmission  )
});



app.listen(port, function () {
  console.log(`Example app listening on port ${port}`)
})