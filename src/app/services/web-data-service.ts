import { Observable } from "rxjs";
import { SurveysService } from "./surveys.service";
import { ISurvey } from "../content/surveys/survey";

const surveyListDataName = "SurveyJSExampleList";
const timeOutDelay = 300;
const newSurveyName = "New Survey";
const newSurveyJSON = {};
const emptySurveyJSON = { pages: [{}] };

var surveyData: ISurvey[];
var surveyService: SurveysService;
var hasError = false;




type CallBackFunc = (...arg: any) => void;

// Get the survey list. Each object contains the following properties: `id`, `name`, and `json`
export function getSurveyItems(onCallback: CallBackFunc) {
  setTimeout(() => { onCallback(getSurveyItemsInternal(surveyService)) }, timeOutDelay);
}
// Create a new survey and return it
export function createSurvey(onCallback: CallBackFunc) {
  setTimeout(() => { onCallback(createSurveyInternal()) }, timeOutDelay);
}
// Delete a survey by `id` and return the updated survey list
export function deleteSurvey(id: string, onCallback: CallBackFunc) {
  deleteSurveyInternal(id);
  setTimeout(() => { onCallback(getSurveyItemsInternal(surveyService)) }, timeOutDelay);
}
// Get a survey JSON definition by survey `id`
export function getSurveyJSON(id: string, onCallback: CallBackFunc) {
  setTimeout(() => { onCallback(getSurveyJSONInternal(id)) }, timeOutDelay);
}
// Get a survey name by survey `id`
export function getSurveyName(id: string, onCallback: CallBackFunc) {
  setTimeout(() => { onCallback(getSurveyNameInternal(id)) }, timeOutDelay);
}
// Set a survey JSON definition by survey `id`
export function saveSurveyJSON(id: string, json: any, onCallback: CallBackFunc) {
  setSurveyJSONInternal(id, json);
  setTimeout(() => { onCallback() }, timeOutDelay);
}
// Set a survey name by survey `id`
export function saveSurveyName(id: string, name: string, onCallback?: CallBackFunc) {
  setSurveyNameInternal(id, name);
  if (!!onCallback) {
    setTimeout(() => { onCallback() }, timeOutDelay);
  }
}

function getSurveyItemsInternal(surveyService: SurveysService): any[] {
  if (!surveyData) {
    // const str = window.localStorage.getItem(surveyListDataName) || "";
    // surveyData = !!str ? JSON.parse(str) : [];
    // console.log(surveyData);
    console.log("Entering getSurveyItemsInternal");
    surveyService.getSurveysList()
    .subscribe({
      next: data =>{
        console.log("reached this line of code")
        surveyData = data.surveys;
        hasError = false;
      },
      error: err => {
        hasError = true;
      }
      
    });
  }
  
  console.log("Survey Data: "+surveyData)

  return surveyData;
}

function setSurveyItemsInternal() {
  if (!!surveyData) {
    window.localStorage.setItem(surveyListDataName, JSON.stringify(surveyData));
  }
}
function getSurveyJSONInternal(id: string) {
  const res: any = getSurveyInfoInternal(id);
  return !!res && !isObjectEmpty(res.json) ? res.json : emptySurveyJSON;
}
function setSurveyJSONInternal(id: string, json: any) {
  const res: any = getSurveyInfoInternal(id);
  if (!!res) {
    res.json = json;
    setSurveyItemsInternal();
  }
}
function getSurveyNameInternal(id: string) {
  const res: any = getSurveyInfoInternal(id);
  return !!res ? res.name : "";
}
function setSurveyNameInternal(id: string, name: string) {
  const res: any = getSurveyInfoInternal(id);
  if (!!res) {
    res.name = name;
    setSurveyItemsInternal();
  }
}
function createSurveyInternal() {
  var nextId = 1;
  const list = getSurveyItemsInternal(surveyService);
  for (var i = 0; i < list.length; i++) {
    if (list[i].id >= nextId) nextId = list[i].id + 1;
  }
  const newItem = { id: nextId, name: newSurveyName, json: newSurveyJSON };
  list.push(newItem);
  setSurveyItemsInternal();
  return newItem;
}
function deleteSurveyInternal(id: string) {
  const list = getSurveyItemsInternal(surveyService);
  for (var i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      list.splice(i, 1);
      break;
    }
  }
  setSurveyItemsInternal();
}
function getSurveyInfoInternal(id: string) {
  // const list = getSurveyItemsInternal(surveyService);
  // for (var i = 0; i < list.length; i++) {
  //   if (list[i]._id === id) return list[i];
  // }
  // return null;
  var survey: any;
  surveyService.getSurvey(id).subscribe({
    next: data => {
      survey = data.survey;
      hasError = false;
      return survey;
    },
    error: err => {
      hasError = true;
      return err;
    }
  })

  return null;
  
}

function isObjectEmpty(obj: Object) {
  return (
    obj &&
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
}