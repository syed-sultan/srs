import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import AppConfig from '../app-config/app-config';
import StudentEnrollment from './entity/studentenrollment.entity';
import StudentEnrollmentController from './studentenrollment.controller';
import StudentEnrollmentService from './service/studentenrollment.service';

@Module({
  imports: [TypeOrmModule.forFeature([StudentEnrollment]), HttpModule],
  controllers: [StudentEnrollmentController],
  providers: [StudentEnrollmentService, AppConfig],
})
export class StudentEnrollmentModule {}
