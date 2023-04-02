$(document).ready(function () {
	$('body').on('focus', '.select-list-group', function () {
		
		localStorage.setItem("currId", $(this).attr('id'));
		var count = 1;
		var group = document.getElementById($(this).attr('id'));
		var list_group = group.querySelector('li ul');
		var list_array = group.querySelectorAll('li ul li');
		var search = group.getElementsByTagName('input')[0];

		search.addEventListener('input', function (e) {
			for (var i = 0; i < list_array.length; i++) {
				matching(list_array[i])
			}
			show_list(list_group);
			key_up_down();
		});

		search.addEventListener('click', function (e) {
			init_list();
			show_list(list_group);
			key_up_down();
		});

		search.addEventListener('keypress', function (e) {
			if (e.keyCode == 13) {

				e.target.value = list_group.querySelector('[data-highlight="true"]').innerHTML;

				console.log($(this).siblings().attr('class'));

				$('#' + localStorage.getItem("currId") + " li ul li").each(function (i) {
					console.log(localStorage.getItem("currId"));
					console.log($('#' + localStorage.getItem("currId") + " li ul"));
					if ($(this).html() == e.target.value) {// This is your rel value
						$(this).addClass('active').siblings().removeClass('active');

					}
				});


			}
			hide_list(list_group)
			//init_list();
		});

		function matching(item) {
			var str = new RegExp(search.value, 'gi');
			if (item.innerHTML.match(str)) {
				item.dataset.display = 'true'
			} else {
				item.dataset.display = 'false';
				item.dataset.highlight = 'false';
				count = 0
			}
		}

		function init_list() {
			count = 0;
			for (var i = 0; i < list_array.length; i++) {
				init_item(list_array[i]);
				list_array[i].addEventListener('click', copy_paste);
			}
		}

		function init_item(item) {
			item.dataset.display = 'true';
			item.dataset.highlight = 'false';
		}

		function copy_paste() {
			search.value = this.innerHTML;
			// todo : check match of list text and input value for .current 
			init_list();
			hide_list(list_group);
		}

		function hide_list(ele) {
			ele.dataset.toggle = 'false'
		}

		function show_list(ele) {
			ele.dataset.toggle = 'true'
		}

		function key_up_down() {

			var items = group.querySelectorAll('li[data-display="true"]');
			var last = items[items.length - 1];
			var first = items[0];

			search.onkeydown = function (e) {

				if (e.keyCode === 38) {
					count--;
					count = count <= 0 ? items.length : count;
					items[count - 1].dataset.highlight = items[count - 1] ? 'true' : 'false';
					if (items[count]) {
						items[count].dataset.highlight = 'false';
					}
					else {
						first.dataset.highlight = 'false';
					}
				}

				if (e.keyCode === 40) {
					items[count].dataset.highlight = items[count] ? 'true' : 'false';
					if (items[count - 1]) {
						items[count - 1].dataset.highlight = 'false';
					}
					else if (items.length == 1 && typeof items.length != 'undefined') {
						items[count].dataset.highlight = 'true';
					}
					else {
						last.dataset.highlight = 'false';
					}
					count++;
					count = count >= items.length ? 0 : count;
				}
			};
		}

		group.addEventListener('mouseleave', function (event) {

			if (event.target != list_group && event.target.parentNode != list_group) {
				list_group.dataset.toggle = 'false'
			}
		});

		$('.select-list-group-list li').click(function () {
			$(this).addClass('active').siblings().removeClass('active');
		});

		$('.select-list-group').on('keydown', function (e) {
			if (e.keyCode === 8) {
				$(this).find(".select-list-group-list li").removeClass('active');
			}
		});

		$('.select-list-group').on('keydown', function (e) {
			if (e.keyCode === 46) {
				$(this).find(".select-list-group-list li").removeClass('active');
			}
		});

		$('.select-list-group-list li').on('keydown', function (e) {
			console.log($(this).attr('class'));
			if (e.keyCode === 40) {
				$(this).addClass('active').siblings().removeClass('active');
			}
		});

		$('.select-list-group-list li').on('keydown', function (e) {
			console.log($(this).attr('data-highlight'));

		});

	});

});	
