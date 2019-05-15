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
        $path="../first_laravel/public/"."fairy"."$random_photo_order".".png";
        $wish_content=$request->wish_content;
        $openid=$request->session()->get('openid');
        $wish_times=$request->get('wish_times');
        
        $exist_code=$request->get('exist_code');
        if($exist_code!=0){
            $name="";
            $telephone="";
            $weixin="";
        }else{
            $get_openid_info=DB::table('user')->where('user_id', $openid)->first();
            $name=$get_openid_info->name;
            $telephone=$get_openid_info->telephone;
            $weixin=$get_openid_info->weixin;
        }
        

        if($wish_content!=null&&($wish_times<=3)){
            $time=date("m.d");
            DB::insert('insert into custom_wish (id,wish_content,wisher_id,helper_id,situation,wisher_open,helper_open,ball_path,fairy_path,time) values (?,?,?,?,?,?,?,?,?,?)', [NULL,"$wish_content","$openid","NULL","未领取","0","0","NULL","$path","$time"]);
            return response()->json(['errcode'=>0,'errmsg'=>"success",'path'=>$path,'name'=>$name,'telephone'=>$telephone,'weixin'=>$weixin]);
        }else{
            if($wish_times==4){
                return response()->json(['errcode'=>1,'errmsg'=>"今天的许愿次数已用完，明天再来"]);
            }else{
                return response()->json(['errcode'=>2,'errmsg'=>"输入的内容不能为空"]);
            }  
        }


    }
}