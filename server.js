var liveServer = require("live-server");

var params = {
	port: 8000, // 选择要使用的端口
	host: "0.0.0.0", // 选择要绑定的主机地址
	root: "./src", // 设置正在服务的根目录
	open: true, // 当FALSE，它不会加载你的浏览器默认.
	ignore: 'scss,my/templates', // 用于忽略路径的逗号分隔字符串
	file: "./src/brand.html", // 设置时，为每404个文件服务（用于单页应用程序）
	wait: 1000, // 在重新加载之前等待所有更改。默认值为0秒。
	// mount: [['/components', './node_modules']], // 在定义的路径下提供路径内容（可能有多个定义）
	logLevel: 2, // 0 =仅错误，1 =某些，2 =批量
    // middleware: [function(req, res, next) { next(); }], // 采用一系列与Connect兼容的中间件注入服务器中间件堆栈
    proxy: [
        [
            "/count",
            "http://47.100.97.188:9090/count"
        ]
    ]
};
liveServer.start(params);
