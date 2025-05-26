import "reflect-metadata";
import { Request, Response } from "express";
import {
    controller,
    interfaces,
} from "inversify-express-utils";
import { httpPost, httpGet } from "inversify-express-utils/lib/decorators";
import { loginValidations } from "../validations/login-validations";
import { employeeCreationValidations } from "../validations/employee-creation-validation";
import { BadRequestError, NotFoundError, validateRequest } from "@insureit/common";
import UserService from "../services/user-service";
import { agentCreationValidations } from "../validations/agnet-creation-validation";
import { salesManagerCreationValidation } from "../validations/sales-manager-creation-validation";
@controller("/users")
export default class UserController implements interfaces.Controller {
    constructor(private userService: UserService) {}

    @httpPost("/login", ...loginValidations, validateRequest)
    async loginUser(req: Request, res: Response) {
        const {email, password} = req.body;
        const user = await this.userService.loginUser(email,password);
        console.log(user);
        
        req.session = {
            jwt: user.token,
        }
        res.send(user);
    }
    
    @httpGet("/me")
    async me(req: Request, res: Response) {
        res.send("Me");
    }

    @httpPost("/employee",...employeeCreationValidations, validateRequest)
    async createEmployee(req: Request, res: Response) {
        try{
            const employee = await this.userService.createEmployee(req.body);
        res.status(201).send(employee);
        }
        catch(err){
            console.log(err);
            throw new BadRequestError("Error creating employee in user controller");
        }
        
    }

    @httpGet("/employee/:id")
    async getEmployee(req: Request, res: Response) {
        const employee = await this.userService.getEmployee(req.params.id);
        res.send(employee);
    }


    @httpPost("/SalesManager",...salesManagerCreationValidation, validateRequest)
    async createSalesManager(req: Request, res: Response) {
        try{
            const salesManager = await this.userService.createSalesManager(req.body);
        res.status(201).send(salesManager);
        }
        catch(err){
            console.log(err);
            throw new BadRequestError("Error creating sales manager in user controller");
        }
    }

    @httpGet("/SalesManager/:id")
    async getSalesManager(req: Request, res: Response) {
        // try{

            const salesManager = await this.userService.getSalesManager(req.params.id);
            
            res.status(200).send(salesManager);
        // }
        // catch(err){
        //     console.log(err);
        //     throw new BadRequestError("Error getting sales manager in user controller");
        // }
    }


    @httpPost("/Agent",...agentCreationValidations, validateRequest)
    async createAgent(req: Request, res: Response) {
        try{
            const agent = await this.userService.createAgent(req.body);
        res.status(201).send(agent);
        }
        catch(err){
            console.log(err);
            throw new BadRequestError("Error creating agent in user controller");
        }
    }

    @httpGet("/Agent/:id")
    async getAgent(req: Request, res: Response) {
        try{
            const agent = await this.userService.getAgent(req.params.id);
            res.status(200).send(agent);
        }
        catch(err){
            console.log(err);
            throw new BadRequestError("Error getting agent in user controller");
        }
    }
}
