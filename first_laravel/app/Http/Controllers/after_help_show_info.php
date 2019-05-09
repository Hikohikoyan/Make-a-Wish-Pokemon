<?php
namespace APP\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Routing\RouteCollection;
use Illuminate\Support\Facades\Input; 
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Connection;
class after_help_show_info extends Controller
{
    public function index( Request $request){
        $wisher_id=$request->wisher_id;
        $wish_info=DB::table('user')
        ->where('user_id',$wisher_id)
        ->first();
        return response()->json([$wish_info]);
    }
}