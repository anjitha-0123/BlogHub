import {Schema} from 'mongoose';
import {model} from 'mongoose';
const UserSchema=new Schema({
    username:{type:String,required:true,unique:true},
    phonenumber:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
});
const User=model('User',UserSchema)
export {User}