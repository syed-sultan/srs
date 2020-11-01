import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'student_enrollment',
})
class StudentEnrollment {
  @PrimaryGeneratedColumn('uuid', { name: 'student_internal_id' })
  public id: string;

  @Column({
    type: 'varchar',
    name: 'student_enrollment_id',
    length: 40,
    nullable: false,
  })
  public studentEnrollmentId: string;

  @Column({
    type: 'varchar',
    name: 'student_first_name',
    length: 40,
    nullable: false,
  })
  public studentFirstName: string;

  @Column({
    type: 'varchar',
    name: 'student_last_name',
    length: 40,
    nullable: false,
  })
  public studentLastName: string;

  @Column({
    type: 'varchar',
    name: 'student_section',
    length: 10,
    nullable: false,
  })
  public studentSection: string;

  @Column({
    type: 'varchar',
    name: 'nationality',
    length: 10,
    nullable: false,
  })
  public nationality: string;

  @Column({
    type: 'varchar',
    name: 'status',
    length: 5,
    nullable: false,
  })
  public status: string;

  @Column({
    type: 'varchar',
    name: 'remarks',
    length: 100,
    nullable: true,
  })
  public remarks: string;

  @Column({
    type: 'datetimeoffset',
    name: 'update_date_time',
    nullable: true,
  })
  public updateDateTime: Date;

  @Column({
    type: 'datetimeoffset',
    name: 'enrollment_date_time',
    nullable: false,
  })
  public enrollmentDateTime: Date;
}

export default StudentEnrollment;
