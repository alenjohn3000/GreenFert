import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { DbService } from '../../db-service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-locationedit',
  imports: [RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './locationedit.html',
  styleUrl: './locationedit.scss',
})
export class Locationedit {
location_id:any;
locationarray:any[]=[];
locationfg!:FormGroup;
 savestatus=false;
constructor(private fb:FormBuilder, private router:ActivatedRoute,private rout:Router,private dbservice:DbService, private cdr:ChangeDetectorRef){
  router.paramMap.subscribe((params)=>{
    this.location_id=params.get('id');
})
}
ngOnInit(): void {
  this.locationfg = this.fb.group({
    locationid:this.location_id,
    locationname: ['',[Validators.required,Validators.minLength(3),Validators.pattern('^[a-zA-Z ]+$')]]
  });

  this.dbservice.getLocationdetailsbyid({ id: this.location_id }).then((data: any) => {
    this.locationarray = data;

    this.locationfg.setValue({
      locationname: data[0].locationname,
      locationid:data[0].location_id
    });
    this.cdr.detectChanges();
  });
}


elocation(){
 if(!this.locationfg.valid){
   this.savestatus=true;
   return;
 }
 this.dbservice.updatelocation(this.locationfg.value ).then((result:any)=>{
 if (result.message === 'Success') {

  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'success',
    title: 'Location updated successfully',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true
  });

  this.rout.navigate(['/adminmaster/locationview']);
}

})
}
}
