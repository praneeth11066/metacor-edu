import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import * as jsPDF from 'jspdf'; 
import 'jspdf-autotable';
import * as FileSaver from 'file-saver'; 
import * as XLSX from 'xlsx'; 
const EXCEL_TYPE = 'application/vnd.openxmlformatsofficedocument.spreadsheetml.sheet;charset=UTF-8'; 
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-placement',
  templateUrl: './placement.component.html',
  styleUrls: ['./placement.component.css']
})
export class PlacementComponent implements OnInit {
  data:any=[];
  constructor(private ds:DataService) { }

  file:File;
  fileUpload(filedata){
  
  this.file=filedata.target.files[0];
  }
  placementData(data)
  {
    console.log(data)
  
 
   let formdata = new FormData();
   this.file=data.target.files[0];
  //formdata.append("branch",data.branch);
  //formdata.append("year",data.gyear);
  formdata.append("placement",this.file,this.file.name);
    console.log(formdata);
    
  this.ds.uploadplacement(formdata).subscribe((res)=>{
  if(res["message"]=="placement Sheet uploaded successfully")
  {
  alert(res["message"]);
  }
  else if(res["err_desc"]=="Corupted excel file"){
  alert(res["err_desc"]);
  }
 
 })
}

ngOnInit() {
  this.ds.placementGetData().subscribe((read)=>{
    this.data=read["message"]
    console.log(this.data);
  })
}

//download pdf file from html
downloadPDF(){  
  const doc = new jsPDF()  
  var col=["BRANCH","COMPANYNAME","JOBDESCRIPTION","REQUIREMENTS","JOBROLE","NOOFROUNDS","NOOFVACANCIES","PACKAGEDETAILS"]  
  var rows=[];  
  this.data.forEach(element=>{ 
    let branch=element.branch;    
    let companyname=element.companyname;    
    let jobdescription=element.jobdescription;    
    let requirements=element.requirements;    
    let jobrole=element.jobrole;    
    let noofrounds=element.noofrounds;
    let noofvancancies=element.noofvancancies;
    let packagedetails=element.packagedetails;
       let temp=[branch,companyname,jobdescription,requirements,jobrole,noofrounds,noofvancancies,packagedetails]    
    rows.push(temp)
})  
doc.autoTable(col,rows,{    
  theme:'grid' 
 })  
 doc.save('first.pdf') 
}

  


//download excel

public downloadFile(): void { 
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data);
   const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] }; 
   const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type:'array' });
 
   this.saveAsExcelFile(excelBuffer, 'excelFileName'); }
private saveAsExcelFile(buffer: any, fileName: string): void {
   const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
}
}
    
  
 
  