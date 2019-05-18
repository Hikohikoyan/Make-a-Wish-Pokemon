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
        $request->session()->put('openid', "8");//部署的时候要删去这一行
        if($request->session()->has('openid')){
            return $next($request);
        }else{
           redirect("https://hemc.100steps.net/2018/fireman/auth.php?redirect=182.254.161.178/pokemon/Check_login&state=xxx");
           //return response()->json(['errcode'=>456,'errmsg'=>'未授权']);
        }
    }
}
