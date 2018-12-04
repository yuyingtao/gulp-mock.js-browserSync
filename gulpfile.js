var gulp = require('gulp');
plugins = require("gulp-load-plugins")({
    pattern: '*' //让gulp-load-plugins插件能匹配除了gulp插件之外的其他插件
})
var proxyMiddleware = require('http-proxy-middleware');
var browserSync = require('browser-sync');//静态服务器的插件
//var mock        = require('./mock.js');//自己将拦截，生成随机数据这一模块提取出去了


var demo=true;
var  middleware = [];//中间件
gulp.task('watch', function() {
    //console.log(1)
    //livereload.listen();
    gulp.watch('*.*', function(event) {
       // livereload.changed(event.path);
    });
});

gulp.task("default",function () {
    //搭建静态服务器
    var files = [
        '**/*.html',
        './img/*',
        './css/*.css',
        './js/*.js'
    ];
    var path = require('path');
    var url = require('url');
    if(demo){
        var Mock = require('mockjs')
        middleware=function (req,res,next) {
            var urlObj = url.parse(req.url),
                method = req.method,
                paramObj = urlObj.query,
                postQuery = '',
                mockUrl,
                newSearch = '';
            console.log(urlObj.pathname);
            if ((urlObj.pathname.match(/\..+$/) && !(urlObj.pathname.match(/\.do/))) || urlObj.pathname.match(/\/$/)) {
                // console.log('urlObj:',urlObj)
                next();
                return;
            }
            switch (urlObj.pathname) {
                case '/login/loginIn.do':
                    var data = Mock.mock({
                        "menuList|6":[{
                            'menuNav':'@string()',
                            "menuNavContent|1-5":[{
                                'url':"index.html",
                                'name':"@string('lower',4)",
                                'id':"@integer(0,10)"
                            }]
                        }]
                    });
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(data));
                    return;
            }
            next()
        }
    }else {
        //var host="https://localhost:8081";node搭的服务器始终无法访问。无法转发
        var host="https://www.pv.synpowertech.com";
        middleware =[ proxyMiddleware(['/login/loginIn.do'], {target: host, changeOrigin: true,pathRewrite: {'^/login/loginIn.do': '/login/loginIn.do'}, logLevel: 'debug'})];

    }


    browserSync.init({
       files:files,
       server: {
           baseDir: './',
           middleware:middleware
       }
   } )
})


