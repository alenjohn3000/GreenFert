import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DbService } from '../../db-service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ordermasterview',
  imports: [RouterModule,CommonModule],
  templateUrl: './ordermasterview.html',
  styleUrl: './ordermasterview.scss',
})
export class Ordermasterview {
  order_id:any;
     public orderDetails:any[]=[];

  constructor(private fb:FormBuilder, private router:ActivatedRoute,private rout:Router,private dbservice:DbService, private cdr:ChangeDetectorRef){

 router.paramMap.subscribe((params)=>{
    this.order_id=params.get('id');
})
  }
 ngOnInit(): void
    {
    this.viewdata();
     
    }
viewdata(){
  this.dbservice.ordermview({orderid:this.order_id}).then((data:any)=>{
  this.orderDetails=data;
  this.cdr.detectChanges();
})
}

sendToDelivery(data:any){
   

  this.dbservice.senttodel({data}).then((confirmation:any)=>{ 
  
      if (confirmation.message === 'success') {

        
      Swal.fire({
        icon: 'success',
        title: 'Order Dispatched',
        text: 'The order has been successfully sent to delivery.',
        confirmButtonText: 'OK',
        confirmButtonColor: '#4f46e5',
        iconColor: '#22c55e'
      }).then(() => {
        this.viewdata();
      });

    } else {

      Swal.fire({
        icon: 'error',
        title: 'Dispatch Failed',
        text: 'Unable to send the order to delivery. Please try again.',
        confirmButtonColor: '#dc2626'
      });

      this.viewdata();
    }
    })
  }

}
