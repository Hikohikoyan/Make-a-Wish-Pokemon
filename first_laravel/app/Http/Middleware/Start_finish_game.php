<?php
namespace App\Http\Middleware;

use Closure;
use request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Connection;
class Start_finish_game
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next){
        $nowTime=date("Y-m-d H:i:sa");
        $closeTime = '2019-05-30 00:00:00';
        $startTime = '2019-05-21 20:00:00';
        if($nowTime<$startTime){
            return response("活动还没开始",430);
        }
        if($nowTime>$closeTime){
            return response("来迟了，活动已经结束了哦",431);
        }
         return $next($request);

    }
}