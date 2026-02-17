import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DbService } from '../../db-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterLink,ReactiveFormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  public larray:any[]=[];
  public loginfg!:FormGroup;
  public showPassword = false;
  constructor(private fb:FormBuilder,private db:DbService,private router:Router) {}
  ngOnInit() {
    this.loginfg=this.fb.group({
      username:[''],
      password:['']

    });
  }
  loginf(){

    this.db.getlogin(this.loginfg.value).then((data:any)=>{ 
      this.larray=data;
      if(data=="")
      {
        alert("Invalid Username or Password");
        this.router.navigate(['/login']);
        return;
      }
      else
      {
        var role=this.larray[0].role;
        localStorage.setItem('username',this.larray[0].username);
        localStorage.setItem('login_id',this.larray[0].login_id);
        if(role=='admin')
          {
            this.router.navigate(['adminmaster/adminhome']);
          } 
          else if(role=='customer')
          {
            this.router.navigate(['customermaster/customerhome']);
          } 
           else if(role=='shopowner')
          {
            this.router.navigate(['smaster/shome']);
          } 
           else if(role=='wastecollector')
          {
            this.router.navigate(['wcmaster/wchome']);
          } 

          else{
             alert('Register First to Login');
          }
      }
    }
  );


  }

  togglePassword(){
    this.showPassword = !this.showPassword;
  }

}
