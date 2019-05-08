<?php
namespace App\Http\Middleware;

use Closure;

class checklogin{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function index($request, Closure $next){
        /*if($request->words!="s"){
            //return redirect('home');

        }*/
        return $next($request);
    }
}