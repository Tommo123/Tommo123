require.config({
	paths:{
		'jq':'../lib/jquery-1.10.1.min',
		'common':'../lib/common',
		'lg':'login'
	},
	shim:{
		'lg':['jq']
	}
});


requirejs(['common','lg'],function(){

});