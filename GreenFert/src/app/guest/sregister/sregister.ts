import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router, RouterModule } from '@angular/router';
import { DbService } from '../../db-service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sregister',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './sregister.html',
  styleUrl: './sregister.scss',
})
export class Sregister {
  shopfg!:FormGroup;
public locationarray:any[]=[];
public districtarray:any[]=[];
selectedFiles?:FileList;
  currentfile?:any;
  fileinfos?:Observable<any>;
  message='';
  savestatus=false;
constructor(private fb:FormBuilder,private dbservice:DbService,private rout:Router,private cdr:ChangeDetectorRef){}
ngOnInit(): void {
  this.viewdata();

   this.shopfg=this.fb.group({
   shopname:['',[Validators.required, Validators.minLength(3)]],
    shopemail:['',[Validators.required, Validators.email]],
    contact:['',[Validators.required, Validators.pattern('[0-9]{10}')]],
    image:['',[Validators.required]],
    locationid:['',[Validators.required]],
    shoplicence:['',[Validators.required, Validators.minLength(3)]],
    districtid:['',[Validators.required]],
  username:['',[Validators.required, Validators.minLength(4), Validators.pattern('[a-zA-Z0-9_]*')]],
  password:['',[Validators.required, Validators.minLength(6)]]
  });
}
selectFile(event:any): void{
  this.selectedFiles=event.target.files;
}
viewdata(){
   this.dbservice.dlocation().then((data: any) => { 
      this.locationarray = data; 
  this.cdr.detectChanges();
  
 });
  

}
onchange() 
{
    const id = this.shopfg.value.districtid;
  console.log(id)
this.dbservice.ddistrict({id}).then((data: any) => { 
      this.districtarray = data; 
  this.cdr.detectChanges();
})
 
}


sreg(){
  if (!this.shopfg.valid) {
    this.savestatus = true;
    return;
  }
  if(this.selectedFiles){
    const file:File|null=this.selectedFiles.item(0);
    if(file){
      this.currentfile=file;
      this.dbservice.upload(this.currentfile).subscribe(
        (event:any)=>{
          this.message=event.body.message;
    });
  this.shopfg.value.image=this.currentfile.name;

this.dbservice.sregisteraction(this.shopfg.value).then((result:any)=>{
    if(result.message=='success')
    {
      alert('shop register request sent successfully');  
             this.rout.navigate(['/login']); 
 
    }
    else
    {
      alert('Error Occurred');
      
    }
  })
}
  }
}
}
