import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import { isPlatformBrowser } from '@angular/common';
import { Inject,PLATFORM_ID } from '@angular/core';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
//ppty
userCount:number=0
downloadCount:number=0
requestCount:number=0
recipeCount:number=0

isSideBarOpen:boolean=true

//calender ppty
selected=new Date()

//chart ppty
Highcharts: typeof Highcharts = Highcharts;



constructor(private api:ApiService,private router:Router, @Inject(PLATFORM_ID) private platformId:object){}
//chart
  chartOptions: Highcharts.Options = {
  chart:{
    type:'bar'
  },
  title:{
    text:"analysis of download recipes based on cuisine" ,
    align:'left'
  },
  xAxis:{
    type:'category'
  },
  yAxis:{
    title:{
      text:"total download recipe count"
    }
  },
  legend:{
    enabled:false
  },
  credits:{
    enabled:false
  },
  series:[{
    name:'cuisine',
    colorByPoint:true,
    type:'bar',
    data:[
      {
        name:'Italian',
        y:4
      },
       {
        name:'Asian',
        y:3
      },
       {
        name:'American',
        y:1
      },
       {
        name:'Mexican',
        y:2
      },
    ]
  }]

  }

//...charts end



ngOnInit(){
  this.getAllusercount()
  this.getDownloadcount()
  this.getRecipecount()
  this.getRequestcount()
}

getAllusercount(){
  this.api.allUsersListAPI().subscribe((res:any)=>{
    this.userCount=res.length
  })
}


getDownloadcount(){
  this.api.allDownloadListAPI().subscribe((res:any)=>{
    this.downloadCount=res.length
  })
}

getRecipecount(){
  this.api.getAllRecipeAPI().subscribe((res:any)=>{
    this.recipeCount=res.length
  })
}

getRequestcount(){//no. of request of client testimonials to be approved by admin
  this.api.getAllTestimonyAPI().subscribe((res:any)=>{
    this.requestCount=res.filter((item:any)=>item.status=="pending").length//here we used filter to find only status of testimony is pending ....for approval from admin
  })
}


//menu btn click...open and close <app-sidebar>
menuBtnClick(){
  this.isSideBarOpen=!this.isSideBarOpen
}

//logout from admin dashboard
logOut(){
  if (isPlatformBrowser(this.platformId)) {
  sessionStorage.clear()
  this.router.navigateByUrl('/')
}

}


}
