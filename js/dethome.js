require.config({
	paths:{
		'jq':'../lib/jquery-1.10.1.min',
		'common':'../lib/common',
		'det':'detpage'
	},
	shim:{
		'det':['jq']
	}
});


requirejs(['common','det'],function(){

});