import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DbService } from '../../db-service';

@Component({
  selector: 'app-allcategory',
  imports: [RouterModule],
  templateUrl: './allcategory.html',
  styleUrl: './allcategory.scss',
})
export class Allcategory {
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
