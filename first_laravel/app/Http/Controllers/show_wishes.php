<?php
namespace APP\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Routing\RouteCollection;
use Illuminate\Support\Facades\Input; 
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Connection;
use App\Flight;
use App\Wish;
class show_wishes extends Controller
{

    public function my_help( Request $request){
    }

    public function my_wishes( Request $request){
        $openid=$request->session()->get('openid');           
        $all_my_wishes=DB::table('custom_wish')
        ->where('wisher_id',$openid)
        ->select('id','wish_content','situation')
        ->get();
        $all_my_help=DB::table('custom_wish')
        ->where('helper_id',$openid)
        ->select('id','wish_content')
        ->get();
        $help_num=DB::table('custom_wish')->where('helper_id',$openid)->count();
        $null_array=array();
        for($i=0;$i<$help_num;$i++){
            $collection = collect($all_my_help[$i]);
            $merged = $collection->merge(['situation'=>"已帮助"]);
            array_push($null_array,$merged);
        }
        $collect=collect([$all_my_wishes,$null_array]);
        $collapsed=$collect->collapse();
        return response()->json($collapsed)->setEncodingOptions(JSON_UNESCAPED_UNICODE);
    }

    public function help_wish( Request $request){
        $fetch_wish=DB::table('custom_wish')
                    ->where("situation","未领取")
                    ->inRandomOrder()
                    ->take(3)
                    ->select('id','wish_content','time1')
                    ->get();
        
        return response()->json($fetch_wish);
 
    }
}