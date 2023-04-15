import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveysService } from 'src/app/services/surveys.service';

@Component({
  selector: 'survey-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class SurveysEditComponent {


  form: any = {
    _id: null,
    name: null,
    surveyId: null,
    json: null,
  }

  isSuccessful = true;
  errorMessage = "";

  constructor(
    private surveyService: SurveysService,
    private router: Router,
    private route: ActivatedRoute
    ){}

  ngOnInit(): void {
    this.route.params
      .subscribe({
        next: params =>{
          this.form._id = params['id']; // :id

          this.surveyService.getSurvey(this.form._id)
            .subscribe({
              next: data => {
                this.form = data.survey;
              },
              error: err=> {
                this.errorMessage = err.error.message;
                this.isSuccessful = false;
              }
            })
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.isSuccessful = false;
        }
      })
  }



  onSubmit(){
    this.surveyService.editSurvey(this.form)
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
