import 'reflect-metadata';
import { injectable } from 'inversify';
import UserRepo from '../repos/user-repo';
import { UserAttrs } from '../models/user';
import { EmployeeAttrs } from '../models/employee';
import mongoose from 'mongoose';
import { BadRequestError, NotFoundError } from '@insureit/common';
import { SalesManagerAttrs } from '../models/sales-manager';
import { AgentAttrs } from '../models/agent';
import { Password } from '../utils/password';
import Jwt from 'jsonwebtoken';

@injectable()
export default class UserService {
    constructor(private userRepo: UserRepo) {}

    async getUserById(id:mongoose.Types.ObjectId){
        return this.userRepo.getUserById(id);
    }

    async getUserByEmail(email: string){

        return this.userRepo.getUserByEmail(email);
    }
    async loginUser(email: string, password: string) {
        const user = await this.getUserByEmail(email);
        if (!user) {
            throw new BadRequestError("Invalid credentials");
        }
        const validPassword = await Password.compare(user.password, password);
        console.log(validPassword);
        
        if (!validPassword) {
            throw new BadRequestError("Invalid credentials");
        }
        const token = Jwt.sign({
            id: user._id,
            email: user.email,
            role: user.role,
        }, process.env.INSURE_JWT_KEY!);
        console.log(token);
        

        return {user,token};
    }

    async me(req: Request, res: Response) {
        return this.userRepo.me(req, res);
    }

    async createEmployee(employeeAttrs: EmployeeAttrs) {
        try{
            return this.userRepo.createEmployee(employeeAttrs);
        }
        catch(err){
            console.log(err);
            throw new BadRequestError("Error creating employee in user service");
        }
    }

    async getEmployee(id: string) {
        const employeeId = new mongoose.Schema.Types.ObjectId(id);
        return this.userRepo.getEmployee(employeeId);
    }

    async createSalesManager(salesManagerAttrs: SalesManagerAttrs) {
        try{
            return this.userRepo.createSalesManager(salesManagerAttrs);
        }
        catch(err){
            console.log(err);
            throw new BadRequestError("Error creating sales manager in user service");
        }
    }

    async getSalesManager(id: string) {
        // try{
            const salesManagerId = new mongoose.Types.ObjectId(id);

            const salesManager = await this.userRepo.getSalesManager(salesManagerId);
            // console.log(salesManager);
            
            if(!salesManager){
                console.log("Sales Manager not found");
                throw new NotFoundError("Sales Manager not found");
            }
            return salesManager;
        // }
        // catch(err){
        //     console.log(err);
        //     throw new BadRequestError("Error getting sales manager in user service");
        // }
    }

    async createAgent(agentAttrs: AgentAttrs) {
        try{
            return this.userRepo.createAgent(agentAttrs);
        }
        catch(err){
            console.log(err);
            throw new BadRequestError("Error creating agent in user service");
        }
    }

    async getAgent(id: string) {
        try{
            const agentId = new mongoose.Types.ObjectId(id);
            return this.userRepo.getAgent(agentId);
        }
        catch(err){
            console.log(err);
            throw new BadRequestError("Error getting agent in user service");
        }
    }
}