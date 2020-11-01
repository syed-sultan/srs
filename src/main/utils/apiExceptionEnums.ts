export class ApiExceptionEnums {
  static INTERNAL_DB_ERROR: any = {
    getCode: () => 1,
    getDescription: () => 'Internal DB Error',
  };

  static RECORD_NOT_FOUND: any = {
    getCode: () => 2,
    getDescription: () => 'Record not found',
  };
}
