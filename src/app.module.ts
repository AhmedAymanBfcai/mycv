import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite', // This cause typeorm throw sqlite to create this file.
    entities: [User, Report],
    synchronize: true //Only for use in dev mode. This option is going to cause TypeOrm to take a look at the structure of all you different entities and automatically update the structure of your database.
  }), UsersModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService],
}) 

export class AppModule {}
