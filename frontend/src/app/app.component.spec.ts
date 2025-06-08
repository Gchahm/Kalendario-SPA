import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {AuthService} from '@api/clients/auth.service';
import {AuthServiceMock, MediaMatcherServiceMock} from '@shared/test/stubs';
import {MediaMatcherService} from '@shared/services/media-matcher.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: AuthService, useClass: AuthServiceMock},
        {provide: MediaMatcherService, useClass: MediaMatcherServiceMock},
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Kalendario'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Kalendario');
  });

});
