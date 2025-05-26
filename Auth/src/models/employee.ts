import mongoose from "mongoose";
import { User, UserAttrs } from "./user";
import { UserType } from "@insureit/common"

export interface EmployeeAttrs extends UserAttrs {
    employeeType : "Permanent" | "Contract" | string;
}

interface EmployeeDoc extends mongoose.Document {
    employeeType : "Permanent" | "Contract"| string;
}

interface EmployeeModel extends mongoose.Model<EmployeeDoc> {
    build(attrs : EmployeeAttrs) : EmployeeDoc;
}

const employeeSchema = new mongoose.Schema({
    employeeType : {
        type : String,
        required : true
    },
});

employeeSchema.statics.build = (attrs : EmployeeAttrs) => {
    return new Employee({
        name : attrs.name,
        email : attrs.email,
        password : attrs.password,
        // role: UserType.EMPLOYEE,
        mobile : attrs.mobile,
        employeeType : attrs.employeeType
    });
}

const Employee = User.discriminator<EmployeeDoc, EmployeeModel>("Employee", employeeSchema); 

export {Employee};