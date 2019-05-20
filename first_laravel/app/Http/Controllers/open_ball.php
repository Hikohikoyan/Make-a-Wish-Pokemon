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
        $openid=$request->session()->get('openid');
        $open_ball_object=DB::table('custom_wish')
        ->where(['wisher_id',$openid], ['situation',"已领取"], ['wisher_open',"0"])
        ->orwhere(['helper_id',$openid], ['situation',"已领取"], ['helper_open',"0"])
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
            $fairy_path=DB::table('custom_wish')
            ->where('id',$id)
            ->value('fairy_path');
            return response()->json(['errcode'=>0,'errmsg'=>"孵化成功",'fairy_path'=>$fairy_path]);
        }
    }
}