import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const SURVEY_API = environment.apiUrl + "/surveys/"; //http://localhost:3000/api/movies

const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
}


@Injectable({
  providedIn: 'root'
})
export class SurveysService {

  constructor(private httpClient : HttpClient) { }

  //Get List
  getSurveysList(): Observable<any> {
    console.log("Entering getSurveysList");
    return this.httpClient.get<any>(SURVEY_API+'list', httpOptions);
  }

  //Get One
  getSurvey(id: string): Observable<any> {
    return this.httpClient.get(SURVEY_API+id, httpOptions);
  }

  //Add

  addSurvey(survey: any): Observable<any> {
    return this.httpClient.post(SURVEY_API+'add', survey, httpOptions);
  }

  //Edit

  editSurvey(survey: any): Observable<any> {
    return this.httpClient.put(SURVEY_API+'edit/'+survey['_id'], survey, httpOptions);
  }

  //Delete

  deleteSurvey(id: any): Observable<any> {
    return this.httpClient.delete(SURVEY_API+'delete/'+id, httpOptions);
  }

}


