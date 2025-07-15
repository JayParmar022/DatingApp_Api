import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastService } from '../service/toast-service';
import { NavigationExtras, Router } from '@angular/router';
import { catchError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);
  const router = inject(Router);

  return next(req).pipe(
    catchError(error => {
      if(error){
        switch(error.status){
          case 400:
            if(error.error.errors){
              const modelStateError = [];
              for(const key in error.error.errors){
                if(error.error.errors[key]){
                modelStateError.push(error.error.errors[key])
                }
              }
              throw modelStateError.flat()
            } else{
              toast.error(error.error)
            }
            break;

          case 401:
            toast.error('Unauthorized');
            break;

          case 404:
            router.navigateByUrl('/not-found');
            break;

          case 500:
            const navigationExtras : NavigationExtras = {state: {error:error.error}}
            router.navigateByUrl('server-error',navigationExtras)
            break;

          default:
            toast.error('Somthing Went Wrong');
            break;
        }
      }
      throw error;
    })
    )
};
