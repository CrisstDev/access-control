import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public identificationForm: FormGroup;
  public activeModal: boolean = false;
  public isLoading: boolean = false;
  public messageModal: any = { status: true, message: "", data: {} };

  constructor(private _databaseService: DatabaseService, private fb: FormBuilder,) { }

  ngOnInit(): void { this.buildForm(); }

  buildForm() {
    //build formbuilder group
    this.identificationForm = this.fb.group({
      identification: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  get form() {
    return this.identificationForm.controls;
  }

  handleSubmit() {
    //Start loading
    this.isLoading = true;

    //Get all list from firebase
    this._databaseService.getData().subscribe((res) => {

      //asign value and call filter
      let identification = this.form.identification.value;
      let filtered = this.filter(res, identification);

      //Wait some moment to filter
      setTimeout(() => {
        this.isLoading = false;

        //validate filter
        if(filtered.length > 0){
          this.messageModal.status = true;
          this.messageModal.message = "El usuario se encuentra registrado.";
          this.messageModal.data = filtered[0];
        }else{
          this.messageModal.status = false;
          this.messageModal.message = "Lo sentimos, el usuario no existe.";
        }
        //active modal
        this.activeModal = true;
      })

    }, err => { throw err; })
  }

  filter(res: any, identification) {
    //filter data
    return res.filter(filter => {
      return (filter["Numero de Documento"] === parseInt(identification))
        || (filter["Numero de Documento__1"] === parseInt(identification))
        || (filter["Numero de Documento__2"] === parseInt(identification))
        || (filter["Numero de Documento__3"] === parseInt(identification))
    });
  }

  numberOnly = (event): boolean => {
    //validate number only
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}
