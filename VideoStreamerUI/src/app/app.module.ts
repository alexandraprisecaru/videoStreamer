import { LoginComponent } from './components/login/login.component';
import { MovielistComponent } from './components/movielist/movielist.component';
import { MovieRoomComponent } from './components/movie-room/movie-room.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { EmptyComponent } from './components/empty/empty.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatVideoModule } from 'mat-video';
import { FormsModule } from '@angular/forms';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("989131655048-3aj5o2omgm1fht1itf1v4j8r6lutnoss.apps.googleusercontent.com")
  }
]);
export function provideConfig() {
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MovielistComponent,
    MovieRoomComponent,
    EmptyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    MatVideoModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
