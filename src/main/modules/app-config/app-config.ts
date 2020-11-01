import { Injectable } from '@nestjs/common';
import * as yamlConfig from 'node-yaml-config';

@Injectable()
export default class AppConfig {
  static appConfig: any = (() => {
    return yamlConfig.load('app-config.yml');
  })();

  public getAppPort(): number {
    return AppConfig.appConfig.server.port;
  }

  public getDBConfig(connectionName?: string): any {
    return this.getMSSQLConfig(connectionName);
  }

  public getMSSQLConfig(connectionName?: string): any {
    return {
      type: 'mssql',
      name: connectionName ?? 'default',
      host: AppConfig.appConfig.database.host,
      port: AppConfig.appConfig.database.port,
      username: AppConfig.appConfig.database.username,
      password: AppConfig.appConfig.database.password,
      database: AppConfig.appConfig.database.name,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: AppConfig.appConfig.database.synchronize,
    };
  }
}
