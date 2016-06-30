<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
/*NEWS page*/
Route::get('/news_home'   				           	, ['uses' => 'WelcomeController@news_home', 	'as'   => 'news_home']);
Route::get('/news_list/{category_name}'   		, ['uses' => 'WelcomeController@news_list', 	'as'   => 'news_list']);
Route::get('/news_detail/{key}'   				    , ['uses' => 'WelcomeController@news_detail', 	'as'   => 'news_detail']);
Route::get('/news_feature'   				          , ['uses' => 'WelcomeController@news_feature', 	'as'   => 'news_feature']);
Route::get('/news_contact'   				          , ['uses' => 'WelcomeController@news_contact', 	'as'   => 'news_contact']);

/*TEST PAGE*/
Route::get('/'   							           			, ['uses' => 'WelcomeController@index', 	'as'   => 'index']);
Route::get('/test_news_list'         					, ['uses' => 'WelcomeController@show_news_list', 	'as'   => 'test_news_list']);
Route::get('/test_video_list'            			, ['uses' => 'WelcomeController@show_video_list', 	'as'   => 'test_video_list']);
Route::get('/test_news_detail/{id}'      			, ['uses' => 'WelcomeController@show_news_detail', 	'as'   => 'test_news_detail']);
Route::get('/test_video_detail/{id}'     			, ['uses' => 'WelcomeController@show_video_detail', 	'as'   => 'test_video_detail']);
/*MAIN PAGE*/
Route::get('/trangchu'            				, ['uses' => 'WelcomeController@show_trangchu', 	'as'   => 'trangchu']);
Route::get('/tranglist/{category_name}'   , ['uses' => 'WelcomeController@show_tranglist', 	'as'   => 'tranglist']);
Route::get('/trangdetail/{id}'            , ['uses' => 'WelcomeController@show_trangdetail', 	'as'   => 'trangdetail']);

Route::get('/crawlData_update'            , ['uses' => 'WelcomeController@crawlData_update', 	'as'   => 'crawlData_update']);
Route::post('/aj_check_news_update'      	, ['uses' => 'WelcomeController@check_news_update']);
Route::post('/aj_save_news_update'      	, ['uses' => 'WelcomeController@save_news_update']);

Route::get('home', 'HomeController@index');
Route::get('/crawlData'             			, ['uses' => 'HomeController@crawlData', 	'as'   => 'crawlData']);
Route::post('/aj_save_news'      					, ['uses' => 'HomeController@save_news']);
Route::get('/deleteNewsAll'         			, ['uses' => 'HomeController@deleteNewsAll', 	'as'   => 'deleteNewsAll']);



Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);
