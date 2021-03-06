import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { QuicAppComponent } from './quicApp.component';

describe('Component: QuicApp', () => {
  let component: QuicAppComponent;
  let fixture: ComponentFixture<QuicAppComponent>;
  beforeEach( async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuicAppComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(QuicAppComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  /*it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should display the navigation bar correctly', () => {
    const de = fixture.debugElement.queryAll(By.css('a'));
    expect(de.length).toBe(3);
    expect(de[0].nativeElement.textContent).toContain('Home');
    expect(de[1].nativeElement.textContent).toContain('About');
    expect(de[0].attributes['routerLink']).toBe('/');
    expect(de[1].attributes['routerLink']).toBe('/about');
  });*/

});
