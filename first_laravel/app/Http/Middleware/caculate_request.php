<?php
namespace App\Http\Middleware;

use Closure;
use request;

class caculate_request
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
        if(isset($_SESSION['request_times'])){
            $_SESSION['request_times']=$_SESSION['request_times']+1;
        }else{
            $_SESSION['request_times']=1;
        }
        return $next($request);
    }
}