import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DbService } from '../../db-service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-productupdate',
  imports: [RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './productupdate.html',
  styleUrl: './productupdate.scss',
})
export class Productupdate {
stockfg!:FormGroup;
product_id:any;
productarray:any[]=[];
 savestatus=false;
constructor(private fb:FormBuilder, private router:ActivatedRoute,private rout:Router,private dbservice:DbService, private cdr:ChangeDetectorRef){
  router.paramMap.subscribe((params)=>{
    this.product_id=params.get('id');
})
}
ngOnInit(): void {
  this.stockfg = this.fb.group({
    productid:this.product_id,
    newprice: [''],
    newstock: [''],
    nstock: ['',[Validators.required,Validators.pattern('^[0-9]+(\\.[0-9]+)?$')]],
    nprice: ['',[Validators.required,Validators.pattern('^[0-9]+(\\.[0-9]+)?$')]]
    

  });

  this.dbservice.getStockdetailsbyid({ id: this.product_id }).then((data: any) => {
    this.productarray = data;
    console.log(this.productarray);
    this.cdr.detectChanges();


    this.stockfg.setValue({
      newprice: data[0].amount,
      productid:data[0].product_id,
      newstock:data[0].stock,
      nstock:0,
      nprice:0
    });
  });
}


updatestock(){
 if(!this.stockfg.valid){
   this.savestatus=true;
   return;
 }
 this.dbservice.updatestock(this.stockfg.value ).then((result:any)=>{
  if (result.message === "Success") {

  Swal.fire({
    icon: 'success',
    title: 'Stock Updated!',
    text: 'Product stock and price have been updated successfully.',
    confirmButtonText: 'Back to Products',
    confirmButtonColor: '#f59e0b',
    background: '#ffffff',
    color: '#0f172a',
    iconColor: '#22c55e'
  }).then(() => {
    this.rout.navigate(['/adminmaster/productview']);
  });

} else {

  Swal.fire({
    icon: 'error',
    title: 'Update Failed',
    text: 'Something went wrong while updating stock.',
    confirmButtonColor: '#dc2626'
  });

}


})
}
}
