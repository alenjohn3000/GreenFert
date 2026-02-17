import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DbService } from '../../db-service';

@Component({
  selector: 'app-orderview',
  imports: [RouterModule,CommonModule],
  templateUrl: './orderview.html',
  styleUrl: './orderview.scss',
})
export class Orderview {
  constructor(private db:DbService,private cdr:ChangeDetectorRef,private router:Router){}

   public orderarray:any[]=[];
   ngOnInit(): void
    {
    this.viewdata();
    }
viewdata(){
  this.db.orderview().then((data:any)=>{
  this.orderarray=data;
  this.cdr.detectChanges();
})
}




viewDetails(data:any)
{
   this.db.districtview().then((data:any)=>{
  this.orderarray=data;
  this.cdr.detectChanges();
})
}
sendToDelivery(data:any){

  this.db.senttodel({data}).then((confirmation:any)=>{ 
      if(confirmation.message == "success") 
      { 
        alert('Sent to delivery Successfully'); 
        this.viewdata();
      } 
      else
          { 
        alert('Failed sent to delivery'); 
        this.viewdata(); 
      } 
    })
  
  

}
}
