import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
readonly rootUrl='http://localhost:8097/api/quiz';

qns:any[];
seconds:number;
timer;
qnProgress:number;
correctAnswersCount:number=0;

  constructor(private httpClient : HttpClient) { }

   displayTimeElapsed() {
     return Math.floor(this.seconds/3600)+':'+Math.floor(this.seconds/60) +':'+Math.floor(this.seconds%60);
    }

  insertParticipant(name:string,email:string){
    var participant={
      "name":name,
      "email":email
    };

    return this.httpClient.post(this.rootUrl+'/participants',participant);
  }

  getQuestions(){
    return this.httpClient.get(this.rootUrl+'/randomquestions');
  }

  getAnswers(){
    var body=this.qns.map(x=>x.id);
    return this.httpClient.post(this.rootUrl+'/answers',body);
  }

  getParticipantName(){
    var participant = JSON.parse(localStorage.getItem('participant'));
    return participant.name;
  }

  submitScore(){
    var participant = JSON.parse(localStorage.getItem('participant'));
    participant.score = this.correctAnswersCount;
    participant.timespent = this.seconds;
    return this.httpClient.put(this.rootUrl+'/participants',participant);
  }
}
