import { Controller, Post, Body, Get, Param, Patch, Query, Delete, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('auth') // prefix for all endpoints
export class UsersController {
    constructor(private usersService: UsersService ){}

    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        return this.usersService.create(body.email, body.password);
    } 

    @Get('/:id')
    async findUser(@Param('id') id: string){
        const user = await this.usersService.findOne(parseInt(id));

        if(!user){
            throw new NotFoundException("User Not found")
        }
    }

    @Get()
    findAllUsers(@Query('email') email: string){
        return this.usersService.find(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.usersService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto){
        return this.usersService.update(parseInt(id), body)
    }
}