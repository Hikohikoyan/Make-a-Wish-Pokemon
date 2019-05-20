<?php
namespace APP\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Routing\RouteCollection;
use Illuminate\Support\Facades\Input; 
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Connection;
use Illuminate\Support\Facades\Validator;
class user_info extends Controller
{
    public function commit_info(Request $request){
        $exist_code=$request->session()->get('exist_code');        
        $name=$request->name;
        $telephone=$request->telephone;
        $weixin=$request->weixin;
        $validator = Validator::make($request->all(), [
            'name' => 'required|alpha|min:2',
            'telephone' => 'required|digits:11', 
            'weixin' => 'alpha_dash',
          ]);

        if ($validator->fails()) {
             return response()->json(['errcode'=>2,'errmsg'=>"请检查输入的信息是否正确",'error'=>$validator->messages()]); 
        }

        $openid=$request->session()->get('openid');
        if($exist_code!=0){
            DB::table('user')
            ->where('user_id', $openid)
            ->update(['name' => $name,'telephone'=>$telephone,'weixin'=>$weixin]);
            return response()->json(['errcode'=>0,'errmsg'=>"修改成功"]);
        }else{
            DB::table('user')->insert(['id'=>NULL,'user_id'=>$openid,'name'=>$name,'telephone'=>$telephone,'weixin'=>$weixin,]);
            return response()->json(['errcode'=>1,'errmsg'=>"添加信息成功"]);
        }
    }

    public function after_help_show_info( Request $request){
        $id=$request->id;
        $openid=$request->session()->get('openid');        

        $validator = Validator::make($request->all(), [
            'id' => 'required|integer',
        ]);
        if($validator->fails()){
            return response()->json(['errcode'=>77,'errmsg'=>"id 不是个整数"])->setEncodingOptions(JSON_UNESCAPED_UNICODE);
        }
        $user_id=DB::table('custom_wish')
        ->where('id',$id)
        ->select('wisher_id','helper_id')
        ->get();

        if($user_id[0]->helper_id!=$openid){
            return response()->json(['errcode'=>433,'errmsg'=>"You don't have right "]);
        }
        $wish_info=DB::table('user')
        ->where('user_id',$user_id[0]->wisher_id)
        ->select('name','telephone','weixin')
        ->get();
        return response()->json($wish_info[0]);
    }
}