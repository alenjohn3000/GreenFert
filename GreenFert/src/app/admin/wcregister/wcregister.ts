import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { DbService } from '../../db-service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-wcregister',
  imports: [RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './wcregister.html',
  styleUrl: './wcregister.scss',
})
export class Wcregister {
 wcfg!: FormGroup;
  savestatus=false;

  public locationarray: any[] = [];
  public districtarray: any[] = [];

  selectedFiles?: FileList;
  currentfile?: File;
  fileinfos?: Observable<any>;
  message = '';

  // 🔥 IMAGE PREVIEW
  previewUrl: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private dbservice: DbService,
    private rout: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.viewdata();

    this.wcfg = this.fb.group({
      name: ['',[Validators.required,Validators.minLength(3),Validators.pattern('^[a-zA-Z ]+$')]],
      email: ['',[Validators.required,Validators.email]],
      contact: ['',[Validators.required,Validators.pattern('^[0-9]{10}$')]],
      image: ['',[Validators.required]],
      locationid: ['',[Validators.required]],
      districtid: ['',[Validators.required]],
      username: ['',[Validators.required,Validators.minLength(4)]],
      password: ['',[Validators.required,Validators.minLength(6)]]
    });

  }

  /* ===============================
     IMAGE SELECT + PREVIEW
  ================================ */
  selectFile(event: any): void {

    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file: File = files[0];

    // Validate image type
    if (!file.type.startsWith('image/')) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid File',
        text: 'Please select a valid image file.'
      });
      return;
    }

    this.selectedFiles = files;
    this.currentfile = file;

    // Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
      this.cdr.detectChanges();
    };
    reader.readAsDataURL(file);
  }

  /* ===============================
     LOAD DISTRICTS
  ================================ */
  viewdata() {
    this.dbservice.dlocation().then((data: any) => {
      this.locationarray = data;
      this.cdr.detectChanges();
    });
  }

  /* ===============================
     LOAD LOCATIONS ON DISTRICT CHANGE
  ================================ */
  onchange() {

    const id = this.wcfg.value.districtid;

    this.dbservice.ddistrict({ id }).then((data: any) => {
      this.districtarray = data;
      this.cdr.detectChanges();
    });

  }

  /* ===============================
     REGISTER COLLECTOR
  ================================ */
  wcregister() {
    if (!this.wcfg.valid) {
      this.savestatus = true;
      return;
    }

    if (!this.currentfile) {
      Swal.fire({
        icon: 'warning',
        title: 'Image Required',
        text: 'Please upload collector image.'
      });
      return;
    }

    // Upload image first
    this.dbservice.upload(this.currentfile).subscribe((event: any) => {

      if (event?.body?.message) {
        this.message = event.body.message;
      }

    });

    // Patch image name safely
    this.wcfg.patchValue({
      image: this.currentfile.name
    });

    // Submit form
    this.dbservice.wcregisteraction(this.wcfg.value).then((result: any) => {

      if (result.message === 'success') {

        Swal.fire({
          icon: 'success',
          title: 'Collector Registered',
          text: 'Waste collector registered successfully.',
          confirmButtonColor: '#f59e0b'
        }).then(() => {
          this.rout.navigate(['/adminmaster/wcview']);
        });

      } else {

        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'Something went wrong. Please try again.',
          confirmButtonColor: '#dc2626'
        });

      }

    });

  }

}
