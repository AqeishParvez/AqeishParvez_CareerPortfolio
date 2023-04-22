import { Component, OnInit } from '@angular/core';
import { Model } from "survey-core";
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ActivatedRoute,Router } from '@angular/router';
import { SurveysService } from 'src/app/services/surveys.service';
import { SurveyResultsService } from 'src/app/services/survey-results.service';
import { surveyResults } from '../surveys/survey';

@Component({
  selector: 'survey-run-component',
  templateUrl: './survey-run-component.component.html',
  styleUrls: ['./survey-run-component.component.css']
})
export class SurveyRunComponent implements OnInit {
  constructor(
    private surveyService: SurveysService,
    private surveyResultsService: SurveyResultsService,
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router,
  ){}

  surveyModel!: Model;
  errorMessage = "";
  isSuccessful = false;
 

  ngOnInit() {
    const id: string = this.route.snapshot.queryParams["id"];
    console.log("Id from survey run component: "+id);

    this.surveyService.getSurvey(id).
      subscribe({
        next: data =>{
          const survey = new Model(data.survey.json);
          survey.onComplete.add(
            () => {
              console.log(survey.data);
              var results = new surveyResults(id, survey.data);
              this.surveyResultsService.addSurveyResults(results)
              .subscribe({
                next: data => {
                  console.log(data);
                  //data.results = results.results;
                  // data.surveyId = results.surveyId;
                  this.isSuccessful = true;
                  //var id = data.newSurveyResults._id;
                  alert("Survey successfully submitted");
                  //this.router.navigate(['/edit-survey'], { queryParams: { id: id } });
                },
                error: err =>{
                  this.errorMessage = err.error.message;
                  this.isSuccessful = false;
                }
          
              })}
          );
          this.surveyModel = survey;
          this.isSuccessful = true;
        
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.isSuccessful = false;
        }
      });

    };

}

// function saveSurveyResults(url, json) {
//   const request = new XMLHttpRequest();
//   request.open('POST', url);
//   request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
//   request.addEventListener('load', () => {
//     // Handle "load"
//   });
//   request.addEventListener('error', () => {
//     // Handle "error"
//   });
//   request.send(JSON.stringify(json));
// }
