$( document ).ready( function() {

	var app = {

		init: function() {
			this.loadFiles();
		},

		loadFiles: function() {
			var i = 0,
				self = this,
				files = ['users', 'posts'];

			$.each(files, function(k,v) {
				$.ajax({
					url: 'docs/' + v + '.json',
					success: function(data) {
						self.render(data, i);
						i++;
					}
				});
			});
		},

		render: function(obj, id) {

			var blocks = tmpl = type = menu = '', idc = 0;

			$.each(obj.collections, function(k,coll) {
				switch (coll.type) {
					case 'get':
						type = 'panel-info';
						break;
					case 'post':
						type = 'panel-success';
						break;
					case 'put':
						type = 'panel-warning';
						break;
					case 'delete':
						type = 'panel-danger';
						break;
				}
				blocks += '<div id="coll-' + id + '-' + idc + '" class="panel ' + type + '">\
				<div class="panel-heading">\
				<h3 class="panel-title">\
				<div class="row">\
				<div class="col-xs-6"><label class="label">' + coll.type + '</label>' + coll.url + '</div>\
				<div class="col-xs-6 text-right">' + coll.descTitle + '</div>\
				</div>\
				</h3>\
				</div>\
				<div class="panel-body">\
				<blockquote>Description</blockquote><p>' + coll.descMain + '</p>\
				<blockquote>Parameters</blockquote>';
				if (coll.parameters) {
					blocks += '<table class="table table-striped"><thead><tr>\
					<th>Parameter</th><th>Data Type</th><th>Description</th><th>Parameter Type</th>\
					</tr></thead>\
					<tbody>';
					coll.parameters.forEach(function(elem) {
						blocks += '<tr>\
						<td>' + elem.parameter + '</td>\
						<td>' + elem.type + '</td>\
						<td>' + elem.desc + '</td>\
						<td>' + elem.data + '</td>\
						</tr>';
					});
					blocks += '</tbody></table>';
				} else {
					blocks += '-';
				}
				blocks += '<blockquote>Response</blockquote>';
				if (coll.response) {
					blocks += '<table class="table table-striped"><thead><tr>\
					<th>Parameter</th><th>Data Type</th><th>Description</th><th>Parameter Type</th>\
					</tr></thead>\
					<tbody>';
					coll.response.forEach(function(elem) {
						blocks += '<tr>\
						<td>' + elem.parameter + '</td>\
						<td>' + elem.type + '</td>\
						<td>' + elem.desc + '</td>\
						<td>' + elem.data + '</td>\
						</tr>';
					});
					blocks += '</tbody></table>';
				} else {
					blocks += '-';
				}
				blocks += '<blockquote>Response Messages</blockquote>';
				if (coll.messages) {
					blocks += '<table class="table table-striped"><thead><tr>\
					<th>HTTP Status Code</th><th>Message</th>\
					</tr></thead>\
					<tbody>';
					coll.messages.forEach(function(elem) {
						blocks += '<tr>\
						<td>' + elem.status + '</td>\
						<td>' + elem.desc + '</td>\
						</tr>';
					});
					blocks += '</tbody></table>';
				} else {
					blocks += '-';
				}
				blocks += '</div></div>';
				idc++;
			});

			tmpl = '<div class="row">\
			<div class="col-xs-12">\
			<h3 id="chapter' + id + '">' + obj.chapter + '</h3>\
			' + blocks +'\
			</div></div>';
			
			$("#yamler").append(tmpl);

			idc = 0;
			menu = '<a href="#chapter' + id + '" class="list-group-item active">' + obj.chapter + '</a>';
			$.each(obj.collections, function(k,coll) {
				menu += '<a href="#coll-' + id + '-' + idc + '" class="list-group-item">' + coll.type.toUpperCase() + ': ' + coll.url + '</a>';
				idc++;
			});
			$("#menu").append(menu);
		}

	}

	app.init();

});