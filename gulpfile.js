var gulp            = require('gulp'),
    // this is an arbitrary object that loads all gulp plugins in package.json. 
    $         = require("gulp-load-plugins")(),
    yaml      = require("gulp-yaml"),
    express   = require('express'),
    path      = require('path'),
    tinylr    = require('tiny-lr'),
    app       = express(),
    server    = tinylr();

gulp.task('default', ['clean'], function() {
	gulp.start('compass', 'templates', 'yaml');
});

gulp.task('pkg', function() {
    return gulp.src(['pkg/*.js'])
      .pipe($.concat('lib.js'))
      .pipe(gulp.dest('dist/js'));
});

gulp.task('js', function() {
  return gulp.src('./src/js/{,*/}*')
    .pipe(gulp.dest('./dist/js'))
});
	
gulp.task('compass', function() {
    gulp.src('./src/scss/*.scss')
        .pipe($.plumber())
        .pipe($.compass({
            css: 'dist/css',
            sass: 'src/scss',
            image: 'dist/img',
            style: 'compact',
            comments: false
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe( $.livereload( server ));
});

gulp.task('templates', function() {
  return gulp.src('src/jade/*.jade')
    .pipe($.plumber())
    .pipe($.jade({
      pretty: true
    }))
    .pipe( gulp.dest('dist/') )
    .pipe( $.livereload( server ));
});

gulp.task('yaml', function() {
  return gulp.src('src/yaml/*.yml')
  .pipe(yaml({ space: 2 }))
  .pipe(gulp.dest('dist/docs/'));
});

gulp.task('express', function() {
  app.use(express.static(path.resolve('./dist')));
  app.listen(3001);
  $.util.log('Listening on port: 3001');
});

gulp.task('watch', function () {
  server.listen(2999, function (err) {
    if (err) {
      return console.log(err);
    }

    gulp.watch('src/js/{,*/}*',['js']);

    gulp.watch('src/scss/{,*/}*.scss',['compass']);

    gulp.watch('src/jade/{,*/}*.jade',['templates']);

    gulp.watch('src/yaml/*.yml',['yaml']);
    
  });
});

// Default Task
gulp.task('default', ['pkg','js','compass','templates', 'yaml', 'express','watch']);