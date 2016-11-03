/**************************************
 *
 * *************************************/
/*one obj can use for a table in database*/
var vnexpress_beauty = [
	{
		url_page 	: "http://suckhoe.vnexpress.net/tin-tuc/khoe-dep/page/{0}.html",
		url			: "http://suckhoe.vnexpress.net/tin-tuc/khoe-dep",
		type		: 'khoe-dep',
		table		: 'news_beauty_tb',
		num_page	: 1,
	},
	{
		url_page 	: "http://suckhoe.vnexpress.net/tin-tuc/dinh-duong/page/{0}.html",
		url 		: "http://suckhoe.vnexpress.net/tin-tuc/dinh-duong",
		type		: 'dinh-duong',
		table		: 'news_beauty_tb',
		num_page	: 1,
	},
	{
		url_page 	: "http://giaitri.vnexpress.net/tin-tuc/gioi-sao/page/{0}.html",
		url 		: "http://giaitri.vnexpress.net/tin-tuc/gioi-sao",
		type		: 'gioi-sao',
		table		: 'news_beauty_tb',
		num_page	: 1,
	},
	{
		url_page 	: "http://vnexpress.net/tin-tuc/tam-su/page/{0}.html",
		url 		: "http://vnexpress.net/tin-tuc/tam-su",
		type		: 'tam-su',
		table		: 'news_beauty_tb',
		num_page	: 1,
	},
];

/*one obj can use for all pages of domain*/
var vnexpress_beauty_obj = {
	domain		: 'vnexpress.net',
	csspath		: [
		// page: ?
		{
			parent_path	: '#col_1 .list_news > li',
    		title_path	: '.title_news .txt_link',
    		href_path	: '.title_news .txt_link',
    		image_path	: '.thumb img',
    		desc_path	: '.news_lead',
		},

		// sub: ?
		// {
			// parent_path	: '.content_scoller > ul > li',
    		// title_path	: '.title_news .txt_link',
    		// href_path	: '.title_news .txt_link',
    		// image_path	: '.icon_content',
    		// desc_path	: '.news_lead',
		// },

		// hot: ?
		{
			parent_path	: '.box_hot_news',
    		title_path	: '.title_news .txt_link',
    		href_path	: '.title_news .txt_link',
    		image_path	: '.width_image_common',
    		desc_path	: '.news_lead',
		}
	],
	csspath_detail : {
		content	: '.main_content_detail',
	},
	csspath_remove : [
		'.block_timer_share','.relative_new','.title_news','.title_div_fbook','#box_comment','#box_tinkhac_detail','.block_tag','#box_tinlienquan',"#right_calculator"
	]
};
/***********************************************************/
var eva_thoitrang = [
	{
		url_page 	: "",
		url			: "http://eva.vn/nguoi-mau-c285.html",
		type		: 'tu-van-mac-dep',
		table		: 'news_beauty_tb',
		num_page	: 1,
	},
	{
		url_page 	: "",
		url			: "http://eva.vn/nhan-vat-dep-c262.html",
		type		: 'tu-van-mac-dep',
		table		: 'news_beauty_tb',
		num_page	: 1,
	},
	{
		url_page 	: "",
		url			: "http://eva.vn/lang-sao-c20.html",
		type		: 'gioi-sao',
		table		: 'news_beauty_tb',
		num_page	: 1,
	},
	{
		url_page 	: "",
		url			: "http://eva.vn/nuoi-con-c13.html",
		type		: 'day-con',
		table		: 'news_beauty_tb',
		num_page	: 1,
	},
	{
		url_page 	: "",
		url			: "http://eva.vn/tu-van-mac-dep-c160.html",
		type		: 'tu-van-mac-dep',
		table		: 'news_beauty_tb',
		num_page	: 1,
	},
	{
		url_page 	: "",
		url			: "http://eva.vn/chuan-bi-mang-thai-c12.html",
		type		: 'chuan-bi-mang-thai',
		table		: 'news_beauty_tb',
		num_page	: 1,
	},

	{
		url_page 	: "",
		url			: "http://eva.vn/lam-dep-c58.html",
		type		: 'lam-dep',
		table		: 'news_beauty_tb',
		num_page	: 1,
	},
	{
		url_page 	: "",
		url			: "http://eva.vn/bep-eva-c162.html",
		type		: 'bep-eva',
		table		: 'news_beauty_tb',
		num_page	: 1,
	},
	{
		url_page 	: "",
		url			: "http://eva.vn/eva-tam-c66.html",
		type		: 'eva-tam',
		table		: 'news_beauty_tb',
		num_page	: 1,
	},
];
var eva_thoitrang_obj = {
	domain		: 'eva.vn',
	csspath		: [
		// page
		{
			parent_path	: '.container > div:nth-of-type(3).content > table:nth-of-type(1) > tbody:nth-of-type(1) > tr:nth-of-type(1) > td:nth-of-type(2) > div:nth-of-type(1).colCenter > div.boxDoi-sub-Item-trangtrong',
    		title_path	: 'span.news-title > a',
    		href_path	: '.news-title > a',
    		image_path	: '.imgFloat.img95 > a > img',
    		desc_path	: '.news-sapo.padL110',
		},
		// sub
		{
			parent_path	: 'div.container > div:nth-of-type(3).content > table:nth-of-type(1) > tbody:nth-of-type(1) > tr:nth-of-type(1) > td:nth-of-type(2) > div:nth-of-type(1).colCenter > div:nth-of-type(2).news-special-trangtrong > div:nth-of-type(2).newsSpecial-trangtrong > div.newsSpecial-item-trangtrong',
    		title_path	: '.news-title-bk > a',
    		href_path	: '.news-title-bk > a',
    		image_path	: '.imgFloat > a > img',
    		desc_path	: '.news-sapo',
		},
		// hot
		{
			parent_path	: 'div.container > div:nth-of-type(3).content > table:nth-of-type(1) > tbody:nth-of-type(1) > tr:nth-of-type(1) > td:nth-of-type(2) > div:nth-of-type(1).colCenter > div:nth-of-type(2).news-special-trangtrong > div:nth-of-type(1).breakingNews-trangtrong',
    		title_path	: 'h2 > a.breakingNewsTitle',
    		href_path	: 'h2 > a.breakingNewsTitle',
    		image_path	: 'a > img',
    		desc_path	: '.news-sapo',
		},
	],
	csspath_detail : {
		content	: '#baiviet-container',
	},
	csspath_remove : [
		'.baiviet-bailienquan'
	]
};
/***********************************************************/
var ngoisao_news = [
	{
		url_page 	: "http://ngoisao.net/tin-tuc/hau-truong/page/{0}.html",
		url			: "http://ngoisao.net/tin-tuc/hau-truong/",
		type		: 'hau-truong',
		table		: 'news_beauty_tb',
		num_page	: 1,
	},
];
var ngoisao_news_obj = {
	domain		: 'ngoisao.net',
	csspath		: [
		// page
		// {
		// 	parent_path	: 'div > div > div:nth-of-type(1) > div > div > div:nth-of-type(1).fl.lnhtl > ul:nth-of-type(1).news > li',
    // 		title_path	: 'h3 > a',
    // 		href_path	: 'h3 > a',
    // 		image_path	: 'a.fl.ptw > img',
    // 		desc_path	: 'p:nth-of-type(2)',
		// },
		{
			parent_path	: 'div > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > ul:nth-of-type(1) > li',
    		title_path	: 'a',
    		href_path	: 'a:nth-of-type(1)',
    		image_path	: 'mg:nth-of-type(1)',
    		desc_path	: 'div:nth-of-type(2)',
		},
		// sub
		{
			parent_path	: '.top > div > .tnhtbwHT > ul.tnhtb > li',
    		title_path	: 'h3.t > a',
    		href_path	: 'h3.t > a',
    		image_path	: 'a.ptw > img',
    		desc_path	: null,
		},
		// hot
		{
			parent_path	: '.top > div > div.tnht > div.news',
    		title_path	: 'div.txw > h3 > a',
    		href_path	: 'div.txw > h3 > a',
    		image_path	: 'a.ptw > img',
    		desc_path	: 'div.txw > p',
		},
	],
	csspath_detail : {
		content	: '#left .fck_detail',
		desc	: '.lead',
	},
	csspath_remove : [

	]
};
/***********************************************************/
var kenh14_news = [
	{
		url_page 	: "http://kenh14.vn/star/trang-{0}.chn",
		url			: "http://kenh14.vn/star.chn",
		type		: 'gioi-sao',
		table		: 'news_beauty_tb',
		num_page	: 1,
	},
];
var kenh14_news_obj = {
	domain		: 'kenh14.vn',
	csspath		: [
		// page
		{
			parent_path	: '.maincontent.clearfix > .left_content > div.newslistpannel > ul > li.item.clearfix',
    		title_path	: '.postcontent > h4.title > a',
    		href_path	: '.postcontent > h4.title > a',
    		image_path	: '.img > a > img.avatar',
    		desc_path	: '.postcontent > .sapo',
		},
		// sub
		{
			parent_path	: '.maincontent.clearfix > .left_content > .focuspanel > .nextfocuspanel > .nextfocus > li',
    		title_path	: '.title > a',
    		href_path	: '.title > a',
    		image_path	: '.clearfix.otherfeature_avatar > img',
    		desc_path	: null,
		},
		// hot
		{
			parent_path	: '.maincontent.clearfix > .left_content > .focuspanel > .focuslistbox.clearfix > .topfocusleft.fl',
    		title_path	: '.title > a',
    		href_path	: '.title > a',
    		image_path	: '.imgtopfocus > a > img',
    		desc_path	: null,
		},
	],
	csspath_detail : {
		content	: '.postpadding .content',
		desc	: '.sapo',
	},
	csspath_remove : [

	]
};
/***********************************************************/
var ebe_vn = [
	{
		url_page 	: "http://www.ebe.vn/chuan-bi-mang-thai/chuan-bi?page={0}",
		url			: "http://www.ebe.vn/chuan-bi-mang-thai/chuan-bi",
		type		: 'chuan-bi-mang-thai',
		table		: 'news_beauty_tb',
		num_page	: 1,
	},
	{
		url_page 	: "http://www.ebe.vn/chuan-bi-mang-thai/dau-hieu?page={0}",
		url			: "http://www.ebe.vn/chuan-bi-mang-thai/dau-hieu",
		type		: 'dau-hieu-mang-thai',
		table		: 'news_beauty_tb',
		num_page	: 1,
	},
	{
		url_page 	: "http://www.ebe.vn/mang-thai/sinh-no/danh-cho-me?page={0}",
		url			: "http://www.ebe.vn/mang-thai/sinh-no/danh-cho-me",
		type		: 'mang-thai-sinh-no',
		table		: 'news_beauty_tb',
		num_page	: 1,
	},
	{
		url_page 	: "http://www.ebe.vn/mang-thai/sau-khi-sinh?page={0}",
		url			: "http://www.ebe.vn/mang-thai/sau-khi-sinh",
		type		: 'sau-khi-sinh',
		table		: 'news_beauty_tb',
		num_page	: 1,
	},
	{
		url_page 	: "http://www.ebe.vn/mang-thai/goc-ba-bau/bau-dep?page={0}",
		url			: "http://www.ebe.vn/mang-thai/goc-ba-bau/bau-dep",
		type		: 'bau-dep',
		table		: 'news_beauty_tb',
		num_page	: 1,
	},
];
var ebe_vn_obj = {
	domain		: 'ebe.vn',
	csspath		: [
		// page
		{
			parent_path	: 'div.custom_page_background > div > div > section.mainwidthsm > div.zfreezepanelwrap > div.layout-row.layout-row-2column > div.layout-col.column-left > div.articles-wrapper.zfreezepanelwrap > ul.view-layout-0.clearfix.total-item-0 > li.article-item.clearfix',
    		title_path	: '.article-item-info > h3.article-item-title > a',
    		href_path	: '.article-item-info > h3.article-item-title > a',
    		image_path	: '.article-item-thumb > img',
    		desc_path	: '.article-item-info > .article-item-description',
		},
		// sub

		// hot

	],
	csspath_detail : {
		content	: '.article-item-content',
	},
	csspath_remove : [

	]
};
/***********************************************************/
var phunutoday_vn = [
	{
		url_page 	: "http://phunutoday.vn/thoi-trang/trang-{0}.html", //not yet
		url			: "http://phunutoday.vn/thoi-trang.html",
		type		: 'thoi-trang',
		table		: 'news_beauty_tb',
		num_page	: 1,
	},
];
var phunutoday_vn_obj = {
	domain		: 'phunutoday.vn',
	csspath		: [
		// page
		{
			parent_path	: 'div.wrapper_center > .main_col.main_col_2_cols > .new_cat > .most_read_news > .news-item',
    		title_path	: '.title > a',
    		href_path	: '.title > a',
    		image_path	: 'a > img',
    		desc_path	: '.summary',
		},

		// sub
		{
			parent_path	: '.wrapper_center > .main_col.main_col_2_cols > .new_cat > .news_head > .news_head_l > .news_others > .news-item',
    		title_path	: '.title > a',
    		href_path	: '.title > a',
    		image_path	: 'a > img',
    		desc_path	: null,
		},
		{
			parent_path	: '.wrapper_center > .main_col.main_col_2_cols > .new_cat > .news_head > .news_head_r > .news-item',
    		title_path	: '.title > a',
    		href_path	: '.title > a',
    		image_path	: 'a > img',
    		desc_path	: null,
		},
		// hot
		{
			parent_path	: '.news_head_l_t',
    		title_path	: '.top-image-description > a',
    		href_path	: '.top-image-description > a',
    		image_path	: 'a > img',
    		desc_path	: null,
		},

	],
	csspath_detail : {
		content	: '.description',
		desc	: '.summary',
	},
	csspath_remove : [
		'table.multimedia'
	]
};
/***********************************************************/
var youtube_com = [
	// {
		// url_page 	: "",
		// url			: "https://www.youtube.com/results?search_query=nhạc+cho+bà+bầu",
		// type		: 'video-nhac-cho-ba-bau',
		// table		: 'video_tb',
		// num_page	: 1,
	// },
	{
		url_page 	: "",
		url			: "https://www.youtube.com/results?search_query=nhạc+cho+em+bé",
		type		: 'video-nhac-cho-ba-bau',
		table		: 'video_tb',
		num_page	: 1,
	},
];
var youtube_com_obj = {
	domain		: 'youtube.com',
	csspath		: [
		// page
		// {
			// parent_path	: 'div > div:nth-of-type(4) > div:nth-of-type(1).search.branded-page-v2-secondary-column-wide.no-flex.clearfix > div:nth-of-type(5).content-alignment > div:nth-of-type(1).branded-page-v2-container.branded-page-base-bold-titles.branded-page-v2-container-flex-width > div:nth-of-type(1).branded-page-v2-col-container > div:nth-of-type(1).branded-page-v2-col-container-inner > div:nth-of-type(1).branded-page-v2-primary-col > div:nth-of-type(1).yt-card.clearfix > div:nth-of-type(2).branded-page-v2-body.branded-page-v2-primary-column-content > div:nth-of-type(2) > ol:nth-of-type(1).section-list > li:nth-of-type(1) > ol:nth-of-type(1).item-section > li > div:nth-of-type(1).yt-lockup.yt-lockup-tile.yt-lockup-video.vve-check.clearfix.yt-uix-tile > div:nth-of-type(1).yt-lockup-dismissable',
    // 		title_path	: 'div:nth-of-type(2).yt-lockup-content > h3:nth-of-type(1).yt-lockup-title > a:nth-of-type(1).yt-uix-sessionlink.yt-uix-tile-link.yt-ui-ellipsis.yt-ui-ellipsis-2.spf-link',
    // 		href_path	: 'div:nth-of-type(2).yt-lockup-content > h3:nth-of-type(1).yt-lockup-title > a:nth-of-type(1).yt-uix-sessionlink.yt-uix-tile-link.yt-ui-ellipsis.yt-ui-ellipsis-2.spf-link',
    // 		image_path	: 'div:nth-of-type(1).yt-lockup-thumbnail.contains-addto > a:nth-of-type(1).yt-uix-sessionlink.spf-link > div:nth-of-type(1).yt-thumb.video-thumb > span:nth-of-type(1).yt-thumb-simple > img:nth-of-type(1)',
    // 		desc_path	: null,
    // 		time_path	: 'a .video-time',
    // 		quality_path: '.yt-badge',
		// 		parent_path: ".yt-lockup
		// },
		{
			// parent_path	: 'div > div:nth-of-type(4) > div:nth-of-type(1).search.branded-page-v2-secondary-column-wide.no-flex.clearfix > div:nth-of-type(5).content-alignment > div:nth-of-type(1).branded-page-v2-container.branded-page-base-bold-titles.branded-page-v2-container-flex-width > div:nth-of-type(1).branded-page-v2-col-container > div:nth-of-type(1).branded-page-v2-col-container-inner > div:nth-of-type(1).branded-page-v2-primary-col > div:nth-of-type(1).yt-card.clearfix > div:nth-of-type(2).branded-page-v2-body.branded-page-v2-primary-column-content > div:nth-of-type(2) > ol:nth-of-type(1).section-list > li:nth-of-type(1) > ol:nth-of-type(1).item-section > li > div:nth-of-type(1).yt-lockup.yt-lockup-tile.yt-lockup-video.vve-check.clearfix.yt-uix-tile > div:nth-of-type(1).yt-lockup-dismissable',
    		title_path	: 'div:nth-of-type(2).yt-lockup-content > h3:nth-of-type(1).yt-lockup-title > a:nth-of-type(1).yt-uix-sessionlink.yt-uix-tile-link.yt-ui-ellipsis.yt-ui-ellipsis-2.spf-link',
    		href_path	: 'div:nth-of-type(2).yt-lockup-content > h3:nth-of-type(1).yt-lockup-title > a:nth-of-type(1).yt-uix-sessionlink.yt-uix-tile-link.yt-ui-ellipsis.yt-ui-ellipsis-2.spf-link',
    		image_path	: 'div:nth-of-type(1).yt-lockup-thumbnail.contains-addto > a:nth-of-type(1).yt-uix-sessionlink.spf-link > div:nth-of-type(1).yt-thumb.video-thumb > span:nth-of-type(1).yt-thumb-simple > img:nth-of-type(1)',
    		desc_path	: null,
    		time_path	: 'a .video-time',
    		quality_path: '.yt-badge',
				parent_path: ".yt-lockup"
		},
		// sub

		// hot

	],
	csspath_detail : {
		content	: '.postpadding .content',
	},
	csspath_remove : [

	]
};
/***********************************************************/
