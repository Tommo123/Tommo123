require.config({
	paths:{
		'jq':'../lib/jquery-1.10.1.min',
		'common':'../lib/common',
		'sliderimg':'../lib/sliderimg',
		'index':'index'
	},
	shim:{
		'sliderimg':['jq'],
		'index':['jq'],
		'listpage':['jq']
	}
});


requirejs(['common','sliderimg','index'],function(){

});