import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpXsrfTokenExtractor, HttpRequest, HttpInterceptor, HttpHandler, HttpEvent, HttpClientXsrfModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ImageService } from './service/images.service';
import { CustomInterceptor } from './interceptor/customInterceptor';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export class CustomXsrfTokenExtractor implements HttpXsrfTokenExtractor {
  getToken(): string | null {
    // Implement your logic to get the token
    return 'my-xsrf-token';
  }
}
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
   
   
  ],
  providers: [ImageService, {
    provide: HTTP_INTERCEPTORS,
    useClass: CustomInterceptor,
    multi: true
  },
  {
    provide: HttpXsrfTokenExtractor,
    useClass: CustomXsrfTokenExtractor
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }



