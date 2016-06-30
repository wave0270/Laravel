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
	public function index(){
		return view('pages.home.welcome');
	}

	public function show_news_list(){
		$data['news'] = DB::table('news_beauty_tb')->get();
		return view('pages.crawl.news_list',$data);
	}

	public function show_news_detail($id){
		$list = DB::table('news_beauty_tb')->where('id', $id)->get();
		if($list>0){
			$data['news'] = $list[0];
		}
		return view('pages.crawl.news_detail',$data);
	}

	/*video*/
	public function show_video_list(){
		$data['news'] = DB::table('video_tb')->get();
		return view('pages.crawl.video_list',$data);
	}
	public function show_video_detail($id){
		$list = DB::table('video_tb')->where('id', $id)->get();
		if($list>0){
			$data['news'] = $list[0];
		}
		return view('pages.crawl.video_detail',$data);
	}

	private static $category_list = [
		'sao'					=> ['khoe-dep',2,3,4,16],
		'khoe-dep'		=> [101,102,103,104,105],
		'eva'					=> [201,202,203],
		'bi-quyet-lam-me'			=> [301,302,303,304,305],
	];

	public function show_trangchu(){
		foreach(self::$category_list as $key => $value){
			$data[$key] = DB::table('news_beauty_tb')
		            ->join('news_cate_permission_tb', 'news_beauty_tb.key', '=', 'news_cate_permission_tb.key_news')
		            ->whereIn('news_cate_permission_tb.id_cate', $value)
		            ->select('news_beauty_tb.*', 'news_cate_permission_tb.id_cate')
		            ->skip(7)->take(7)->get();
		}
		return view('pages.crawl.Mazaya',$data);
	}
	public function show_tranglist($category_name){
		/*select group*/
		$category = self::$category_list[$category_name];
		/*get data*/
		$data['news'] = DB::table('news_beauty_tb')
            ->join('news_cate_permission_tb', 'news_beauty_tb.key', '=', 'news_cate_permission_tb.key_news')
	            ->whereIn('news_cate_permission_tb.id_cate', $category)
	            ->select('news_beauty_tb.*', 'news_cate_permission_tb.id_cate')
	            ->skip(10)->take(10)->get();
		return view('pages.crawl.Mazaya-List',$data);
	}
	public function show_trangdetail($id){
		$list = DB::table('news_beauty_tb')->where('id', $id)->get();
		if($list>0){
			$data['news'] = $list[0];
		}
		return view('pages.crawl.Mazaya-Detail',$data);
	}
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

	public function crawlData_update(){
		return view('pages.crawl.crawlData_update');
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
		$data['arr'] 		= $arr;
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

	/**
	 * NEWS PAGES:
	 */
	 static function getMenuList(){
		 $arr = DB::table('news_category_tb')->get();
		 $menu = array();
		 //level 1:
		 foreach ($arr as $key => $value) {
			 if($value->parentId == 0){
				 $tmp = clone $value;
				 $tmp->childs = array();
				 array_push($menu, $tmp);
			 }
		 }
		 //level 2:
		 foreach ($menu as $key => $value) {
			 foreach ($arr as $key2 => $value2) {
				 if($value->id == $value2->parentId){
					 array_push($menu[$key]->childs, $value2);
				 }
			 }
		 }
		 return ['menu'=>$menu,'origin'=>$arr];
	 }

	 static function getMenu($type,$arr){
		 foreach($arr as $k => $v){
			 if($v->type == $type){
				 $tmp = $v;
			 }
		 }
		 $category = array();
		 if(!isset($tmp)){
			 $tmp['name'] = $type;
			 $data['type'] = $tmp;
			 $data['category'] = $category;
			 return $data;
		 }
		 foreach($arr as $k => $v){
			 if($v->id == $tmp->id || $v->parentId == $tmp->id){
				 array_push($category, intval($v->id));
			 }
		 };
		 $data['category'] = $category;
		 $data['type'] = $tmp;
		 return $data;
	 }

	 static function getPopularNew(){
		 $data['col_recent'] = DB::table('news_beauty_tb')->latest('create_date')
		 												->take(5)->get();
		 $data['col_popular'] = DB::table('news_beauty_tb')->orderBy('click_num', 'desc')
		 												->take(5)->get();
		 return $data;
	 }

	public function news_home(){
// 		$urldd['sdsd'] = self::url_slug('Chủ tịch UBND TP HCM xin lỗi người dân khu đô thị mới Thủ Thiêm
// Sau một ngày đối thoại với 63 hộ dân khiếu nại về quy hoạch, đền bù giải tỏa khu đô thị mới Thủ Thiêm (quận 2), ông Nguyễn Thành Phong - Chủ tịch UBND TP HCM - nói lời xin lỗi về sự trễ nãi khi không tiếp họ đúng hẹn.');
		// return $urldd;
		/*get popular news*/
		$col = self::getPopularNew();
		$data['col_recent'] = $col['col_recent'];
		$data['col_popular'] = $col['col_popular'];
		/*get menu*/
		$category = self::getMenuList();
		$data['menu'] = $category['menu'];
		/*get hot data*/
		$data['hot'] = DB::table('news_beauty_tb')
										 ->take(6)->get();
		/*list data by type*/
		foreach ($data['menu'] as $key => $value) {
			$categoryList = self::getMenu($value->type,$category['origin']);
			$tmp = DB::table('news_beauty_tb')
							->join('news_cate_permission_tb', 'news_beauty_tb.key', '=', 'news_cate_permission_tb.key_news')
											->whereIn('news_cate_permission_tb.id_cate', $categoryList['category'])
											->select('news_beauty_tb.*', 'news_cate_permission_tb.id_cate')
											->take(10)->get();
			$data['menu'][$key]->data = $tmp;
		}
		// return $data;
		return view('pages.news.home',$data);
	}

	 public function news_list($type){
			/*get popular news*/
			$col = self::getPopularNew();
			$data['col_recent'] = $col['col_recent'];
			$data['col_popular'] = $col['col_popular'];
			/*get Menu*/
		 	$category = self::getMenuList();
			$data['menu'] = $category['menu'];
			/*select group*/
			$categoryList = self::getMenu($type,$category['origin']);
			$data['type'] = $categoryList['type'];
	 		/*get data*/
	 		$data['news'] = DB::table('news_beauty_tb')
	             ->join('news_cate_permission_tb', 'news_beauty_tb.key', '=', 'news_cate_permission_tb.key_news')
								       ->whereIn('news_cate_permission_tb.id_cate', $categoryList['category'])
								       ->select('news_beauty_tb.*', 'news_cate_permission_tb.id_cate')
											 ->take(20)->get();
								      //  ->skip(100)->take(100)->get();
											// return $data;
		 return view('pages.news.list',$data);
	 }

	 public function news_detail($key){
			/*get popular news*/
			$col = self::getPopularNew();
			$data['col_recent'] = $col['col_recent'];
			$data['col_popular'] = $col['col_popular'];
			/*get Menu*/
		  $category = self::getMenuList();
		  $data['menu'] = $category['menu'];
		  /*get detail*/
		  $result_detail = DB::table('news_beauty_tb')->where('key', $key)->get();
	 	  if($result_detail>0){
	 			$data['news'] = $result_detail[0];
	 		}
			/*get catego*/
			$result_category = DB::table('news_category_tb')->where('type', $data['news']->type)->get();
 	 		if($result_category>0){
 	 			$data['category'] = $result_category[0];
 	 		}
			/*get catego*/
			$data['relative'] = DB::table('news_beauty_tb')->where('type', $data['news']->type)->where('key', '<>', $key)->take(4)->get();
			// return redirect('https://laravel.com/docs/5.0/responses');
	 		return view('pages.news.detail',$data);
	 }

	 public function news_feature(){
		 return view('pages.news.feature');
	 }

	 public function news_contact(){
		 return view('pages.news.contact');
	 }

	 public function url_slug($str, $options = array()) {
			// Make sure string is in UTF-8 and strip invalid UTF-8 characters
			$str = mb_convert_encoding((string)$str, 'UTF-8', mb_list_encodings());

			$defaults = array(
				'delimiter' => '-',
				'limit' => null,
				'lowercase' => true,
				'replacements' => array(),
				'transliterate' => false,
			);

			// Merge options
			$options = array_merge($defaults, $options);

			$char_map = array(
				// Latin
				'À' => 'A', 'Á' => 'A', 'Â' => 'A', 'Ã' => 'A', 'Ä' => 'A', 'Å' => 'A', 'Æ' => 'AE', 'Ç' => 'C',
				'È' => 'E', 'É' => 'E', 'Ê' => 'E', 'Ë' => 'E', 'Ì' => 'I', 'Í' => 'I', 'Î' => 'I', 'Ï' => 'I',
				'Ð' => 'D', 'Ñ' => 'N', 'Ò' => 'O', 'Ó' => 'O', 'Ô' => 'O', 'Õ' => 'O', 'Ö' => 'O', 'Ő' => 'O',
				'Ø' => 'O', 'Ù' => 'U', 'Ú' => 'U', 'Û' => 'U', 'Ü' => 'U', 'Ű' => 'U', 'Ý' => 'Y', 'Þ' => 'TH',
				'ß' => 'ss',
				'à' => 'a', 'á' => 'a', 'â' => 'a', 'ã' => 'a', 'ä' => 'a', 'å' => 'a', 'æ' => 'ae', 'ç' => 'c',
				'è' => 'e', 'é' => 'e', 'ê' => 'e', 'ë' => 'e', 'ì' => 'i', 'í' => 'i', 'î' => 'i', 'ï' => 'i',
				'ð' => 'd', 'ñ' => 'n', 'ò' => 'o', 'ó' => 'o', 'ô' => 'o', 'õ' => 'o', 'ö' => 'o', 'ő' => 'o',
				'ø' => 'o', 'ù' => 'u', 'ú' => 'u', 'û' => 'u', 'ü' => 'u', 'ű' => 'u', 'ý' => 'y', 'þ' => 'th',
				'ÿ' => 'y', 'ủ' => 'u',
				// Latin symbols
				'©' => '(c)',
				// Greek
				'Α' => 'A', 'Β' => 'B', 'Γ' => 'G', 'Δ' => 'D', 'Ε' => 'E', 'Ζ' => 'Z', 'Η' => 'H', 'Θ' => '8',
				'Ι' => 'I', 'Κ' => 'K', 'Λ' => 'L', 'Μ' => 'M', 'Ν' => 'N', 'Ξ' => '3', 'Ο' => 'O', 'Π' => 'P',
				'Ρ' => 'R', 'Σ' => 'S', 'Τ' => 'T', 'Υ' => 'Y', 'Φ' => 'F', 'Χ' => 'X', 'Ψ' => 'PS', 'Ω' => 'W',
				'Ά' => 'A', 'Έ' => 'E', 'Ί' => 'I', 'Ό' => 'O', 'Ύ' => 'Y', 'Ή' => 'H', 'Ώ' => 'W', 'Ϊ' => 'I',
				'Ϋ' => 'Y',
				'α' => 'a', 'β' => 'b', 'γ' => 'g', 'δ' => 'd', 'ε' => 'e', 'ζ' => 'z', 'η' => 'h', 'θ' => '8',
				'ι' => 'i', 'κ' => 'k', 'λ' => 'l', 'μ' => 'm', 'ν' => 'n', 'ξ' => '3', 'ο' => 'o', 'π' => 'p',
				'ρ' => 'r', 'σ' => 's', 'τ' => 't', 'υ' => 'y', 'φ' => 'f', 'χ' => 'x', 'ψ' => 'ps', 'ω' => 'w',
				'ά' => 'a', 'έ' => 'e', 'ί' => 'i', 'ό' => 'o', 'ύ' => 'y', 'ή' => 'h', 'ώ' => 'w', 'ς' => 's',
				'ϊ' => 'i', 'ΰ' => 'y', 'ϋ' => 'y', 'ΐ' => 'i',
				// Turkish
				'Ş' => 'S', 'İ' => 'I', 'Ç' => 'C', 'Ü' => 'U', 'Ö' => 'O', 'Ğ' => 'G',
				'ş' => 's', 'ı' => 'i', 'ç' => 'c', 'ü' => 'u', 'ö' => 'o', 'ğ' => 'g',
				// Russian
				'А' => 'A', 'Б' => 'B', 'В' => 'V', 'Г' => 'G', 'Д' => 'D', 'Е' => 'E', 'Ё' => 'Yo', 'Ж' => 'Zh',
				'З' => 'Z', 'И' => 'I', 'Й' => 'J', 'К' => 'K', 'Л' => 'L', 'М' => 'M', 'Н' => 'N', 'О' => 'O',
				'П' => 'P', 'Р' => 'R', 'С' => 'S', 'Т' => 'T', 'У' => 'U', 'Ф' => 'F', 'Х' => 'H', 'Ц' => 'C',
				'Ч' => 'Ch', 'Ш' => 'Sh', 'Щ' => 'Sh', 'Ъ' => '', 'Ы' => 'Y', 'Ь' => '', 'Э' => 'E', 'Ю' => 'Yu',
				'Я' => 'Ya',
				'а' => 'a', 'б' => 'b', 'в' => 'v', 'г' => 'g', 'д' => 'd', 'е' => 'e', 'ё' => 'yo', 'ж' => 'zh',
				'з' => 'z', 'и' => 'i', 'й' => 'j', 'к' => 'k', 'л' => 'l', 'м' => 'm', 'н' => 'n', 'о' => 'o',
				'п' => 'p', 'р' => 'r', 'с' => 's', 'т' => 't', 'у' => 'u', 'ф' => 'f', 'х' => 'h', 'ц' => 'c',
				'ч' => 'ch', 'ш' => 'sh', 'щ' => 'sh', 'ъ' => '', 'ы' => 'y', 'ь' => '', 'э' => 'e', 'ю' => 'yu',
				'я' => 'ya',
				// Ukrainian
				'Є' => 'Ye', 'І' => 'I', 'Ї' => 'Yi', 'Ґ' => 'G',
				'є' => 'ye', 'і' => 'i', 'ї' => 'yi', 'ґ' => 'g',
				// Czech
				'Č' => 'C', 'Ď' => 'D', 'Ě' => 'E', 'Ň' => 'N', 'Ř' => 'R', 'Š' => 'S', 'Ť' => 'T', 'Ů' => 'U',
				'Ž' => 'Z',
				'č' => 'c', 'ď' => 'd', 'ě' => 'e', 'ň' => 'n', 'ř' => 'r', 'š' => 's', 'ť' => 't', 'ů' => 'u',
				'ž' => 'z',
				// Polish
				'Ą' => 'A', 'Ć' => 'C', 'Ę' => 'e', 'Ł' => 'L', 'Ń' => 'N', 'Ó' => 'o', 'Ś' => 'S', 'Ź' => 'Z',
				'Ż' => 'Z',
				'ą' => 'a', 'ć' => 'c', 'ę' => 'e', 'ł' => 'l', 'ń' => 'n', 'ó' => 'o', 'ś' => 's', 'ź' => 'z',
				'ż' => 'z',
				// Latvian
				'Ā' => 'A', 'Č' => 'C', 'Ē' => 'E', 'Ģ' => 'G', 'Ī' => 'i', 'Ķ' => 'k', 'Ļ' => 'L', 'Ņ' => 'N',
				'Š' => 'S', 'Ū' => 'u', 'Ž' => 'Z',
				'ā' => 'a', 'č' => 'c', 'ē' => 'e', 'ģ' => 'g', 'ī' => 'i', 'ķ' => 'k', 'ļ' => 'l', 'ņ' => 'n',
				'š' => 's', 'ū' => 'u', 'ž' => 'z'
			);

			// Make custom replacements
			$str = preg_replace(array_keys($options['replacements']), $options['replacements'], $str);

			// Transliterate characters to ASCII
			if ($options['transliterate']) {
				$str = str_replace(array_keys($char_map), $char_map, $str);
			}

			// Replace non-alphanumeric characters with our delimiter
			$str = preg_replace('/[^\p{L}\p{Nd}]+/u', $options['delimiter'], $str);

			// Remove duplicate delimiters
			$str = preg_replace('/(' . preg_quote($options['delimiter'], '/') . '){2,}/', '$1', $str);

			// Truncate slug to max. characters
			$str = mb_substr($str, 0, ($options['limit'] ? $options['limit'] : mb_strlen($str, 'UTF-8')), 'UTF-8');

			// Remove delimiter from ends
			$str = trim($str, $options['delimiter']);

			return $options['lowercase'] ? mb_strtolower($str, 'UTF-8') : $str;
		}

}
