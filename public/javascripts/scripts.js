
$('.view-journey').on('click', (e) => {
	let num = $(e.target).data('num')
	$('.modal[data-num=' + num + ']').modal();
})