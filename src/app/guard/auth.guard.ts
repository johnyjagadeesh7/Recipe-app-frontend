import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Inject,PLATFORM_ID } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  
  
  const router=inject(Router)//this is not a class  to inject by constructor,so here used"Inject" to inject router to this component
  const platformId=inject(PLATFORM_ID)
  
  
  if (isPlatformBrowser(platformId)) {
  if (sessionStorage.getItem('token')) {
    return true;
    
  }else{
    alert("unauthorised access....please login!!!")
    router.navigateByUrl('/')
      return false;
  }
  }
  return true;
};