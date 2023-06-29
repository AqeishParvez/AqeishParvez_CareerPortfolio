import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SurveyCreatorModule } from 'survey-creator-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './content/home/home.component';
import { ProjectsComponent } from './content/projects/projects.component';
import { AboutComponent } from './content/about/about.component';
import { ServicesComponent } from './content/services/services.component';
import { ContactComponent } from './content/contact/contact.component';
import { LoginComponent } from './content/auth/login/login.component';
import { RegisterComponent } from './content/auth/register/register.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SurveyCreatorComponent } from './content/survey-creator/survey-creator.component';
import { SurveyCreatorWidgetComponent } from './content/survey-creator-widget/survey-creator-widget.component';
import { SurveyListComponent } from './content/survey-list/survey-list.component';
import { SurveysAddComponent } from './content/surveys/add/add.component';
import { SurveysEditComponent } from './content/surveys/edit/edit.component';
import { SurveysListComponent } from './content/surveys/list/list.component';
import { AuthInterceptor } from './_helper/auth.interceptor';
import { SurveyModule } from 'survey-angular-ui';
import { SurveyRunComponent } from './content/survey-run-component/survey-run-component.component';
import { SurveyDashboardComponent } from './content/survey-dashboard/survey-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';  


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProjectsComponent,
    AboutComponent,
    ServicesComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    SurveyCreatorComponent,
    SurveyCreatorWidgetComponent,
    SurveyListComponent,
    SurveysAddComponent,
    SurveysEditComponent,
    SurveysListComponent,
    SurveyRunComponent,
    SurveyDashboardComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    SurveyCreatorModule,
    SurveyModule,
    ReactiveFormsModule
  
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    SurveyCreatorModule,
    SurveyModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
