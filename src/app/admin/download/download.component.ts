import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrl: './download.component.css'
})
export class DownloadComponent {

  //ppty for storing downloadlist
  allDownloads:any=[]

  constructor(private api:ApiService){}

  ngOnInit(){
    this.getAllDownloads()
  }


  // mtds

  getAllDownloads(){
    this.api.allDownloadListAPI().subscribe((res:any)=>{
      this.allDownloads=res
      console.log(this.allDownloads);
      

    })
  }

}
