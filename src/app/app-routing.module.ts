import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './content/about/about.component';
import { LoginComponent } from './content/auth/login/login.component';
import { RegisterComponent } from './content/auth/register/register.component';
import { ContactComponent } from './content/contact/contact.component';
import { HomeComponent } from './content/home/home.component';
import { ProjectsComponent } from './content/projects/projects.component';
import { ServicesComponent } from './content/services/services.component';
import { SurveyCreatorWidgetComponent } from './content/survey-creator-widget/survey-creator-widget.component';
import { SurveyCreatorComponent } from './content/survey-creator/survey-creator.component';
import { SurveyListComponent } from './content/survey-list/survey-list.component';
import { SurveysListComponent } from './content/surveys/list/list.component';
import { SurveysAddComponent } from './content/surveys/add/add.component';
import { SurveysEditComponent } from './content/surveys/edit/edit.component';
import { SurveyRunComponent } from './content/survey-run-component/survey-run-component.component';
import { SurveyDashboardComponent } from './content/survey-dashboard/survey-dashboard.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch:'full'},
  {path: 'home', component: HomeComponent },
  {path: 'about', component: AboutComponent },
  {path: 'contact', component: ContactComponent },
  {path: 'projects', component: ProjectsComponent },
  {path: 'services', component: ServicesComponent },
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'survey-creator', component: SurveyCreatorComponent },
  {path: 'survey-list', component: SurveyListComponent },
  {path: 'edit-survey', component: SurveyCreatorWidgetComponent },
  {path: 'run-survey', component: SurveyRunComponent},
  {path: 'survey/list', component: SurveysListComponent },
  {path: 'survey/add', component: SurveysAddComponent },
  {path: 'survey/edit/:id', component: SurveysEditComponent },
  {path: 'survey-results', component: SurveyDashboardComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
