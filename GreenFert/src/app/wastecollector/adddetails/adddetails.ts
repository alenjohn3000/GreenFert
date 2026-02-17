import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DbService } from '../../db-service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-adddetails',
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './adddetails.html',
  styleUrl: './adddetails.scss',
})
export class Adddetails {
  dfg!:FormGroup;
oid:any;
shop:any[]=[];



constructor(private fb:FormBuilder, private router:ActivatedRoute,private rout:Router,private dbservice:DbService, private cdr:ChangeDetectorRef){
  router.paramMap.subscribe((params)=>{
    this.oid=params.get('id');
})
}
ngOnInit(): void {
  this.dfg = this.fb.group({
    oid:this.oid,
    kg: [''],
    wtype: [''],
    note: [''],
    loginid: localStorage.getItem('login_id')
  });

  this.dbservice.getshopdetailsbyid({ id: this.oid }).then((data: any) => {
    this.shop = data;
    this.cdr.detectChanges();


  });
 
}

sub(){

  this.dbservice.getwdetails(this.dfg.value).then((result:any)=>{
    if(result.message=='success')
      
    {
      Swal.fire({
  icon: 'success',
  title: 'Collected!',
  text: 'Waste details added successfully',
  showConfirmButton: false,
  timer: 1800,
  timerProgressBar: true
}).then(() => {
  this.markCollected(this.oid);
  this.rout.navigate(['/wcmaster/wchome']);
});

    }
    else
    {
       Swal.fire({
    icon: 'error',
    title: 'Error!',
    text: 'Something went wrong. Please try again.',
    confirmButtonColor: '#f28123'
  });

  this.cdr.detectChanges();
    }
  })

}
markCollected(ownerid:any) {
    this.dbservice.markCollected({ loginid: localStorage.getItem('login_id'),ownerid: ownerid }).then((data: any) => {
      if (data.message == 'success') {
       
        window.location.reload();
      }
      else {
        alert('Error Occurred');

      }
    })
  }


}
