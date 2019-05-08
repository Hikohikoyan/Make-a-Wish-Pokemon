<?php
namespace APP\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Routing\RouteCollection;
use Illuminate\Support\Facades\Input; 
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Connection;
class commit_info extends Controller
{
    public function index(Request $request){
        $exist_code=$request->get('exist_code');
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
}