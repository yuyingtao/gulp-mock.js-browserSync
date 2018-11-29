var gulp = require('gulp');
plugins = require("gulp-load-plugins")({
    pattern: '*' //让gulp-load-plugins插件能匹配除了gulp插件之外的其他插件
})
var proxyMiddleware = require('http-proxy-middleware');
var browserSync = require('browser-sync');//静态服务器的插件
//var mock        = require('./mock.js');//自己将拦截，生成随机数据这一模块提取出去了
var Mock = require('mockjs');
var demo=false;
var  middleware = [];//中间件
gulp.task('watch', function() {
    console.log(1)
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
    if(demo){

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


