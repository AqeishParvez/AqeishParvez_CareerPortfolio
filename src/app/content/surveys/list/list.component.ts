import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SurveysService } from 'src/app/services/surveys.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'survey-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class SurveysListComponent {

isLoggedIn = false;
hasError = false;
surveys = [];

constructor(
  private tokenStorageService : TokenStorageService,
  private surveyService : SurveysService, 
  private router: Router){}

ngOnInit(): void {
  this.isLoggedIn = !!this.tokenStorageService.getToken();
  this.surveyService.getSurveysList().subscribe({
    next: data =>{
      this.surveys = data.surveys,
      this.hasError = false;
    },
    error: err => {
      this.hasError = true;
    }
    
  })
}

editSurvey(id: string):void{
  this.router.navigate(['survey/edit/'+id]);
}

deleteSurvey(id: string):void{
  this.surveyService.deleteSurvey(id)
  .subscribe({
    next: data => {
      window.location.reload();
    },
    error: err => {
      this.hasError = true;
    }
  })
}


}
