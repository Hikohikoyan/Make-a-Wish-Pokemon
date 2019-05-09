<?php
namespace APP\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Routing\RouteCollection;
use Illuminate\Support\Facades\Input; 
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Connection;
class open_ball extends Controller
{
    public function index( Request $request){
        session_start();
        $openid=45;//$_SESSION['openid'];
        $open_ball_object=DB::table('custom_wish')
        ->where('wisher_id',$openid)
        ->where('situation',"已领取")
        ->where('wisher_open',"0")
        ->orwhere('helper_id',$openid)
        ->where('situation',"已领取")
        ->where('helper_open',"0")
        ->first();
        if($open_ball_object==null){
            return response()->json(['errcode'=>235,'errmsg'=>"已经没有空的精灵球了"]);
        }else{
            $id=$open_ball_object->id;
            if(($open_ball_object->wisher_id)==$openid){
                DB::table('custom_wish')
                ->where('id',$id)
                ->update(['wisher_open'=>"已打开"]);
                
            }else{
                DB::table('custom_wish')
                ->where('id',$id)
                ->update(['helper_open'=>"已打开"]);
            }
            return response()->json(['errcode'=>0,'errmsg'=>"孵化成功",'detailed_msg'=>$open_ball_object]);
        }
    }
}