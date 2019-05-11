<?php
namespace APP\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Routing\RouteCollection;
use Illuminate\Support\Facades\Input; 
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Connection;
class show_list extends Controller
{
    
    public function ball_list( Request $request){
        $total_ball=$request->session()->get('total_ball');//一共拥有的精灵球数
        $total_had_fetched=$request->session()->get('total_had_fetched');//已打开的精灵球数
        $ball_path="../first_laravel/public/photo/pokeball.png";
        return response()->json(['total_ball'=>$total_ball,'total_had_fetched'=>$total_had_fetched,'ball_path'=>$ball_path]);
    }
    public function fairy_list( Request $request){
        $fairy_num=$request->session()->get('total_had_fetched');
        $path_array=array();
        $openid=45;
        $fairy_photo_path1=DB::table('custom_wish')
        ->where('wisher_id',"$openid")
        ->where('wisher_open','已打开')
        ->pluck('fairy_path');
        $fairy_photo_path2=DB::table('custom_wish')
        ->where('helper_id',"$openid")
        ->where('helper_open','已打开')
        ->pluck('fairy_path');
        $collection=collect([$fairy_photo_path1,$fairy_photo_path2]);
        $collapsed=$collection->collapse();
        return response()->json(['fairy_path'=>$collapsed,'fairy_num'=>$fairy_num]);
    }
}