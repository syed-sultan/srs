import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { AppConfigModule } from './modules/app-config/app-config.module';
import AppConfig from './modules/app-config/app-config';
import { StudentEnrollmentModule } from './modules/srs/studentenrollment.module';

@Module({
  imports: [
    StudentEnrollmentModule,
    AppConfigModule,
    DatabaseModule.register(),
  ],
  controllers: [],
  providers: [AppConfig],
})
export class AppModule {}
