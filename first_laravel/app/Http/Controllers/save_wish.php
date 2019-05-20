<?php
namespace APP\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Routing\RouteCollection;
use Illuminate\Support\Facades\Input; 
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Connection;
use Validator;
class save_wish extends Controller
{
    
    public function index(Request $request){
        $random_photo_order=mt_rand(1,10);
        $path="img/"."fairy/"."$random_photo_order".".png";
        $wish_content=$request->wish_content;
        $openid=$request->session()->get('openid');
        $wish_times=$request->get('wish_times');
        $validator = Validator::make($request->all(), [
            'wish_content' => 'required', 
          ]);
        if ($validator->fails()) {
            return response()->json(['errcode'=>2,'errmsg'=>"请再检查一下你输入的内容"]);
        }
        $exist_code=$request->session()->get('exist_code');
        if($exist_code==0){
            $name=" ";
            $telephone=" ";
            $weixin=" ";
        }else{
            $get_openid_info=DB::table('user')->where('user_id', $openid)->first();
            $name=$get_openid_info->name;
            $telephone=$get_openid_info->telephone;
            $weixin=$get_openid_info->weixin;
        }
        

        if($wish_times<3){
            $time=date("m.d");
            $aa=DB::table('custom_wish')->insert(['wish_content'=>$wish_content,'wisher_id'=>$openid,'helper_id'=>"NULL",'situation'=>"未领取",'wisher_open'=>0,'helper_open'=>0,'fairy_path'=>$path,'time1'=>$time,'time2'=>"0"]); 
            return response()->json(['errcode'=>0,'errmsg'=>"success",'path'=>$path,'name'=>$name,'telephone'=>$telephone,'weixin'=>$weixin]);
        }else{
                return response()->json(['errcode'=>1,'errmsg'=>"今天的许愿次数已用完，明天再来"]);
        
        }
    }
}