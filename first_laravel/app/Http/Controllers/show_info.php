<?php
namespace APP\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Routing\RouteCollection;
use Illuminate\Support\Facades\Input; 
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Connection;
class show_info extends Controller
{
    public function index(){
        $exist_code=$request->get('exist_code');
        if($exist_code!=0){
            $name="";
            $telephone="";
            $weixin="";
        }else{
            $get_openid_info=DB::table('user')->where('user_id', 2/*$openid */)->first();
            $name=$get_openid_info->name;
            $telephone=$get_openid_info->telephone;
            $weixin=$get_openid_info->weixin;
        }
        $info_array=[
            'name'=>$name,
            'telephone'=>$telephone,
            'weixin'=>$weixin
        ];
        return response()->json($info_array);
        
    }
}