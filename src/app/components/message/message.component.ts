import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() public isActive: boolean = false;
  @Input() public messageModal: any = {};
  @Output() public close: EventEmitter<any> = new EventEmitter();
  public userInfo: any = {};


  constructor() { }

  ngOnInit(): void {}

  ngOnChanges(){
    this.userInfo["driverName"] = this.messageModal["data"]["Nombre completo"];
    this.userInfo["plate"] = this.messageModal["data"]["Escriba la placa del carro que ingresará"];
    this.userInfo["meet"] = this.messageModal["data"]["REUNIÓN A LA QUE PERTENECE"];
  }

  handleClose(){
    this.close.emit();
  }

}
