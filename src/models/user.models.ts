import mongoose from "mongoose";
import type { IUserMethods, IUserModel } from "../utils/types/user.types.js";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema<  
  IUserModel,
  mongoose.Model<IUserModel, {}, IUserMethods>,
  IUserMethods
>({
     email:{
        type: String,
        required:[true , "Email is required for creating a user"],
        trim: true,
        lowercase: true,
        unique: [true , "Email already exist"],
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format"] //regex for email validation
     }, 
     name:{
        type: String,
        required:[true , "Name is required for creating an account"]
     },
     password:{
        type: String,
        required:[true , "Password is required for creating an account"],
        minlength:[6 , "Password should contain more than 6 character"],
        select: false, //if we featch user then password not came with user.
     },
     systemUser:{
       type: Boolean,
       default: false,
       immutable: true,
     }
} , {timestamps: true})

userSchema.pre("save" , async function() {
    if(!this.isModified("password")){
        return
    }

    const hash = await bcrypt.hash(this.password as string , 10)
    this.password = hash

    return 
})

/**
* - comparePassword
* - required : password as string
*/

userSchema.methods.comparePassword = async function(password : string){
    return await bcrypt.compare(password , this.password as string)
}

/**
 * - userModel params
 * - required : email , name and password
*/
const userModel = mongoose.model<IUserModel, mongoose.Model<IUserModel, {}, IUserMethods>>(
  "user",
  userSchema
);

export default userModel