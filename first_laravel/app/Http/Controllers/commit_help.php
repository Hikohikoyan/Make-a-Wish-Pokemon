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
        $help_times=1;//$request->get('help_times');正式上线时，用//后的值
        $id=9;//$request->id;正式上线时，用//后的值
        $helper_id=36;//$_SESSION['openid'];正式上线时，用//后的值
        if($help_times==2){
            return response()->json(['errcode'=>1,'errmsg'=>"今天祝愿次数已满，请明天再来"]);
        }else{
            $change_situation=DB::table('custom_wish')
                ->where('id',$id)
                ->where('situation',"未领取")
                ->update(['situation'=>"已领取",'helper_id'=>$helper_id]);
            $get_helper_id=DB::table('custom_wish')
            ->where('id',$id)
            ->value('helper_id');
            
            if($get_helper_id!=$helper_id){
                return response()->json(['errcode'=>2,'errmsg'=>"请试试别的愿望"]);
            }else{
                return response()->json(['errcode'=>0,'errmsg'=>"领取成功"]);
            }
        }
    }
 }