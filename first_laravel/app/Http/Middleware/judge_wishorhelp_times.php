<?php
namespace App\Http\Middleware;

use Closure;
use request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Connection;
class judge_wishorhelp_times
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next){
        //session_start();
        $date=date("m.d");
        $wish_times=DB::table('custom_wish')
        ->where('wisher_id',$_SESSION['openid'])
        ->where('time',$date)
        ->count();
        $help_times=DB::table('custom_wish')
        ->where('helper_id',$_SESSION['openid'])
        ->where('time',$date)
        ->count();
        $request->attributes->add(['wish_times'=>$wish_times]);
        $request->attributes->add(['help_times'=>$help_times]);
        return $next($request);
    }
}