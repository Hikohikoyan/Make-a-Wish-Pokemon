<?php
namespace APP\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Routing\RouteCollection;
use Illuminate\Support\Facades\Input; 
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Connection;
class conclusion extends Controller
{
    public function individual(Request $request){
        $openid=$request->session()->get('openid');
        $total_help_wish=$request->session()->get('ball_number2');

        $friends1=DB::table('custom_wish')
        ->where('wisher_id',$openid)->where('situation','已领取')->pluck('helper_id');
        $friends2=DB::table('custom_wish')
        ->where('helper_id',$openid)->where('situation','已领取')->pluck('wisher_id');
        $collection=collect([$friends1,$friends2]);
        $collapsed=$collection->collapse();
        $friends_num=$collapsed->unique()->count();//你认识人xx个朋友

        $get_fairy_num=$request->session()->get('total_had_fetched');//你获得了xx个精灵
        $total_wish=DB::table('custom_wish')
        ->where('wisher_id',$openid)
        ->count();//你许下了xx个愿望
    

        $come_ture=$request->session()->get('had_fetched1');//你被实现了的愿望有xx个

        return response()->json(['total_help_wish'=>$total_help_wish,'friends_num'=>$friends_num,
        'get_fairy_num'=>$get_fairy_num,'total_wish'=>$total_wish]);//顺序与策推给的文案相对应
    }
    public function game_statistics(Request $request){
        $fairy_fetched1=DB::table('custom_wish')
        ->where('wisher_open','已打开')
        ->count();
        $fairy_fetched2=DB::table('custom_wish')
        ->where('helper_open','已打开')
        ->count();
        $fairy_fetched=$fairy_fetched1+$fairy_fetched2;//共有xx个精灵被拿走
        
        $wish_cometure_num=DB::table('custom_wish')
        ->where('situation',"已领取")
        ->count();//共有xx个愿望被实现
        
        $write_wish_user_num=DB::table('user')
        ->count();//共有xx人写下愿望

        $helper_num=DB::table('custom_wish')
        ->where('situation','已领取')
        ->select('helper_id')
        ->distinct()
        ->get()
        ->count();//xx人帮人实现愿望
        
        return response()->json(['fairy_fetched'=>$fairy_fetched,'wish_cometure_num'=>$wish_cometure_num,
        'write_wish_user_num'=>$write_wish_user_num,'helper_num'=>$helper_num]);//顺序与策推给的文案相对应

    }
}