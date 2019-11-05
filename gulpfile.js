// 一、gulp.task(taskName任务名, taskFunction任务函数) 注册任务 
//——————————————————————————————————————————————————————————————————————————————————————————————————————
// gulp.task 方法用来注册任务
// done()或cb() 标明异步任务完成
// 1.常规任务 gulp 加任务名'task1' 调用
// gulp.task('task1', function (cb) {
//     console.log('执行任务task1');
//     cb()
// })

// // 2.默认任务 gulp  直接调用
// gulp.task('default', function (done) {
//     console.log('执行默认任务');
//     done()
// })


// // exports注册任务
// function task2_0() {
//     console.log('执行exports注册任务');
// }

// // module.exports = {task2_0};
// exports.task2_0 = task2_0;

// 二、gulp.src(globs[, options]) 创建一个流，用于从文件系统读取元数据对象(用来读取文件)
//——————————————————————————————————————————————————————————————————————————————————————————————————————
// globs 文件匹配模式(类似正则)，也可以直接指定某个具体的文件路径。当有多个匹配模式时，该参数为一个数组。
// options 为可选参数，通常不需要用到。
// gulp.src('./*.*')//读取当前文件夹的的所有文件


//三、gulp.dest(path[,options]) 创建一个流，用于将元数据对象写入到文件系统（设置生成文件的路径）
//——————————————————————————————————————————————————————————————————————————————————————————————————————
// path 将写入文件的输出目录的路径。
// options 为可选参数，通常不需要用到。
// 读取文件流（gulp.src），通过管道（pipe），把文件流写入（gulp.dest）当前目录下的 dist 文件夹中

// 四、gulp.watch(globs[, options], [tasks])  监听 globs 并在发生更改时运行任务
//——————————————————————————————————————————————————————————————————————————————————————————————————————
// globs 为要监视的文件匹配模式，规则和用法与gulp.src()方法中的globs相同。
// options 为可选参数，通常不需要用到。
// tasks 为文件变化后要执行的 一个任务函数 或由 series() 和 parallel() 生成的组合任务
// gulp.series() 将任务函数或组合操作组合成更大的操作   同步执行
// gulp.parallel() 将任务函数或组合操作组合成更大的操作 异步执行 一个任务发生错误，其他任务可能完成，可能不完成。

// 五、Gulp常用插件

// 文件合并（js、css）
// 使用gulp-concat
// 安装：npm install --save-dev gulp-concat

// 文件压缩
// js文件压缩      使用gulp-uglify
// css文件压缩     使用gulp-minify-css
// html文件压缩    使用gulp-minify-html

// 文件重命名
// 使用gulp-rename
//——————————————————————————————————————————————————————————————————————————————————————————————————————

const gulp = require('gulp');
const concat = require('gulp-concat');//引入文件合并包（js、css）
const rename = require('gulp-rename');//引入重命名包
const uglifyJs = require('gulp-uglify');// 引入压缩js文件包
const minifyCss = require('gulp-minify-css');//引入压缩css文件包
const minifyHtml = require('gulp-minify-html');//引入压缩html文件包
// const imgMin = require('gulp-imagemin');//引入压缩图片包
const babel = require('gulp-babel');//引入ES6转ES5包
const connect = require('gulp-connect')//引入自动刷新包

const load = require('gulp-load-plugins')();//引入自动加载包，并立即运行它
// load会自动加载package里的插件    load().uglify 相当于 require('gulp-uglify');
// 实质上gulp-load-plugins是为我们做了如下的转换:
// load.imagemin = require('gulp-imagemin');
// load.rename = require('gulp-rename');
// load.uglify = require('gulp-uglify');

gulp.task('concatC', function (done) {//合并css
    return gulp.src('./css/*.css')//读取文件
        .pipe(concat('main.css'))//合并css文件为main.css
        .pipe(gulp.dest('./dist/css'))
    done()
});

gulp.task('concatJ', function (done) {//合并js
    // gulp.src(['./js/*.js','!./js/j*.js'])//读取文件  js文件合并不按顺序排列
    return gulp.src(['./js/header.js',
        './js/content.js',
        './js/footer.js'])//js文件按此顺序排列 
        .pipe(concat('main.js'))//合并js文件为main.js
        .pipe(gulp.dest('./dist/js'))
});

gulp.task('uglifyJs', function () {//压缩js文件
    return gulp.src('./dist/js/main.js') //导出main
        .pipe(uglifyJs())   //压缩main
        .pipe(rename('main-min.js'))//重命名
        .pipe(gulp.dest('./dist/js'))   //再将main导入dist目录
})

gulp.task('renameJQ', function () {//压缩jquery文件
    return gulp.src('./js/jquery*.js')//指定文件
        .pipe(rename('jquery-min.js'))//重命名
        .pipe(uglifyJs())//压缩
        .pipe(gulp.dest('./dist/js'))//导入dist目录
})

gulp.task('minifyCss', function () {//压缩css文件
    return gulp.src('./dist/css/main.css')
        .pipe(minifyCss())
        .pipe(rename('main-min.css'))//重命名
        .pipe(gulp.dest('./dist/css'))
})

gulp.task('minifyHtml', function () {//压缩html文件
    return gulp.src('./main.html')
        .pipe(minifyHtml())
        .pipe(rename('main-min.html'))
        .pipe(gulp.dest('./dist'))
})

gulp.task('imgmin', function () {//压缩图片
    return gulp.src('./images/*.*') //引入图片流
        .pipe(gulp.dest('./dist/images'))//导出图片流至dist目录
    // .pipe(imgMin())
    // .pipe(imgMin([// 压缩图片 >3 版本
    //     imagemin.gifsicle({ interlaced: true }),
    //     imagemin.jpegtran({ progressive: true }),
    //     imagemin.optipng({ optimizationLevel: 5 }),
    //     imagemin.svgo({
    //         plugins: [
    //             { removeViewBox: true },
    //             { cleanupIDs: false }
    //         ]
    //     })
    // ]))//压缩图片 此压缩包连续下载时掉包，无法正常使用
})

gulp.task('es6-es5', function () {//es6转es5
    return gulp.src('./js/class.js')
        .pipe(babel({ presets: ['@babel/preset-env'] }))
        .pipe(uglifyJs())
        .pipe(gulp.dest('./dist/js'))
})

gulp.task('watchs', function (done) {//监视文件变化, 进行更新
    gulp.watch('./css/*.css', gulp.series('concatC', 'minifyCss','reload'));
    gulp.watch('./js/*.js', gulp.series('concatJ', 'uglifyJs','reload'));
    gulp.watch('./main.html', gulp.series('minifyHtml','reload'));
});

gulp.task('connect', function (done) {//自动刷新
    connect.server({
        // root: './dist',//根目录
        // ip:'192.168.11.62',//默认localhost:8080
        livereload: true,//自动更新
        // port: 9999//端口
    })
    done();
})

gulp.task('reload',function(done){//自动刷新
    gulp.src(['./*.*',"./*/*.*"]).pipe(connect.reload());
    done();
})

gulp.task('run',gulp.parallel('connect','watchs'));//合并多个任务，让他们一起执行

gulp.task('dabao',gulp.parallel(//一键包装
    gulp.series('concatJ','uglifyJs'),
    gulp.series('concatC','minifyCss'),
    gulp.series('imgmin'),
    gulp.series('minifyHtml')
    )
);