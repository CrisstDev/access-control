import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() public isActive: boolean = false;
  @Input() public messageModal: any = {};
  @Output() public close: EventEmitter<any> = new EventEmitter();
  public registerForm: FormGroup;
  public userInfo: any = {};

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void { this.buildForm(); }

  buildForm(){
    this.registerForm = this.fb.group({
      temperature: [null, Validators.required]
    });
  }

  get form(){
    return this.registerForm.controls;
  }

  ngOnChanges(){
    if(this.messageModal.status){
      this.userInfo["identification"] = this.messageModal["data"]["Numero de Documento"];
      this.userInfo["driverName"] = this.messageModal["data"]["Nombre completo"].trim();
      this.userInfo["license"] = this.messageModal["data"]["Escriba la placa del carro que ingresará"].trim();
      this.userInfo["meet"] = this.messageModal["data"]["REUNIÓN A LA QUE PERTENECE"].trim();
    }
  }

  handleClose(){
    this.close.emit(false);
  }

  onSubmit(){
    if(this.registerForm.invalid){
      return;
    }
    const { identification, license } = this.userInfo;
    this.form.temperature.setValue(parseFloat(this.form.temperature.value.trim()));
    const { temperature } = this.registerForm.getRawValue();
    this.close.emit({ identification, license, temperature });
  }

}
