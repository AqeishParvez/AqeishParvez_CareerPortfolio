import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { TokenStorageService } from "src/app/services/token-storage.service";
import { SurveysService } from "src/app/services/surveys.service";
import { ISurvey } from "../surveys/survey";
import { defaultSurveyListItem } from "../surveys/survey";

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
    private router: Router,
    ) { }
  
  public surveyCreators: Array<ISurvey> = [];

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
      if(this.isLoggedIn==false){
      alert("Access Restricted: This action requires login\nPlease login or register to continue")
      this.router.navigate(["/login"]);
      }else{
        this.surveyCreators.forEach(function (value){
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
  }
  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    // if(this.isLoggedIn==false){
    //   this.router.navigate(["/login"]);
    // }

    this.surveyService.getSurveysList().subscribe({
      next: data =>{
        console.log("This line of code ran");
        this.surveyCreators = data.surveys,
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
