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
        $friends_num=$collapsed->unique()->count();

        $get_fairy_num=$request->session()->get('total_had_fetched');
        $total_wish=DB::table('custom_wish')
        ->where('wisher_id',$openid)
        ->count();

        $come_ture=$request->session()->get('had_fetched1');

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
        $fairy_fetched=$fairy_fetched1+$fairy_fetched2;
        
        $wish_cometure_num=DB::table('custom_wish')
        ->where('situation',"已领取")
        ->count();
        
        $write_wish_user_num=DB::table('user')
        ->count();

        $helper_num=DB::table('custom_wish')
        ->where('situation','已领取')
        ->select('helper_id')
        ->distinct()
        ->get()
        ->count();
        
        return response()->json(['fairy_fetched'=>$fairy_fetched,'wish_cometure_num'=>$wish_cometure_num,
        'write_wish_user_num'=>$write_wish_user_num,'helper_num'=>$helper_num]);//顺序与策推给的文案相对应



    }
}