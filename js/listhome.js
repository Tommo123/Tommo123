require.config({
	paths:{
		'jq':'../lib/jquery-1.10.1.min',
		'common':'../lib/common',
		'lp':'listpage'
	},
	shim:{
		'lp':['jq']
	}
});


requirejs(['common','lp'],function(){

});