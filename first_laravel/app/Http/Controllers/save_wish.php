<?php
namespace APP\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Routing\RouteCollection;
use Illuminate\Support\Facades\Input; 
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Connection;
class save_wish extends Controller
{
    
    public function index(Request $request){
        $random_photo_order=mt_rand(1,10);
        echo ($random_photo_order);
        $path="../first_laravel/public"."$random_photo_order".".jpg";
        $wish_content=$request->wish_content;
        $openid=$request->get('openid');
        $wish_times=$request->get('wish_times');
        if($wish_content!=null&&($wish_times<=4)){
            $time=date("m.d");
            DB::insert('insert into custom_wish (id,wish_content,wisher_id,helper_id,situation,wisher_open,helper_open,ball_path,fairy_path,time) values (?,?,?,?,?,?,?,?,?,?)', [NULL,"$wish_content","$openid","NULL","未领取","0","0","NULL","$path","$time"]);
            return response()->json(['errcode'=>0,'errmsg'=>"success",'path'=>$path]);
        }else{
            if($wish_times>4){
                return response()->json(['errcode'=>1,'errmsg'=>"今天的许愿次数已用完，明天再来"]);
            }else{
                return response()->json(['errcode'=>2,'errmsg'=>"输入的内容不能为空"]);
            }  
        }


    }
}