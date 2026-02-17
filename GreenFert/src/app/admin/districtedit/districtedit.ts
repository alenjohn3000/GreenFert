import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DbService } from '../../db-service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-districtedit',
  imports: [RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './districtedit.html',
  styleUrl: './districtedit.scss',
})
export class Districtedit {
district_id:any;
districtarray:any[]=[];
districtfg!:FormGroup;
 savestatus=false;
constructor(private fb:FormBuilder, private router:ActivatedRoute,private rout:Router,private dbservice:DbService, private cdr:ChangeDetectorRef){
  router.paramMap.subscribe((params)=>{
    this.district_id=params.get('id');
})
}
ngOnInit(): void {
  this.districtfg = this.fb.group({
    districtid:this.district_id,
    districtname: ['',[Validators.required,Validators.minLength(3),Validators.pattern('^[a-zA-Z ]+$')]]
  });

  this.dbservice.getDistrictdetailsbyid({ id: this.district_id }).then((data: any) => {
    this.districtarray = data;

    this.districtfg.setValue({
      districtname: data[0].districtname,
      districtid:data[0].district_id
    });
    this.cdr.detectChanges();
  });
}


edistrict(){
 if(!this.districtfg.valid){
   this.savestatus=true;
   return;
 }
 this.dbservice.updatedistrict(this.districtfg.value ).then((result:any)=>{
 if (result.message === 'Success') {

  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'success',
    title: 'District updated successfully',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true
  });

  this.rout.navigate(['/adminmaster/districtview']);
}


})
}
}
