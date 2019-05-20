<?php
namespace APP\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Routing\RouteCollection;
use Illuminate\Support\Facades\Input; 
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Connection;
class get_pre_wishes extends Controller{
    public function index( Request $request){
        $random_wish=DB::table('pre_wish')
        ->inRandomOrder()
        ->first();
        $array_random=[
            'errmsg'=>$random_wish,
        ];
        return response()->json($array_random);
        
    }
}