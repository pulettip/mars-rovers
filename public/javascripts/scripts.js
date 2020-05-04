
console.log('script loaded');

$('.view-journey').on('click', (e) => {
	// let parent = $(e.target).parent()[0];
	// let journey = $(e.target).parent().children('.hidden');
	// console.log(journey);
	// for (var i = 0; i < journey.length; i++) {
	// 	console.log(journey[i]);
	// }

	console.log($(e.target).data('num'))
	
	let num = $(e.target).data('num')
	// data-num=rover.rover_number

	$('.modal[data-num=' + num + ']').modal();
})