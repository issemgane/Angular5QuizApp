import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

emailPattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$";
  constructor(private quizService:QuizService,private route:Router) { }

  ngOnInit() {
  }

  registerParticipant(name:string,email:string){
   this.quizService.insertParticipant(name,email).subscribe(
     (data:any)=>{
       localStorage.clear();
       localStorage.setItem('participant',JSON.stringify(data));
       this.route.navigate(['/quiz']);
     }
   );

  }

}
