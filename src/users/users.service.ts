import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm'; // We use this as DI is not good with Generice types
import { User } from './user.entity';


@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>){}

    create(email: string, password: string){
        // We create an instance first and save it into db as we need hooks to be executed
        const user = this.repo.create({ email, password })

        return this.repo.save(user);
    }

    findOne(id: number) {
        if (!id) {
            return null;
        }
        return this.repo.findOneBy({ id });
    }
      
    find(email: string) {
        return this.repo.find({ where: { email } });
    }
    
    // find(email: string) {
    //     return this.repo.findBy({ email });
    // }  

    async update(id: number, attrs: Partial<User> ){
        const user = await this.findOne(id);

        if(!user) {
            throw new NotFoundException("User not found");
        }

        Object.assign(user, attrs); // We will overide any props into attrs to the user props
        return this.repo.save(user);
    }

    async remove(id: number){
        const user = await this.findOne(id);

        if(!user) {
            throw new NotFoundException("No user was found");
        }

        return this.repo.remove(user);
    }

    // remove designed to work with an Entity
    // delete designed for deleteing with search critera delete(id);
}
