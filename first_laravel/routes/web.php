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
Route::get('/', function () {
    return view('welcome');
});
Route::post('/get_pre_wishes/','get_pre_wishes@index')->middleware('start_activity','get_openid','caculate_request');
Route::post('/save_wish/','save_wish@index')->middleware('get_openid','judge_wishorhelp_times');
Route::post('/show_info/','show_info@index')->middleware('get_openid','user_exist');
Route::post('/commit_info/','commit_info@index')->middleware('get_openid','user_exist');
Route::post('/help_wish/','help_wish@index')->middleware('get_openid');
Route::post('/after_help_show_info/','after_help_show_info@index');
Route::post('/commit_help/','commit_help@index')->middleware('get_openid','judge_wishorhelp_times');
Route::post('/ball_list/','ball_list@index')->middleware('get_openid','caculate_ball');
Route::post('/fairy_list/','fairy_list@index')->middleware('get_openid','caculate_ball');
Route::post('/open_ball/','open_ball@index')->middleware('get_openid');
Route::post('/my_wishes/','my_wishes@index')->middleware('get_openid');
Route::post('/my_help/','my_help@index')->middleware('get_openid');




