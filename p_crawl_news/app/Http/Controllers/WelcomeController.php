<?php namespace App\Http\Controllers;

use DB;

class WelcomeController extends Controller {

	/*
	|--------------------------------------------------------------------------
	| Welcome Controller
	|--------------------------------------------------------------------------
	|
	| This controller renders the "marketing page" for the application and
	| is configured to only allow guests. Like most of the other sample
	| controllers, you are free to modify or remove it as you desire.
	|
	*/

	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		$this->middleware('guest');
	}

	/**
	 * Show the application welcome screen to the user.
	 *
	 * @return Response
	 */
	public function index()
	{
		return view('pages.home.welcome');
	}
	public function show_news_list(){
		$data['news'] = DB::table('news_beauty_tb')->get();
		return view('pages.home.news_list',$data);
	}
	public function show_news_detail($id){
		$list = DB::table('news_beauty_tb')->where('id', $id)->get();
		if($list>0){
			$data['news'] = $list[0];
		}
		return view('pages.home.news_detail',$data);
	}
	/*video*/
	public function show_video_list(){
		$data['news'] = DB::table('video_tb')->get();
		return view('pages.home.video_list',$data);
	}
	public function show_video_detail($id){
		$list = DB::table('video_tb')->where('id', $id)->get();
		if($list>0){
			$data['news'] = $list[0];
		}
		return view('pages.home.video_detail',$data);
	}
	
	// private static $category_list = [
		// 'sao'			=> [1,3],
		// 'khoedep'		=> [101,102,103,104,105],
		// 'giadinh'		=> [201,202,203],
		// 'babau'			=> [301,302,303,304,305],
		// 'daycon'		=> [401],
	// ];

	// public function show_trangchu(){
		// foreach(self::$category_list as $key => $value){
			// $data[$key] = DB::table('news_beauty_tb')
		            // ->join('news_cate_permission_tb', 'news_beauty_tb.key', '=', 'news_cate_permission_tb.key_news')
		            // ->whereIn('news_cate_permission_tb.id_cate', $value)
		            // ->select('news_beauty_tb.*', 'news_cate_permission_tb.id_cate')
		            // ->skip(7)->take(7)->get();
// 			
		// }
		// return view('pages.home.Mazaya',$data);
	// } 
	// public function show_tranglist($category_name){
		// /*select group*/
		// $category = self::$category_list[$category_name];
		// /*get data*/ 
		// $data['news'] = DB::table('news_beauty_tb')
            // ->join('news_cate_permission_tb', 'news_beauty_tb.key', '=', 'news_cate_permission_tb.key_news')
	            // ->whereIn('news_cate_permission_tb.id_cate', $category)
	            // ->select('news_beauty_tb.*', 'news_cate_permission_tb.id_cate')
	            // ->skip(10)->take(10)->get();
		// return view('pages.home.Mazaya-List',$data);
	// }
	// public function show_trangdetail($id){
		// $list = DB::table('news_beauty_tb')->where('id', $id)->get();
		// if($list>0){
			// $data['news'] = $list[0];
		// }
		// return view('pages.home.Mazaya-Detail',$data);
	// }
	/*update check*/
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

		DB::disableQueryLog();
		DB::table($v['table'])->insert($params);
		
		/*get id of category*/
		foreach ($category as $key_cat => $value_cat) {
			if($v['type'] == $value_cat->key){
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
	
	public function crawlData_update(){
		return view('pages.dashboard.crawlData_update');
	}

	public function check_news_update(){
		$arr 	= $_POST['arr'];
		$table	= $arr[0]['table'];
		$all = DB::table($table)->select('title','image','desc')->get();
		foreach($arr as $k => $v){
			$status = false;
			foreach($all as $k2 => $v2){
				if($v['title'] == $v2->title || $v['image'] == $v2->image){
					$status = true;
				}
			}
			if($status == true){
				unset($arr[$k]);
			}
		}
		$data['count'] 	= count($arr);
		$data['arr'] 	= $arr;
		$data['number']	= count($all);
		return $data;
	}
	public function save_news_update(){
		$category = DB::table('news_category_tb')->get();
		$arr = $_POST['arr'];
		$count_number = 0;
		foreach($arr as $k => $v){
			$list = DB::table($v['table'])->where('title', $v['title'])->get();		
			if(count($list)==0){
				if(strlen($v['content']) < 15000){
					self::insertNews($v,$category);
					$count_number = $count_number+1;
				}
			}
		}
		
		$data['count'] = $count_number;
		return $data;
	}
}
