import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DbService } from '../../db-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customermaster',
  imports: [RouterModule,CommonModule],
  templateUrl: './customermaster.html',
  styleUrl: './customermaster.scss',
})
export class Customermaster {
  constructor(private fb:FormBuilder, private router:ActivatedRoute,private rout:Router,private dbservice:DbService, private cdr:ChangeDetectorRef){
  }
  carray:any[]=[];

ngOnInit(): void {
    this.viewdata();
  }

 cartCount: number = 0;

viewdata() {
  this.dbservice.cartnum({
    loginid: localStorage.getItem('login_id')
  }).then((data: any) => {

    this.cartCount = data[0]?.cartCount || 0;
this.cdr.detectChanges();
  });


}
logout(){
  
}
}
