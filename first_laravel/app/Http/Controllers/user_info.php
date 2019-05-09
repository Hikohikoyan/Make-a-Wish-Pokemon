<?php
namespace APP\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Routing\RouteCollection;
use Illuminate\Support\Facades\Input; 
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Connection;
class user_info extends Controller
{
    public function commit_info(Request $request){
        $exist_code=1;//$request->get('exist_code');
        $name=$request->name;
        $telephone=$request->telephone;
        $weixin=$request->weixin;
        if($name!=null && $telephone!=null && $weixin!=null){
            if($exist_code==0){
                DB::table('user')
                ->where('user_id', $_SESSION['openid'])
                ->update(['name' => "$name",'telephone'=>"$telephone",'weixin'=>"$weixin"]);
                return response()->json(['errcode'=>0,'errmsg'=>"修改成功"]);
            }else{
                DB::insert('insert into user (id, user_id,name,telephone,weixin) values (?,?,?,?,?)', [null, $_SESSION['openid'],$name,$telephone,$weixin]);
                return response()->json(['errcode'=>1,'errmsg'=>"添加信息成功"]);

            }
        }else{
            return response()->json(['errcode'=>2,'errmsg'=>"信息不能为空"]);
        }
    }

    public function show_info(){
        $exist_code=0;//$request->get('exist_code');
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

    public function after_help_show_info( Request $request){
        $wisher_id=$request->wisher_id;
        $wish_info=DB::table('user')
        ->where('user_id',$wisher_id)
        ->first();
        return response()->json([$wish_info]);
    }
}