import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DbService } from '../../db-service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-location',
  imports: [RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './location.html',
  styleUrl: './location.scss',
})
export class Location {
locationfg!:FormGroup;
public locationarray:any[]=[];
 savestatus=false;
constructor(private fb:FormBuilder,private dbservice:DbService,private rout:Router,private cdr:ChangeDetectorRef){}
ngOnInit(): void {
  this.viewdata();

   this.locationfg=this.fb.group({
   locationname:['',[Validators.required,Validators.minLength(3),Validators.pattern('^[a-zA-Z ]+$')]],
    districtid:['',[Validators.required]]
  });
}

viewdata(){

   this.dbservice.dlocation().then((data: any) => { 
      this.locationarray = data; 
  this.cdr.detectChanges();
})
}


slocation(){
  if(!this.locationfg.valid){
    this.savestatus=true;
    return;
  }
this.dbservice.locationaction(this.locationfg.value).then((result:any)=>{
   if (result.message === 'success') {

  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'success',
    title: 'Location added successfully',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true
  });

  this.rout.navigate(['/adminmaster/locationview']);

} else {

  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'error',
    title: 'Failed to add location',
    showConfirmButton: false,
    timer: 2500
  });

}

  })
}
}
