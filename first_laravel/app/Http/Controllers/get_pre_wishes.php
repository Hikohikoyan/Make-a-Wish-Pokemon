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
        $request_times=$_SESSION['request_times'];
        $get_id=$request_times%11;
        if($get_id==0){
            $random_wish=DB::table('pre_wish')->where('id','11')->first();
        }else{
            $random_wish=DB::table('pre_wish')->where('id',"$get_id")->first();
        }
        $array_random=[
            'errmsg'=>$random_wish,
            'request'=>$request_times,
            'get_id'=>$get_id
        ];
        return response()->json($array_random);
        
    }
}