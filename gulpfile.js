var path = require('path');  
var gulp = require('gulp');  
var gutil = require('gulp-util');  
var clean = require('gulp-clean');  
var concat = require('gulp-concat');  
var uglify = require('gulp-uglify');  
var rename = require('gulp-rename');  
var filesize = require('gulp-filesize');  
var less = require('gulp-less');  
var changed = require('gulp-changed');  
var watch = require('gulp-watch');
var refresh = require('gulp-livereload');
var lr = require('tiny-lr');
var server = lr();

gulp.task('clean', function () {  
  return gulp.src('build', {read: false})
    .pipe(clean());
});

gulp.task('vendor', function() {  
  return gulp.src('vendor/*.js')
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('build'))
    .pipe(filesize())
    .pipe(uglify())
    .pipe(rename('vendor.min.js'))
    .pipe(gulp.dest('build'))
    .pipe(filesize())
    .on('error', gutil.log)
});

gulp.task('css', function () {  
  return gulp.src('less/main.less')
    .pipe(changed('build/css'))
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('build/css'))
    .on('error', gutil.log);
});

gulp.task('css:watch', function () {  
  watch({
    glob: 'css/*.less',
    emit: 'one',
    emitOnGlob: false
  }, function(files) {
    gulp.src('css/main.less')
      .pipe(less({}))
      .pipe(gulp.dest('css'))
      .on('error', gutil.log);
  });
}); 

gulp.task('jw', function(){
    var spawn = require('child_process').spawn,
        j     = spawn('jekyll', ['-w', 'build']);

    j.stdout.on('data', function (data) {
        console.log('stdout: ' + data); // works fine
    });

    watch({glob: '/glob/path/to/jekyll/output'}, function(files) {
        // update files in batch mode
        return files.pipe(refresh(server));
    });
});

gulp.task('default', ['jw', 'css:watch']);
