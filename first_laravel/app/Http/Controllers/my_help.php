<?php
namespace APP\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Routing\RouteCollection;
use Illuminate\Support\Facades\Input; 
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Connection;
class my_help extends Controller
{
    public function index( Request $request){
        session_start();
        $openid=$_SESSION['openid'];
        $all_my_help=DB::table('custom_wish')
        ->where('helper_id',$openid)
        ->get();
        return response()->json($all_my_help);
    }
}