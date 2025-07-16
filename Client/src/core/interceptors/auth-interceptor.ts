import { HttpInterceptorFn } from '@angular/common/http';
import { User } from '../../types/user';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  const userString = localStorage.getItem('user');
  const user: User | null = userString ? JSON.parse(userString) : null;
  const token = user?.token;

  if (token) {
    const modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(modifiedReq);
  }

  return next(req);
};
