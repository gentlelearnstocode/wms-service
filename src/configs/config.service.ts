import { Router } from "express"
import { config } from "dotenv";

export class ConfigService {
  public router: Router;
  constructor(){
    this.router = Router();
    config({
      path: '.env',
    });
  }
  get NODE_ENV(): string {
    return process.env.NODE_ENV || ''
  }

  get PORT(): number {
    return Number(process.env.PORT) || 8001
  }

  get MONGO_URI(): string {
    return process.env.DATABASE || ''
  }

  get DATABASE_PASSWORD(): string {
    return process.env.DATABASE_PASSWORD || ''
  } 

  get JWT_SECRET(): string {
    return process.env.JWT_SECRET || ''
  }

  get JWT_EXPIRES_IN(): string {
    return process.env.JWT_EXPIRES_IN || ''
  }

  routeGETRequest(path: string, fn: any[]){
    this.router.route(path).get(...fn)
  }

  routePOSTRequest(path: string, fn: any[]){
    this.router.route(path).post(...fn)
  }
}