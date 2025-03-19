// sign in out up 3 methods
const bcrypt = require("bcrypt");
const Users = require("../module/Users.modules")
const jwt = require("jsonwebtoken")
const expireDate= 3*24*60*60;

// token methode
/************/
const creatToken=(id)=>{
    return jwt.sign({ id }, "task 9", {
           expiresIn: expireDate,
      });
}

//signIn
const signIn =async(req,res)=>{
    try{
        const { email , password} = req.body;
        const user = await Users.findOne({email});
        if(!user){
            return req.status(400).send( 
                {
                status:400 ,
                message: "wrong email"
                }) ;
        }
        const auth = bcrypt.compare(password , user.password)
       if(!auth){
        return req.status(400).send( 
            {
            status:400 ,
            message: "wrong password"
            }) ;
       }
       else{
        const token = creatToken(user._id);
        res.cookie("token", token, { httpOnly: true, maxAge: expireDate * 1000 });
        return req.status(200).send( 
            {
            success : true ,
            message: "signed in seccessfully" , 
            data: user
            }); 
       }
       }
    catch(error){
     req.status(500).send( 
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
        const newUser= new Users({username , email , password : password});
        await newUser.save();
        req.status(201).send( 
            {
            success : true ,
            message: "User registered successfully!" ,
            data: newUser
            })

    }
    catch(error){
        req.status(500).send( 
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
        return req.status(200).send( 
            {
            success:true ,
            message: "user signed out seccessfully"
            });
    }
    catch(error){
        req.status(500).send( 
            {
            status:500 ,
            message: "server error"
            })
    }
}

module.exports={signIn,signOut,signUp}

