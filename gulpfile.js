/* Import dos módulos do Node, inclusive o Gulp*/
var gulp = require("gulp");
var prefixer = require("gulp-autoprefixer");
var clean = require("gulp-clean");
var browserSync = require("browser-sync");
var usemin = require("gulp-usemin");
var cleanCSS = require("gulp-clean-css");
var uglify = require("gulp-uglify");
var imagemin = require("gulp-imagemin");
var imageminPNGQuant = require("imagemin-pngquant");
var sass = require("gulp-sass");
var runSequence = require("run-sequence");

/* ### Tasks definidas ### */
gulp.task("default", function() {	
	runSequence("usemin", "imagemin");
});

/* BROWSERSYNC: Recarrega servidor após alguma alteração*/
gulp.task("server", function() {
	browserSync.init({
		server: {
			baseDir: "./src"
		}
	});

	gulp.watch("src/**/*").on("change", browserSync.reload);
});

//Limpar página de backup
gulp.task("clean", function() {
	return gulp.src("dist")
			   .pipe(clean());
})

//Fazer backup da página src
gulp.task("copySrc", ["clean"], function() {
	gulp.src("src/css/**/*")
	   .pipe(gulp.dest("dist/css"))
	gulp.src("src/js/**/*")
		.pipe(gulp.dest("dist/js"))
	gulp.src("src/**/*.html")
		.pipe(gulp.dest("dist"));
});

/* Compila código SASS*/
gulp.task("sass", ["copySrc"], function() {
	return gulp.src("dist/scss/*.scss")
			   .pipe(sass().on("error", sass.logError))
			   .pipe(gulp.dest("dist/css"));
});

//Incluindo prefixos de navegador nos arquivos CSS
gulp.task("prefix", ["sass"], function() {
	return gulp.src("dist/css/*.css")
			   .pipe(prefixer({
			   		browsers: ["last 2 versions", "IE 10"]
			   }))
			   .pipe(gulp.dest("dist/css"));
});

/* Unifica os arquivos CSS e JS para diminuir o número de requisições*/
gulp.task("usemin", ["prefix"], function() {
	return gulp.src("src/*.html")
			   .pipe(usemin({
			   		css: [cleanCSS],
			   		js: [uglify]
			   }))
			   .pipe(gulp.dest("dist"));
});

//Fazer backup da página img
gulp.task("copyImg", function() {
	return gulp.src("src/img/**/*")
			   .pipe(gulp.dest("dist/img"));
});

/* Minifica as imagens, deixando-as com tamanho reduzido*/
gulp.task("imagemin", ["copyImg"], function() {
	return gulp.src("src/img/**/*")
			   .pipe(imagemin([
			   		imagemin.gifsicle(),
			   		imagemin.jpegtran(),
			   		imageminPNGQuant(),
			   		imagemin.svgo()
			   	]))
			   .pipe(gulp.dest("dist/img"));
});