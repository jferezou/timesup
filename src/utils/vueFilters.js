import Vue from 'vue'

Vue.filter('two_digits', function (value) {
  if (value.toString().length <= 1) {
    return '0' + value.toString()
  }
  return value.toString()
});


Vue.filter('three_digits', function (value) {
  if (value.toString().length <= 1) {
    return '0' + value.toString()
  }
  return value.toString()
});


Vue.filter('formatSize', function (value) {
    let aSize = Math.abs(parseInt(value, 10));
	let def = [[1, 'octets'], [1024, 'ko'], [1024*1024, 'Mo'], [1024*1024*1024, 'Go'], [1024*1024*1024*1024, 'To']];
	for(let i=0; i<def.length; i++){
		if(aSize<def[i][0]) return (aSize/def[i][0]).toFixed(2)+' '+def[i][1];
	}
});
