<?php
namespace App\Http\Middleware;

use Closure;
use request;

class get_openid
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next){
        $request->session()->put('openid', "45");//部署时删除这一行
        if($request->session()->has('openid')){
        
            return $next($request);
        }else{
            
           return response()->json(['errcode'=>456,'errmsg'=>'未授权']);
        }
    }
}