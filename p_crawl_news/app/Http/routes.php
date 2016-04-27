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

Route::get('/'              				, ['uses' => 'WelcomeController@index', 	'as'   => 'index']);
Route::get('/news_list'              		, ['uses' => 'WelcomeController@show_news_list', 	'as'   => 'news_list']);
Route::get('/video_list'              		, ['uses' => 'WelcomeController@show_video_list', 	'as'   => 'video_list']);
Route::get('/news_detail/{id}'              , ['uses' => 'WelcomeController@show_news_detail', 	'as'   => 'news_detail']);
Route::get('/video_detail/{id}'             , ['uses' => 'WelcomeController@show_video_detail', 	'as'   => 'video_detail']);

Route::get('/trangchu'             , ['uses' => 'WelcomeController@show_trangchu', 	'as'   => 'trangchu']);
Route::get('/tranglist/{category_name}'     , ['uses' => 'WelcomeController@show_tranglist', 	'as'   => 'tranglist']);
Route::get('/trangdetail/{id}'             , ['uses' => 'WelcomeController@show_trangdetail', 	'as'   => 'trangdetail']);

Route::get('home', 'HomeController@index');
Route::get('/crawlData'              		, ['uses' => 'HomeController@crawlData', 	'as'   => 'crawlData']);
Route::post('/aj_save_news'      			, ['uses' => 'HomeController@save_news']);

// Route::get('/crawlData_update'              , ['uses' => 'HomeController@crawlData_update', 	'as'   => 'crawlData_update']);
// Route::post('/aj_check_news_update'      			, ['uses' => 'HomeController@check_news_update']);
// Route::post('/aj_save_news_update'      			, ['uses' => 'HomeController@save_news_update']);
Route::get('/crawlData_update'              , ['uses' => 'WelcomeController@crawlData_update', 	'as'   => 'crawlData_update']);
Route::post('/aj_check_news_update'      	, ['uses' => 'WelcomeController@check_news_update']);
Route::post('/aj_save_news_update'      	, ['uses' => 'WelcomeController@save_news_update']);

Route::get('/deleteNewsAll'              , ['uses' => 'HomeController@deleteNewsAll', 	'as'   => 'deleteNewsAll']);
// Route::post('/aj_save_news', function()
    // {
        // return 'Success! ajax in laravel 5';
    // });

Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);
