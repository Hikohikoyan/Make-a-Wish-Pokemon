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
        session_start();
        $_SESSION['openid']=4;
        $exist=DB::table('user')->where('user_id', $_SESSION['openid'])->exists();
        if($exist==false){
            $exist_code=123;
        }else{
            $exist_code=0;
        }
        $request->attributes->add(['exist_code'=>$exist_code]);
        return $next($request);
    }
}