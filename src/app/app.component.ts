import { Component, ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ServerServiceService} from 'src/app/server-service.service';

import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AppComponent {
  title = 'RAM';
  columnsToDisplay = ['Brand', 'Model', 'Ttype'];
  expandedRAMS: RAMBrands;
  allRamsData: any = [];

  // define method connecting to the server to get data from database
  constructor(private myService: ServerServiceService, public dialog: MatDialog ) { 
    this.ramsData();
  }

  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '450px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Update'){
        this.updateRowData(result.data);
      }
    });
  }

  updateRowData(row_obj){
    this.allRamsData = this.allRamsData.filter((value,key)=>{
      console.log("logging obg " + JSON.stringify (row_obj))
      this.myService.editRams(row_obj).subscribe(res => {})
      return true;
    });
  }

  ramsData() {
     this.myService.getRams().subscribe(
     res => { this.allRamsData = res
      })
  }
}
export interface RAMBrands {
  Brand: string;
  Model: string;
  Ttype: string;
  Clock_speed: string;
  Size: string;
  CAS_latency: number;
  ECC_status: string;
  Price: number;
}




