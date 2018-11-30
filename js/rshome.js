require.config({
	paths:{
		'jq':'../lib/jquery-1.10.1.min',
		'common':'../lib/common',
		'rs':'result'
	},
	shim:{
		'rs':['jq']
	}
});


requirejs(['common','rs'],function(){

});