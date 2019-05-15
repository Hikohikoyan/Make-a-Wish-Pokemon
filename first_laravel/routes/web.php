<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
//use App\Http\Middleware\Checklogin;
Route::post('/get_pre_wishes/','get_pre_wishes@index')->middleware('get_openid','caculate_request');//查看预定义愿望

Route::group(['middleware'=>['get_openid','user_exist']],function(){
    Route::post('/save_wish/','save_wish@index')->middleware('judge_wishorhelp_times');
    Route::post('/commit_info/','user_info@commit_info');

});

Route::group(['middleware'=>['get_openid']],function(){
    Route::post('/help_wish/','show_wishes@help_wish');
    Route::post('/my_wishes/','show_wishes@my_wishes');
    Route::post('/my_help/','show_wishes@my_help');
});//查看各种愿望，我帮助的，我许下的，以及浏览愿望

Route::group(['middleware'=>['get_openid']],function(){
    Route::post('/after_help_show_info/','user_info@after_help_show_info');
    Route::post('/commit_help/','commit_help@index')->middleware('judge_wishorhelp_times');

});


Route::group(['middleware'=>['get_openid','caculate_ball']],function(){
    Route::post('/ball_list/','show_list@ball_list');
    Route::post('/fairy_list/','show_list@fairy_list');
    Route::post('/open_ball/','open_ball@index');

});
Route::group(['middleware'=>['get_openid','caculate_ball']],function(){
    Route::post('/conclude_page_four/','conclusion@individual');
    Route::post('/conclude_page_five/','conclusion@game_statistics');
});//两个总结页面统计





