import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { DbService } from '../../db-service';

@Component({
  selector: 'app-cregister',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './cregister.html',
  styleUrl: './cregister.scss',
})
export class Cregister {
   customerfg!:FormGroup;
   savestatus=false;

constructor(private fb:FormBuilder,private dbservice:DbService,private rout:Router,private cdr:ChangeDetectorRef){}
ngOnInit(): void {
   this.customerfg=this.fb.group({
   cname:['',[Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
    cemail:['',[Validators.required, Validators.email]],
    contact:['',[Validators.required, Validators.pattern('[0-9]{10}')]],
  username:['',[Validators.required, Validators.minLength(4), Validators.pattern('[a-zA-Z0-9_]*')]],
  password:['',[Validators.required, Validators.minLength(6)]]
  });
}
creg(){
  if (!this.customerfg.valid) {
    this.savestatus = true;
    return;
  }
this.dbservice.cregisteraction(this.customerfg.value).then((result:any)=>{
    if(result.message=='success')
    {
      alert('customer register successfully');  
             this.rout.navigate(['/login']); 
 
    }
    else
    {
      alert('Error Occurred');
      
    }
  })
}
  }



