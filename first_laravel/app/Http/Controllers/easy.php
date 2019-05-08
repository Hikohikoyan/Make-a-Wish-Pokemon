<?php
namespace APP\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Routing\RouteCollection;
use Illuminate\Support\Facades\Input; 
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Connection;
class easy extends Controller
{
    public function index( Request $request){
        $words=$request->json()->all();
        
        $words_str=$words["words"];
        DB::insert('insert into test (id, words) values (?, ?)',array(NULL,"$words_str"));//不需要再连接数据库已经在配置中写好
        
        //var_dump($request->words);//这个就可以直接获取到json格式的数据了;
        if($request->name=="xiaoqi"){
            session_start();
            //$_SESSION["goodname"]=$request->name;
           // var_dump($_SESSION["goodname"]);
        }
        $info = DB::table('wish') 
            ->inRandomOrder() 
            ->take(3) 
            ->get(); 
        //print_r($info);
        

        //return $data->get('name', 'daniel');
        //$words=$request->getContent();
        //var_dump($words);
        //$words = json_decode($words,true);
        //var_dump($words);
        /*$words=$input[0];
        if($words["words"]==1){
            $errmsg="good";
        }else{
            $errmsg="bad";
        }*/
        $lara_array=[
            'errcode'=> "emmmmm",/*$request->numda*/
            'array_result'=>$info,
            'date'=>date("Y/m/d")
        ];
        return response()->json($lara_array);
    }
}
