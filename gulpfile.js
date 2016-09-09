var gulp  = require('gulp'),
    concat = require('gulp-concat'),
    mainBowerFiles = require('main-bower-files'),
    order = require('gulp-order'),
    filter = require('gulp-filter')
    exec = require('child_process').exec;

// Путь к собранным файлам
var buildPath = "build";

// Компоненты bower
var vendorsJsFiles = mainBowerFiles({
  filter:'**/*.js',
    paths: {
        bowerDirectory: 'bower_components'
    }
});
var vendorsCssFiles = mainBowerFiles({
  filter:'**/*.css',
    paths: {
        bowerDirectory: 'bower_components'
    }
});

// Пути к пользовательским файлам
var discountJsPath    = 'app/**/*.js',
    discountCssPath   = 'app/styles.css',
    discountFontsPath = 'assets/fonts/*';

gulp.task('vendors_js', function(){
  return gulp.src(vendorsJsFiles)
  .pipe(concat('vendors.js'))
  .pipe(gulp.dest(buildPath + '/js'));
});

gulp.task('vendors_css', function(){
  return gulp.src(vendorsCssFiles)
  .pipe(concat('vendors.css'))
  .pipe(gulp.dest(buildPath + '/css'));
});

gulp.task('discount_js', function(){
  return gulp.src(discountJsPath)
  .pipe(order([
    "**/**.module.js",
    "**/*.js"
  ]))
  .pipe(concat('discount.js'))
  .pipe(gulp.dest(buildPath + '/js'));
});

gulp.task('discount_css', function(){
  return gulp.src(discountCssPath)
  .pipe(concat('discount.css'))
  .pipe(gulp.dest(buildPath + '/css'));
});

gulp.task('discount_fonts', function(){
  return gulp.src(discountFontsPath)
  .pipe(gulp.dest(buildPath + '/fonts'));
});

gulp.task('server', function (cb) {
  exec('static-server', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})

gulp.task('watch', function(){
  gulp.watch(vendorsJsFiles, ['vendors_js']);
  gulp.watch(vendorsCssFiles, ['vendors_css']);
  gulp.watch(discountJsPath, ['discount_js']);
  gulp.watch(discountCssPath, ['discount_css']);
});

// Выполняет сборку
gulp.task('build', ['vendors_js', 'vendors_css', 'discount_js', 'discount_css','discount_fonts']);

// Собирает проект, запускает сервер и отслеживает изменения
gulp.task('default', ['serve']);
gulp.task('serve', ['build', 'server', 'watch']);
// Альтернативный вызов для запуска сервера и отслеживания изменений (без предварительной сборки)
gulp.task('run', ['server', 'watch']);

