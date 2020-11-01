import StudentEnrollment from '../entity/studentenrollment.entity';
import { Repository } from 'typeorm';

export default class StudentEnrollmentRepository extends Repository<
  StudentEnrollment
> {}
