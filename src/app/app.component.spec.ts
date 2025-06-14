import { AppComponent } from './app.component';
import { TranslateService } from '@ngx-translate/core';
import { mock, instance } from 'ts-mockito';

describe('AppComponent', () => {
  let component: AppComponent;
  let mockTranslateService: TranslateService = mock(TranslateService);
  let translateService = instance(mockTranslateService);
  beforeEach(async () => {
    component = new AppComponent(
        translateService
    );
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
