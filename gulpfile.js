var gulp = require('gulp'),
webpack = require('gulp-webpack'),
clean =  require('gulp-clean'),
sftp = require('gulp-sftp'),
webpackConfig = require('./webpack.config.js');

gulp.task('webpack', function(){
	var config = Object.create(webpackConfig);

	gulp.src('./src')
		.pipe(webpack(config))
		.pipe(gulp.dest('./build/'))
})

gulp.task('copy', function(){

	gulp.src('./src/js/libs/*')
		.pipe(gulp.dest('./build/js/libs/'))

	gulp.src('./src/imgs/**/*')
		.pipe(gulp.dest('./build/imgs/'))
})

gulp.task('clean', function(){
	gulp.src('./build')
		.pipe(clean())
})


// 上传不了，有点儿问题,先不要用
gulp.task('ftp', function() {

	gulp.src('./build/**/*')
		.pipe(sftp({
			host: '115.29.33.107',
			user: 'root',
			pass: 'Zsyl123qweZiteng',
			port: '22',
			remotePath: '/home/wwwroot/default/wz_tpl/builds/'
		}));
})
gulp.task('default', ['webpack', 'copy']);
