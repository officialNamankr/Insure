import "reflect-metadata";
import { Request, Response } from "express";
import { controller, Controller,interfaces } from "inversify-express-utils";



@controller("/policy")
export default class PolicyController implements interfaces.Controller{

    
}

