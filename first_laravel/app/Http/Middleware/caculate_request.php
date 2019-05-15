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
        if($request->session()->has('request_times')){
            $request_times=$request->session()->get('request_times');
            $request_times=$request_times[0]+1;
            $request->session()->put('request_times', "$request_times");
        }else{
            $request->session()->put('request_times','1');
        }
        return $next($request);
    }
}