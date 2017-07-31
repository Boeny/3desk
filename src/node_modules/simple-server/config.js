var paths = {};

function setPaths(root, obj){
	for (var alias in obj){
		paths[alias] = root + obj[alias];
	}
}

setPaths(__dirname, {
	ROOT_DIR	: '',
	CONFIG_DIR	: '/config',
	LIBS_DIR	: '/libs',
	HOSTS_DIR	: '/home'
});

setPaths(paths.CONFIG_DIR, {
	CONFIG_MAIN		: '/main',
	CONFIG_HOSTS	: '/hosts'
});

setPaths(paths.LIBS_DIR, {
	SERVER		: '/server',
	DISPATCHER	: '/dispatcher',
	ROUTER		: '/router'
});

module.exports = paths;