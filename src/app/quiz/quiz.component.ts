import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

    constructor(private quizService:QuizService,private route:Router) { }

  ngOnInit() {

    if (parseInt(localStorage.getItem('seconds')) > 0) {
          this.quizService.seconds = parseInt(localStorage.getItem('seconds'));
          this.quizService.qnProgress = parseInt(localStorage.getItem('qnProgress'));
          this.quizService.qns = JSON.parse(localStorage.getItem('qns'));
          if (this.quizService.qnProgress == 10)
            this.route.navigate(['/result']);
          else
            this.startTimer();
        }else{
            this.getRandomQuestions();
        }

  }

getRandomQuestions(){
  this.quizService.qnProgress=0;
  this.quizService.seconds=0;

  this.quizService.getQuestions().subscribe(
      (response:any)=>{
        this.quizService.qns=response;
        this.startTimer();
      }
       ,
      (error)=>{

      }
  );
}

startTimer(){
  this.quizService.timer= setInterval(()=>{
      this.quizService.seconds++;
      localStorage.setItem('seconds',this.quizService.seconds.toString());
  },1000);
}

answer(idQuestion,choice){
  this.quizService.qns[this.quizService.qnProgress].answer=choice;
  localStorage.setItem('qns', JSON.stringify(this.quizService.qns));
  this.quizService.qnProgress++;
  localStorage.setItem('qnProgress', this.quizService.qnProgress.toString());
  if(this.quizService.qnProgress==10){
    clearInterval(this.quizService.timer);
    this.route.navigate(['result']);
  }
}

}
