import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AccountService } from '../service/account-service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  const accountServices = inject(AccountService);

  const user = accountServices.currentUser();

  if(user){
    req = req.clone({
      setHeaders:{
        Authorization : `Bearer ${user.token}`
      }
    })
  }
  return next(req);
};
