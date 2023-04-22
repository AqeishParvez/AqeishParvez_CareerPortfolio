import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Model } from 'survey-core';
import { SurveyResultsService } from 'src/app/services/survey-results.service';
import { SurveysService } from 'src/app/services/surveys.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { VisualizationPanel } from 'survey-analytics';
import { toArray } from 'rxjs';

//Visualization Panel
const vizPanelOptions = {
  allowHideQuestions: false
}

@Component({
  selector: 'survey-dashboard',
  templateUrl: './survey-dashboard.component.html',
  styleUrls: ['./survey-dashboard.component.css']
})
export class SurveyDashboardComponent implements AfterViewInit{

  isLoggedIn = false;
  isSuccessful = false;
  errorMessage = "";

  //@ViewChild("surveyVizPanel") elem: ElementRef | undefined;

  

  constructor(
    private tokenStorageService: TokenStorageService,
    private surveyService: SurveysService,
    private surveyResultsService: SurveyResultsService,
    private route: ActivatedRoute
  ){}


  ngAfterViewInit(): void {
    const id: string = this.route.snapshot.queryParams["id"];
    console.log("Id from survey creator widget: "+id);

    this.surveyService.getSurvey(id).
    subscribe({
      next: data =>{
        const survey = new Model(data.survey.json);
        var surveyResults: any;
        var surveyResultsJsons: any[];

        this.surveyResultsService.getSurveyResultsListById(id).
        subscribe({
          next: data => {
            surveyResults = data.surveyResults;
            console.log(surveyResultsJsons);
            const vizPanel = new VisualizationPanel(
              survey.getAllQuestions(),
              surveyResults,
              vizPanelOptions
            )
            vizPanel.showHeader = false;
            vizPanel.render("surveyVizPanel");
          },
          error: err => {

          }
        })

        this.isSuccessful = true;
      
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSuccessful = false;
      }
    });


  }

  

}
