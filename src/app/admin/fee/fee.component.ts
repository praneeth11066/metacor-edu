import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import * as jsPDF from 'jspdf';
 import 'jspdf-autotable';
 import * as FileSaver from 'file-saver';
 import * as XLSX from 'xlsx';
 const EXCEL_TYPE = 'application/vnd.openxmlformatsofficedocument.spreadsheetml.sheet;charset=UTF-8';
 const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-fee',
  templateUrl: './fee.component.html',
  styleUrls: ['./fee.component.css']
})
export class FeeComponent implements OnInit {
  data:any=[];
  constructor(private ds:DataService) { }

  ngOnInit() {
    this.ds.feeGetData().subscribe((read)=>{
      this.data=read["message"];
      console.log(this.data);
    })
  }
  file:File;
  fileUpload(filedata){
  
  this.file=filedata.target.files[0];
  }
  feeData(data)
  {
    // console.log(data)
    // this.ds.dofee(data).subscribe((res)=>{
    //   console.log(res)
    //  })
 
   let formdata = new FormData();
   this.file=data.target.files[0];
  formdata.append("branch",data.branch);
 // formdata.append("year",data.gyear);
  formdata.append("fee",this.file,this.file.name);
  this.ds.dofee(formdata).subscribe((res)=>{
  if(res["message"]=="fee Sheet uploaded successfully")
  {
  alert(res["message"]);
  }
  else if(res["err_desc"]=="Corupted excel file"){
  alert(res["err_desc"]);
  }
 
 })
}

// download excel

public downloadFile(): void {
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data);
  const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames:
  ['data'] };
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type:
  'array' });
  this.saveAsExcelFile(excelBuffer, 'excelFileName');
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
  const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
  FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() +
  EXCEL_EXTENSION);
  }


 downloadPDF(){  
  const doc = new jsPDF()  
  var col=["BRANCH","NAME","STUDENTID","TOTALFEE","FEEPAID","DUE"]  
  var rows=[];  
  this.data.forEach(element=>{ 
    let branch=element.branch;    
    let name=element.name;    
    let studentid=element.studentid;    
    let totalfee=element.totalfee;    
    let feepaid=element.feepaid;    
    let due=element.due;
  
       let temp=[branch,name,studentid,totalfee,feepaid,due]    
    rows.push(temp)
})  
doc.autoTable(col,rows,{    
  theme:'grid' 
 })  
 doc.save('first.pdf') 
}
}
    