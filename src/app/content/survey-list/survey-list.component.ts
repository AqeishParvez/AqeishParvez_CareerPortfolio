import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { TokenStorageService } from "src/app/services/token-storage.service";
import { createSurvey, deleteSurvey, getSurveyItems } from "../../services/web-data-service";
import { SurveysService } from "src/app/services/surveys.service";
import { ISurvey } from "../surveys/survey";

var defaultSurveyListItem = {
  name: "New Survey",
  json: {
    "title": "New Survey",
    "logoPosition": "right",
    "pages": [
     {
      "name": "page1",
      "elements": [
       {
        "type": "text",
        "name": "question1",
        "title": "First Question"
       },
       {
        "type": "text",
        "name": "question2",
        "title": "Second Question"
       },
       {
        "type": "text",
        "name": "question3",
        "title": "Third Question"
       }
      ],
      "title": "First Page"
     },
     {
      "name": "page2",
      "elements": [
       {
        "type": "text",
        "name": "question4",
        "title": "First Question"
       },
       {
        "type": "text",
        "name": "question5",
        "title": "Second Question"
       }
      ],
      "title": "Second Page"
     }
    ]
   }
};

@Component({
  templateUrl: "./survey-list.component.html",
  selector: "survey-list"
})
export class SurveyListComponent {

  isLoggedIn = false;
  hasError = false;
  errorMessage = "";

  constructor(
    private tokenStorageService : TokenStorageService,
    private surveyService : SurveysService,
    private router: Router) { }
  
  public items: Array<ISurvey> = []

  public addNewSurvey() {
    this.surveyService.addSurvey(defaultSurveyListItem)
    .subscribe({
      next: data => {
        this.hasError = false;
        var id = data.newSurvey._id;
        console.log(id);
        this.router.navigate(['/edit-survey'], { queryParams: { id: id } });
      },
      error: err =>{
        this.errorMessage = err.error.message;
        this.hasError = true;
      }

    })
    // createSurvey((newItem) => {
    //   this.router.navigate(["/editsurvey"], { queryParams: { id: newItem.id.toString() } });
    // });
  }
  public removeSurvey(_id: string) {
     this.items.forEach(function (value){
      console.log(value.id);
     })

    this.surveyService.deleteSurvey(_id)
    .subscribe({
      next: data => {
        window.location.reload();
      },
      error: err => {
        this.hasError = true;
      }
    })
    // deleteSurvey(id, (currentItems) => {
    //   this.items = currentItems;
    // });
  }
  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if(this.isLoggedIn==false){
      this.router.navigate(["/login"]);
    }

    this.surveyService.getSurveysList().subscribe({
      next: data =>{
        this.items = data.surveys,
        this.hasError = false;
      },
      error: err => {
        this.hasError = true;
      }
      
    })

    // getSurveyItems((currentItems) => {
    //   this.items = currentItems;
    // });
  }
}
