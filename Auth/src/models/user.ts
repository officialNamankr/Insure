import mongoose from "mongoose";
import { Password } from "../utils/password";


export interface UserAttrs{
    name : string;
    email : string;
    password : string;
    mobile : string;
    role? : string;
    isActivated? : boolean;
    createdAt? : Date;
    updatedAt? : Date;
}

interface UserDoc extends mongoose.Document{
    name : string;
    email : string;
    password : string;
    mobile : string;
    role : string;
    isActivated : boolean;
    createdAt? : Date;
    updatedAt? : Date;
}

interface UserModel extends mongoose.Model<UserDoc>{
    build(attrs : UserAttrs) : UserDoc;
}

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    mobile : {
        type : String,
        required : true
    },
    isActivated : {
        type : Boolean,
        default : false
    },
    createdAt : {
        type : Date,
        default : Date.now()
    },
    updatedAt : {
        type : Date,
        default : Date.now()
    }
}, {
    timestamps : true,
    discriminatorKey: 'role',
    toJSON : {
        transform(doc, ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
            delete ret.updatedAt;
            delete ret.createdAt;
        },
    },
});

userSchema.pre("save",async function(this:mongoose.Document<UserDoc>,done){
    if(this.isModified("password")){
        const hashed = await Password.toHash(this.get("password"));
        this.set("password",hashed);
    }
    done();
})

userSchema.statics.build = (attrs : UserAttrs) => {
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export {User};