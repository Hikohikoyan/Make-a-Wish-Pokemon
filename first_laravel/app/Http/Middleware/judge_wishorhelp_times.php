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
        $openid=$request->session()->get('openid');
        $date=date("m.d");
        $wish_times=DB::table('custom_wish')
        ->where('wisher_id',"$openid")
        ->where('time1',$date)
        ->count();
        $help_times=DB::table('custom_wish')
        ->where('helper_id',"$openid")
        ->where('time2',$date)
        ->count();
        $request->attributes->add(['wish_times'=>$wish_times]);
        $request->attributes->add(['help_times'=>$help_times]);
        return $next($request);
    }
}