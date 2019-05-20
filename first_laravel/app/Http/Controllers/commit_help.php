<?php
namespace APP\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Routing\RouteCollection;
use Illuminate\Support\Facades\Input; 
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Connection;
class commit_help extends Controller
{
    public function index( Request $request){
        $help_times=$request->get('help_times');
        $id=$request->id;
        $helper_id=$request->session()->get('openid');
        $time=date("m.d");
        
        if($help_times==2){
            return response()->json(['errcode'=>1,'errmsg'=>"今天助愿次数已满，明天再来叭"]);
        }else{
            $change_situation=DB::table('custom_wish')
            ->where([['id',$id],['helper_id',"NULL"],['situation',"未领取"]])
             ->update(['situation'=>"已领取",'helper_id'=>$helper_id,'time2'=>$time]);
            
            if($change_situation==0){
                return response()->json(['errcode'=>2,'errmsg'=>"请试试别的愿望"]);
            }else{
                return response()->json(['errcode'=>0,'errmsg'=>"领取愿望成功，恭喜你获得了一只精灵球，快去打开看看吧"]);
            }
        }
    }
 }