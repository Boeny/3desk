/**
 * Module dispatcher
 * @param {function} route
 * @returns {function} handler on request event
 */
module.exports = function(route){
	return function(request, response){
		__server.request = request;
		__server.response = response;
		
		var params = require('url').parse(request.url, true);
		var pathname = params.pathname;
		
		__server.is_mobile = in_str(['Android','iOS','iPhone','iPad'], request.headers['user-agent']);
		
		switch (request.method){
			case 'GET':
				__server.msg('Request for %s received.', pathname);
				__server.GET = params.query;
				route(pathname, response);
				break;
			
			case 'POST':
				__server.setPOST();
				
				request.on('end', () => {
					route(pathname, response);
				});
				break;
			
			default:
				__server.send(405);
		}
	};
};
