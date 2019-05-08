<?php
namespace APP\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Routing\RouteCollection;
use Illuminate\Support\Facades\Input; 
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Connection;
class ball_list extends Controller
{
    public function index( Request $request){
        $total_ball=$request->get('total_ball');//一共拥有的精灵球数
        $total_had_fetched=$request->get('total_had_fetched');//已打开的精灵球数
        $ball_path="../first_laravel/public/photo/pokeball.jpg";
        return response()->json(['total_ball'=>$total_ball,'total_had_fetched'=>$total_had_fetched,'ball_path'=>$ball_path]);
    }
}