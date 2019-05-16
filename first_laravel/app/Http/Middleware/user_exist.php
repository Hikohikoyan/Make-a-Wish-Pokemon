<?php
namespace App\Http\Middleware;

use Closure;
use request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Connection;
class user_exist
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next){
        
        $openid=$request->session()->get('openid');
        $exist_code=DB::table('user')->where('user_id', $openid)->count();
        $request->attributes->add(['exist_code'=>$exist_code]);
        return $next($request);
    }
}