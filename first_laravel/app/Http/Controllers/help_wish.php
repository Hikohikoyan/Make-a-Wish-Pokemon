<?php
namespace APP\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Routing\RouteCollection;
use Illuminate\Support\Facades\Input; 
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Connection;
use Illuminate\Support\Collection;
use Illuminate\Support\Arr;

class help_wish extends Controller
{
    public function index( Request $request){
        $fetch_wish=DB::table('custom_wish')
                    ->where("situation","未领取")
                    ->inRandomOrder()
                    ->take(4)
                    ->get();
        
        return response()->json($fetch_wish);
 
    }
}