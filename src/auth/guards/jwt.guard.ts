import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtGuard implements CanActivate {

  constructor(private configService : ConfigService){}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req.header("authorization")?.split(" ")[1];
    if(!token) throw new HttpException("Token not provided",HttpStatus.UNAUTHORIZED);
    try{
      const verified = jwt.verify(token,this.configService.get("SECRET"));
      req.user = verified;
      if(verified) return true;
    }
    catch(error){
      throw new HttpException(error.message,HttpStatus.UNAUTHORIZED);
    }
    return true;
  }
}
