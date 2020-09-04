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



  constructor() { }

  ngOnInit(): void { console.log("Si entraaaa")}

  handleClose(){
    this.close.emit();
  }

}
