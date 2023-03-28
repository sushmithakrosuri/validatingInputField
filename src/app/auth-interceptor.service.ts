import { HttpInterceptor,HttpRequest,HttpHandler,HttpEventType } from "@angular/common/http";
import { tap } from "rxjs";
export class AuthInterceptorService implements HttpInterceptor{
    intercept(
        req: HttpRequest<any>, next: HttpHandler) {
        console.log('sending request interceptor')
        //const authToken = localStorage.getItem('authToken');
        let modifiedReq=req.clone({
            headers:req.headers.append("auth",'abc'), 
            //headers:req.headers.set('Authorization', `Bearer ${authToken}`),
            //url:'http://aabbcc',
            params:req.params.append('hai','hello')
        })
        //return next.handle(modifiedReq)
        return next.handle( modifiedReq).pipe(tap((event)=>{
            console.log(event);
            console.log('response from interceptor')
            if (event.type===HttpEventType.Response){
                console.log(event.body);
            }
        }))
            
        }

}