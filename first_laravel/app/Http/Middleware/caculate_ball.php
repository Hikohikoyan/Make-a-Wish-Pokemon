<?php
namespace App\Http\Middleware;

use Closure;
use request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Connection;
class caculate_ball
{
    public function handle($request, Closure $next){
        //session_start();
        $openid=45;//$_SESSION['openid'];
        $ball_number1=DB::table('custom_wish')
        ->where('wisher_id',$openid)
        ->where('situation',"已领取")
        ->count();
        $ball_number2=DB::table('custom_wish')
        ->where('helper_id',$openid)
        ->count();
        $total_ball=$ball_number1+$ball_number2;
        $had_fetched1=DB::table('custom_wish')
        ->where('wisher_id',$openid)
        ->where('wisher_open',"已打开")
        ->count();
        $had_fetched2=DB::table('custom_wish')
        ->where('helper_id',$openid)
        ->where('helper_open',"已打开")
        ->count();
        $total_had_fetched=$had_fetched1+$had_fetched2;
        $request->attributes->add(['total_ball'=>$total_ball]);
        $request->attributes->add(['total_had_fetched'=>$total_had_fetched]);
        return $next($request);
    

    }
}