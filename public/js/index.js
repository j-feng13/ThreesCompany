$(document).ready(function() {
	var editor = ace.edit("editor");
	var textarea = $('#textarea');

	editor.on('change', function() {
		console.log('change');
		textarea.val(editor.getSession().getValue());
	});
});