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
Route::post('/get_pre_wishes/','get_pre_wishes@index')->middleware('start_activity','caculate_request');
Route::post('/save_wish/','save_wish@index')->middleware('judge_wishorhelp_times');
Route::post('/show_info/','user_info@show_info')->middleware('user_exist');
Route::post('/commit_info/','user_info@commit_info')->middleware('user_exist');
Route::post('/help_wish/','show_wishes@help_wish');
Route::post('/after_help_show_info/','user_info@after_help_show_info');
Route::post('/commit_help/','commit_help@index')->middleware('judge_wishorhelp_times');
Route::post('/ball_list/','show_list@ball_list')->middleware('caculate_ball');
Route::post('/fairy_list/','show_list@fairy_list')->middleware('caculate_ball');
Route::post('/open_ball/','open_ball@index');
Route::post('/my_wishes/','show_wishes@my_wishes');
Route::post('/my_help/','show_wishes@my_help');




