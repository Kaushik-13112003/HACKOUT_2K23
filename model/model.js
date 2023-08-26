const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const schemaDesign = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        require:true
    },

    email:{
        type:String,
        unique:true,
        require:true
    },

    phone:{
        type:Number,
        require:true
    },

    password:{
        type:String,
        require:true
    },

    cPassword:{
        type:String,
        require:true
    },

    gender:{
        type:String,
        require:true
    },

    date:{
        type:Date,
        default:Date.now()
    },
});

// schemaDesign.pre('save',async function(next){
//     try{
//         if(this.isModified('password')){
//             this.password = await bcrypt.hash(this.password,10);
//             this.cPassword = await bcrypt.hash(this.cPassword,10);
//         }
//         next();
//     }catch(err){
//         console.log(err);
//     }
// });

// schemaDesign.methods.createToken = async function (){
//     try{
//         const token =  jwt.sign({_id:this._id},process.env.TOKEN);

//         this.tokens = await this.tokens.concat({token});

//         await this.save();

//         return token;
//     }catch(err){
//         console.log(err);
//     }
// }

const Register = new mongoose.model('TechTitan',schemaDesign);
module.exports = Register;