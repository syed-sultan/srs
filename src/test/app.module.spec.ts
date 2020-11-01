import { AppModule } from '../main/app.module';

describe('App Module', () => {
  it('app module is loaded', async () => {
    if (expect(new AppModule()) != null) {
      console.log('app module is loaded.');
    }
  });
});
