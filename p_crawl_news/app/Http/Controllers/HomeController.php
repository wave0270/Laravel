<?php namespace App\Http\Controllers;

use DB;
class HomeController extends Controller {

	/*
	|--------------------------------------------------------------------------
	| Home Controller
	|--------------------------------------------------------------------------
	|
	| This controller renders your application's "dashboard" for users that
	| are authenticated. Of course, you are free to change or remove the
	| controller as you wish. It is just here to get your app started!
	|
	*/

	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		$this->middleware('auth');
	}

	/**
	 * Show the application dashboard to the user.
	 *
	 * @return Response
	 */
	public function index()
	{
		return view('home');
	}

	public function crawlData(){
		return view('pages.crawl.crawlData');
	}
	public function save_news(){
		$category = DB::table('news_category_tb')->get();
		$count_number = 0;
		foreach($_POST['arr'] as $k => $v){
			self::insertNews($v,$category);
			$count_number = $count_number+1;
		}
		return 'save_news ok : '.$count_number;
	}
	public function insertNews($v,$category){
		$key = $v['title'].'-'.time();
		$params = [
			'domain'		=>	$v['domain'],
			'title'			=>	$v['title'],
			'href'			=>	$v['href'],
			'image'			=>	$v['image'],
			'image_full'	=>	$v['image_full'],
			'desc'			=>	$v['desc'],
			'content'		=>	$v['content'],
			'type'			=>	$v['type'],
			'key'			=>	$key,
		];

		/*check table save to*/
		if($v['table'] == 'news_beauty_tb'){
			$permission_tb = 'news_cate_permission_tb';
		}
		if($v['table'] == 'video_tb'){
			$permission_tb = 'video_cate_permission_tb';
			$params['time'] = $v['time'];
			$params['quality'] = $v['quality'];
		}

		DB::table($v['table'])->insert($params);

		/*get id of category*/
		foreach ($category as $key_cat => $value_cat) {
			if($v['type'] == $value_cat->type){
				$id_cate = $value_cat->id;
				break;
			}
		}

		/*insert permission table*/
		$params_per = [
			'key_news'		=>	$key,
			'id_cate'		=>	$id_cate,
		];

		DB::table($permission_tb)->insert($params_per);
	}

	public function deleteNewsAll(){
		DB::table('news_cate_permission_tb')->delete();
		DB::table('news_beauty_tb')->delete();
		DB::table('video_cate_permission_tb')->delete();
		DB::table('video_tb')->delete();
		return "no ok";
	}
	/*video************************/
}
