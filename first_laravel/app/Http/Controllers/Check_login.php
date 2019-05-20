<?php
namespace APP\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Routing\RouteCollection;
use Illuminate\Support\Facades\DB; 
use Illuminate\Support\Facades\Storage; 
class Check_login extends Controller
{
    
    public function index( Request $request){
        $params = $request->all();
        $token=$params['token'];
        $sign=$params['sign'];
        $origin_token=$token;
        $token=json_decode(base64_decode($token),true);
        if(md5(sha1($origin_token.'afnweof!@#@#$sdf1334dcsS'))!==$sign||empty($token['openid'])){
            return redirect('https://hemc.100steps.net/2019/wish-pokemon-test/index.html?fail=true');
        }
        $request->session()->put('openid',$token['openid']);
        $request->session()->put('nickname',$token['nickname']);
        $request->session()->put('headpic',$token['avatar']);
        return redirect('https://hemc.100steps.net/2019/wish-pokemon-test/index.html');

    }
}