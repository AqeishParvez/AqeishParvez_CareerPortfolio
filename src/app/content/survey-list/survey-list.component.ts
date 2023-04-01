import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { TokenStorageService } from "src/app/services/token-storage.service";
import { createSurvey, deleteSurvey, getSurveyItems } from "../../services/web-data-service";

interface SurveyListItem {
  name: string;
  id: number;
}

@Component({
  templateUrl: "./survey-list.component.html",
  selector: "survey-list"
})
export class SurveyListComponent {

  isLoggedIn = false;

  constructor(
    private tokenStorageService : TokenStorageService,
    private router: Router) { }
  public items: Array<SurveyListItem> = []
  public addNewSurvey() {
    createSurvey((newItem) => {
      this.router.navigate(["/editsurvey"], { queryParams: { id: newItem.id.toString() } });
    });
  }
  public removeSurvey(id: number) {
    deleteSurvey(id, (currentItems) => {
      this.items = currentItems;
    });
  }
  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if(this.isLoggedIn==false){
      this.router.navigate(["/login"]);
    }

    getSurveyItems((currentItems) => {
      this.items = currentItems;
    });
  }
}
