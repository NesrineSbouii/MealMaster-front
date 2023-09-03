import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ImageService } from './service/images.service';
import { CustomInterceptor } from './interceptor/customInterceptor';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadImagePopUpComponent } from './dashboard/upload-image-pop-up/upload-image-pop-up.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ImageGalryComponent } from './dashboard/image-galry/image-galry.component';
import { UpdateImageComponent } from './dashboard/update-image/update-image.component';
import { DeleteComponent } from './dashboard/delete/delete.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    UploadImagePopUpComponent,
    ImageGalryComponent,
    UpdateImageComponent,
    DeleteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
  providers: [
    ImageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
