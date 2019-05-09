<?php
namespace App\Http\Middleware;

use Closure;
use request;

class Checklogin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next){
        if($request->words=="s"){
            return redirect('home');
        }
        return $next($request);
    }
}