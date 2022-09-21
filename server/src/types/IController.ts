import { Request, Response } from "express";

interface IController { [key: string]: (arg0: Request, arg1: Response) => {} }

export default IController