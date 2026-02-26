import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {


  const router=inject(Router)//this is not a class  to inject by constructor,so here used"Inject" to inject router to this component
  if (sessionStorage.getItem('token')) {
    return true;
    
  }else{
    alert("unauthorised access....please login!!!")
    router.navigateByUrl('/')
      return false;
  }

};