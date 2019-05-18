<?php
namespace APP\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Routing\RouteCollection;
use Illuminate\Support\Facades\Input; 
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Connection;
class show_wishes extends Controller
{

    public function my_help( Request $request){
        $openid=$request->session()->get('openid');
        $all_my_help=DB::table('custom_wish')
        ->where('helper_id',$openid)
        ->select('id','wish_content')
        ->get();
        return response()->json($all_my_help);
    }

    public function my_wishes( Request $request){
        $openid=$request->session()->get('openid');           
        $all_my_wishes=DB::table('custom_wish')
        ->where('wisher_id',$openid)
        ->select('id','wish_content','situation')
        ->get();
        return response()->json($all_my_wishes);
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