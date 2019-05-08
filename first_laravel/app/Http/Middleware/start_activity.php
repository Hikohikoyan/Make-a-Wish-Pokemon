<?php
namespace App\Http\Middleware;

use Closure;
use request;
use Illuminate\Support\Facades\View;

class start_activity
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next){
        date_default_timezone_set('PRC');
        $nowTime=date("Y-m-d-h-i-sa");
        $closeTime = '2019-05-21 00:00:00';
        $startTime = '2019-05-08 00:00:00';
        if($nowTime<$startTime){
            return response()->json(['errcode'=>111,'errmsg'=>"活动还未开放"]);//redirect('notopen.html');//设置了两种
            
        }else{
            if($nowTime>$closeTime){
                return response()->json(['errcode'=>999,'errmsg'=>"很遗憾，活动结束了"]);//redirect('over.html');
                
            }else{
                return $next($request);
            }
        }
    }
}