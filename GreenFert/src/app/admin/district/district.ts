import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DbService } from '../../db-service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-district',
  imports: [RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './district.html',
  styleUrl: './district.scss',
})
export class District {
  districtfg!:FormGroup;
  savestatus=false;

constructor(private fb:FormBuilder,private dbservice:DbService,private router:Router,private cdr:ChangeDetectorRef){}

ngOnInit(): void {
  this.districtfg=this.fb.group({
   districtname:['',[Validators.required,Validators.minLength(3),Validators.pattern('^[a-zA-Z ]+$')]],
  });
}
sdistrict(){
  if(!this.districtfg.valid){
    this.savestatus=true;
    return;
  }
  else{

  this.dbservice.getdistrict(this.districtfg.value).then((result:any)=>{
    if (result.message === 'success') {

  Swal.fire({
    icon: 'success',
    title: 'District Added',
    text: 'District has been added successfully.',
    confirmButtonText: 'OK',
    confirmButtonColor: '#d99e1e'
  }).then(() => {
    this.router.navigate(['/adminmaster/districtview']);
  });

} else {

  Swal.fire({
    icon: 'error',
    title: 'Oops!',
    text: 'Something went wrong. Please try again.',
    confirmButtonText: 'Close',
    confirmButtonColor: '#dc3545'
  });

  this.cdr.detectChanges();
}

  })

}
}
}
