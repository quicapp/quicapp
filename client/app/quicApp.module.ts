import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MaterialModule,
          MdIconRegistry,
          MdMenuModule,
          MdDialogModule,
          MdIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';


// Modules
import { RoutingModule } from './routing.module';
import { QuicAppComponent } from './quicApp.component';
import { LoadingModule, LoadingService } from './modules/loading/loading.module';


// Services
import { AuthHttp, AuthConfig, AUTH_PROVIDERS, provideAuth } from 'angular2-jwt';
import { Store } from './services/store/store';
import { API_URL } from './app.tokens';
import { HttpClient } from "./services/http-client";
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';

// Components
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { AppHeaderComponent } from './components/appHeader/appHeader.component';
import { UserProfileDialogComponent } from './components/userProfileDIalog/userProfileDialog.component';



const brrr = provideAuth({
            headerName: 'Authorization',
            headerPrefix: 'bearer',
            tokenName: 'token',
            tokenGetter: (() => localStorage.getItem('id_token')),
            globalHeaders: [{ 'Content-Type': 'application/json' }],
            noJwtError: true
        });

@NgModule({
  declarations: [
    QuicAppComponent,
    HomeComponent,
    UserComponent,
    AppHeaderComponent,
    UserProfileDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RoutingModule,
    MaterialModule,
    FlexLayoutModule,
    MdDialogModule,
    MdIconModule,
    LoadingModule.forRoot()
  ],
  providers: [
    Store,
    AuthService,
    AuthGuardLogin,
    AuthGuardAdmin,
    UserService,
    MdIconRegistry,
    AuthHttp,
    brrr,
    HttpClient,
    {provide: API_URL, useValue: '/api/'},
  ],
  entryComponents: [
    UserProfileDialogComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [QuicAppComponent]
})

export class QuicAppModule { }
