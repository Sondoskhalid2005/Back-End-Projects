const bcrypt = require("bcrypt");
const Users = require("../module/Users.modules")
const jwt = require("jsonwebtoken")
const expireDate= 3*24*60*60;

// token method
/************/


//signIn
const signIn =async(req,res)=>{
    try{
        const { email , password} = req.body;
        const user = await Users.findOne({email});
        const userid=req.userId;
        if(!user){
            return res.status(400).send( 
                {
                status:400 ,
                message: "wrong email"
                }) ;
        }
      
        const auth = bcrypt.compare(password , user.password)
       if(!auth){
        return res.status(400).send( 
            {
            status:400 ,
            message: "wrong password"
            }) ;
       }
       else{
        const creatToken=(userId)=>{
            return jwt.sign({ userId }, "task 9", {
                   expiresIn: expireDate,
              });
        }
        const token = creatToken(user._id);
        res.cookie("token", token, { httpOnly: true, maxAge: expireDate * 1000 });
        return res.status(200).send( 
            {
            success : true ,
            message: "signed in seccessfully" , 
            data: user
            }); 
       }
       }
    catch(error){
     res.status(500).send( 
        {
        status:500 ,
        message: "server error"
        }) 
    }
}

//signUp
const signUp =async(req,res)=>{
    try{
        console.log("Signup route hit!");
        const {username , email , password} = req.body;
        const bcryptt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, bcryptt);
        const newUser= new Users({username , email , password : hashedPassword});
        await newUser.save();
        
        return res.status(201).send( 
            {
            success : true ,
            message: "User registered successfully!" ,
            data: newUser
            })

    }
    catch(error){
        res.status(500).send( 
            {
            status:500 ,
            message: "server error"
            })
    }  
}

//signOut
const signOut = async (req,res)=>{
    try{
        res.cookie("token", "", { maxAge: 1 });
        return res.status(200).send( 
            {
            success:true ,
            message: "user signed out seccessfully"
            });
    }
    catch(error){
        res.status(500).send( 
            {
            status:500 ,
            message: "server error"
            })
    }
}

module.exports={signIn,signOut,signUp}

