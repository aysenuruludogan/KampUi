import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  // Eğer token varsa isteği klonlayıp Authorization header'ı ekliyoruz
if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(authReq);
  }
// Token yoksa isteği değiştirmeden aynen gönderiyoruz
  return next(req);
};
