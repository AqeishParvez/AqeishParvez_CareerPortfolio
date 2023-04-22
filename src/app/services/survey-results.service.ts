import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const SURVEY_API = environment.apiUrl + "/survey-results/";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
}


@Injectable({
  providedIn: 'root'
})
export class SurveyResultsService {

  constructor(private httpClient : HttpClient) { }

  //Get List
  getSurveyResultsList(): Observable<any> {
    console.log("Entering survey results list");
    return this.httpClient.get<any>(SURVEY_API+'list', httpOptions);
  }

  //Get Multiple By Id
  getSurveyResultsListById(id: string): Observable<any> {
    console.log("Entering survey results list by Id");
    return this.httpClient.get<any>(SURVEY_API+'list/'+id, httpOptions);
  }

  //Get One
  getSurveyResults(id: string): Observable<any> {
    return this.httpClient.get(SURVEY_API+id, httpOptions);
  }

  //Add

  addSurveyResults(surveyResults: any): Observable<any> {
    return this.httpClient.post(SURVEY_API+'add', surveyResults, httpOptions);
  }

  //Edit

  editSurvey(surveyResults: any): Observable<any> {
    return this.httpClient.put(SURVEY_API+'edit/'+surveyResults['_id'], surveyResults, httpOptions);
  }

  //Delete

  deleteSurvey(id: any): Observable<any> {
    return this.httpClient.delete(SURVEY_API+'delete/'+id, httpOptions);
  }

}


