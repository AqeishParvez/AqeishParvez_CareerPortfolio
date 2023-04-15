import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SurveysService } from 'src/app/services/surveys.service';

@Component({
  selector: 'survey-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class SurveysAddComponent {

  form: any = {
    name: null,
    surveyId: null,
    json: null,
  }

  isSuccessful = true;
  errorMessage = "";

  constructor(private surveyService: SurveysService, private router: Router){}

  onSubmit(){
    this.surveyService.addSurvey(this.form)
    .subscribe({
      next: data => {
        this.isSuccessful = true;
        this.router.navigate(['/survey/list']);
      },
      error: err =>{
        this.errorMessage = err.error.message;
        this.isSuccessful = false;
      }

    })
  }


}
