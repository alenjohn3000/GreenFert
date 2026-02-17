import { ChangeDetectorRef, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DbService } from '../../db-service';

@Component({
  selector: 'app-wcassignview',
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './wcassignview.html',
  styleUrl: './wcassignview.scss',
})
export class Wcassignview {

  selectedImage: string | null = null;
  public asarray: any[] = [];

  public wcarray: any[] = [];
  constructor(private db: DbService, private cdr: ChangeDetectorRef, private router: Router) { }
  ngOnInit(): void {
    this.viewdata();
  }

  viewdata() {
    this.db.wcview().then((data: any) => {
      this.wcarray = data;
      this.cdr.detectChanges();
    })
   
  }

  

  
 
}
