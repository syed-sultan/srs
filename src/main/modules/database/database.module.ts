import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from '../app-config/app-config.module';
import AppConfig from '../app-config/app-config';

@Module({})
export class DatabaseModule {
  public static register(connectionName?: string): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [AppConfigModule],
          inject: [AppConfig],
          useFactory: (appConfig: AppConfig) =>
            appConfig.getDBConfig(connectionName),
        }),
      ],
    };
  }
}
