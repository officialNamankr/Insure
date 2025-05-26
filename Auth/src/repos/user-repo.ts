import { injectable } from "inversify";
import "reflect-metadata";
import { User, UserAttrs } from "../models/user";
import { Employee, EmployeeAttrs } from "../models/employee";
import { BadRequestError, NotFoundError } from "@insureit/common";
import { Agent, AgentAttrs } from "../models/agent";
import mongoose, { mongo } from "mongoose";
import { SalesManager, SalesManagerAttrs } from "../models/sales-manager";


@injectable()
export default class UserRepo {
    constructor() {}

    async loginUser(req: Request, res: Response) {
        
    }

    async me(req: Request, res: Response) {
        return "Me";
    }

    async getUserById(id: mongoose.Types.ObjectId){
        const user = await User.findById(id);
        return user;
    }

    async getUserByEmail(email: string){
        try{
            console.log(email);
            const user = await User.findOne({email: email});
            console.log(user);
            return user;
        }
        catch(err){
            console.log(err);
            throw new BadRequestError("Error getting user by email");
        }
    }

    async createEmployee(EmployeeAttrs: EmployeeAttrs) {
        try{
            const employee = Employee.build(EmployeeAttrs);
            await employee.save();
            return employee;
        }
        catch(err){
            console.log(err);
            throw new BadRequestError("Error creating employee");
        }
    }

    async getEmployee(id: mongoose.Schema.Types.ObjectId) {
        try{
            const employee = await Employee.findById(id);
            if(!employee){
                throw new NotFoundError("Employee not found");
            }
            return employee;
        }
        catch(err){
            console.log(err);
            throw new BadRequestError("Error getting employee");
        }
    }

    async createAgent(agentAttrs: AgentAttrs) {
        try{
            const agent = Agent.build(agentAttrs);
            await agent.save();
            if(agent.salesManagers && agent.salesManagers.length === 0){
                return agent;
            }
            await SalesManager.updateMany(
                { _id: { $in: agent.salesManagers } },
                { $push: { agents: agent._id } }
            );
            return agent;
        }
        catch(err){
            console.log(err);
            throw new BadRequestError("Error creating agent");
        }
    }

    async getAgent(id: mongoose.Types.ObjectId) {
        try{
            const agent = await Agent.findById(id).populate("salesManagers");
            if(!agent){
                throw new NotFoundError("Agent not found");
            }
            return agent;
        }
        catch(err){
            console.log(err);
            throw new BadRequestError("Error getting agent");
        }
    }

    async createSalesManager(salesManagerAttrs: SalesManagerAttrs) {
        try{
            const salesManager = SalesManager.build(salesManagerAttrs);
            await salesManager.save();
            if(salesManager.agents && salesManager.agents.length === 0){
                return salesManager;
            }
            await Agent.updateMany(
                { _id: { $in: salesManager.agents } },
                { $push: { salesManagers: salesManager._id } }
            );
            return salesManager;
        }
        catch(err){
            console.log(err);
            throw new BadRequestError("Error creating sales manager");
        }
    }

    async getSalesManager(id: mongoose.Types.ObjectId) {
        try{
            const salesManager = await SalesManager.findById(id);
            console.log(salesManager);
            
            // if(!salesManager){
            //     throw new NotFoundError("Sales Manager not found");
            // }
            return salesManager;
        }
        catch(err){
            console.log(err);
            throw new BadRequestError("Error getting sales manager");
        }
    }


}