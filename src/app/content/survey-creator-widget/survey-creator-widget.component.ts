import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TokenStorageService } from "src/app/services/token-storage.service";
import { ISurvey, Serializer } from "survey-core";
import { SurveyCreatorModel } from "survey-creator-core";
// import { getSurveyItems, getSurveyJSON, getSurveyName, saveSurveyJSON, saveSurveyName } from "../../services/web-data-service";
import { SurveysService } from "src/app/services/surveys.service";
import { Observable } from "rxjs";

Serializer.findProperty("survey", "title").isRequired = true;
var surveyData: any[];

@Component({
  templateUrl: "./survey-creator-widget.component.html",
  selector: "creator-widget"
})
export class SurveyCreatorWidgetComponent implements OnInit {
  isLoggedIn = false;
  isSuccessful = false;
  errorMessage = "";
  creator!: SurveyCreatorModel;
  

  constructor(
    private tokenStorageService: TokenStorageService,
    public surveyService: SurveysService,
    private route: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if(this.isLoggedIn==false){
    alert("Restricted Access: Please login to edit surveys\nThank you!")
    this.router.navigate(["/login"]);
    }
    const id: string = this.route.snapshot.queryParams["id"];
    console.log("Id from survey creator widget: "+id);
    this.creator = new SurveyCreatorModel({ showLogicTab: false })
    this.creator.isAutoSave = true;

    //todo search second arg name for callback function
    this.creator.saveSurveyFunc = (saveNo: number, callback: (saveNo: number, arg: boolean) => void) => {
      // You can use `this.creator.text` as an alternative to `this.creator.JSON`
      // saveSurveyJSON(id, this.creator.JSON, () => {
      //   callback(saveNo, true);
      // });

      var currentSurvey: any;

      this.surveyService.getSurvey(id).
      subscribe({
        next: data =>{
          currentSurvey = data.survey;
          currentSurvey.json = this.creator.JSON;

          this.surveyService.editSurvey(currentSurvey)
          .subscribe({
            next: data => {
              this.isSuccessful = true;
              return () => {
                  callback(saveNo, true);
                };
              //this.router.navigate(['/survey/list']);
            },
            error: err =>{
              this.errorMessage = err.error.message;
              this.isSuccessful = false;
              return () => {
                callback(saveNo, true);
              };
            }
          });
        
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.isSuccessful = false;
        }
      });

    };

    this.creator.onModified.add((_, options) => {
      // We are interested in property changes only
      if (options.type === "PROPERTY_CHANGED") {
        // Update the survey name in the database when the survey title is changed
        if (
          options.name === "title" &&
          !!options.target &&
          options.target.getType() === "survey"
        ) {
          //saveSurveyName(id, options.newValue);

          var currentSurvey: any;

          this.surveyService.getSurvey(id).
          subscribe({
            next: data =>{
              currentSurvey = data.survey;
              currentSurvey.name = options.newValue;

              this.surveyService.editSurvey(currentSurvey)
              .subscribe({
                next: data => {
                  this.isSuccessful = true;
                },
                error: err =>{
                  this.errorMessage = err.error.message;
                  this.isSuccessful = false;
                }
              });
            },
            error: err => {
              this.errorMessage = err.error.message;
              this.isSuccessful = false;
            }
          });

        }
      }
    });
      //getSurveyJSON(id, (json: any) => {
        // Save the survey title to prevent it from being overwritten
        //const prevTitle = this.creator.survey.title;
        // You can use `this.creator.text` as an alternative to `this.creator.JSON`
        // this.creator.survey.title = currentSurvey.name;
        // this.creator.JSON = currentSurvey.json;
        // if (!!prevTitle) {
        //   this.creator.survey.title = prevTitle;
      //});


      // getSurveyName(id, (name: string) => {
      //   this.creator.survey.title = name;
      // });

      //Get survey name and Json
      
      var currentSurvey: any;
      this.surveyService.getSurvey(id).
          subscribe({
            next: data =>{
              currentSurvey = data.survey;
              // Save the survey title to prevent it from being overwritten
              const prevTitle = this.creator.survey.title;
              // You can use `this.creator.text` as an alternative to `this.creator.JSON`
              this.creator.survey.title = currentSurvey.name;
              this.creator.JSON = currentSurvey.json;
              if (!!prevTitle) {
                this.creator.survey.title = prevTitle;
              }
            },
            error: err => {
              this.errorMessage = err.error.message;
              this.isSuccessful = false;
            }
          });


  }
}
