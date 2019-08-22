import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { ApiEndpoints } from "./ApiEndpoints";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(req.url);
        console.log(req.body);
        // 不拦截assets和mock-data打头的请求，TODO:改成可配置的方式
        if (req.url.indexOf("assets") != -1
            || req.url.indexOf("mock-data") != -1) {
            return next.handle(req);
        }
        const baseUrl = ApiEndpoints.API_ENDPOINT;
        //NOTE: 这里必须设置withCredentials为true，否则跨域请求不能保持sessionID一致
        const apiReq = req.clone({
            withCredentials: true,
            url: `${baseUrl}${req.url}`
        });
        return next.handle(apiReq);
    }
}
