import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

interface ClassConstructor {
  new (...args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // console.log("I am running before the handelr", context);

    return handler.handle().pipe(
      map((data: any) => {
        // console.log("Iam running before response is sent out", data)
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true, // It ensures that whenever we have an instnace of a user and try to turn it into JSON. It's only going to share or expose the diff props in the DTO 
        });
      }),
    );
  }
}