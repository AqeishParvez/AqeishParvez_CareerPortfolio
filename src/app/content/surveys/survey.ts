export interface ISurvey {
    name: string;
    id: number;
    _id: string;
    surveyId: number;
    json: null
}

export class surveyResults {

  constructor(
    public surveyId: String,
    public json: Object
  ){}

};

export const defaultSurveyListItem = {
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