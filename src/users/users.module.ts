import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core'; // To Apply Globally Scope Interceptor

// By using global scope Interceptor Whenver a request comes in to anything inside our app , We're going to run this interceptor, pull out userId from the session obj, find the user from db and assign it to the req obj. 

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Thie step will create the repo for us.
  controllers: [UsersController],
  providers: [UsersService, AuthService, {provide: APP_INTERCEPTOR, useClass: CurrentUserInterceptor}],
})

export class UsersModule {}