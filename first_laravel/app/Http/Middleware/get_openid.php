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
        session_start();
        if(isset($_SESSION['openid'])){
            $openid=45;//$_SESSION['openid];
            $request->attributes->add(['openid'=>$openid]);
            return $next($request);
        }else{
            return response()->json(['errcode'=>456,'errmsg'=>'未授权']);
        }
    }
}