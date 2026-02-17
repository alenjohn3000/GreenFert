import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DbService } from '../../db-service';

@Component({
  selector: 'app-categoryview',
  imports: [RouterLink, CommonModule],
  templateUrl: './categoryview.html',
  styleUrl: './categoryview.scss',
})
export class Categoryview {
public categoryarray:any[]=[];
constructor(private db:DbService,private cdr:ChangeDetectorRef,private router:Router){}
ngOnInit(): void {
this.viewdata();
}

viewdata(){
  this.db.categoryview().then((data:any)=>{
  this.categoryarray=data;
  this.cdr.detectChanges();
})
 
}
}