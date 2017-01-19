/* Import dos módulos do Node, inclusive o Gulp*/
var gulp = require("gulp");
var prefixer = require("gulp-autoprefixer");
var clean = require("gulp-clean");
var browserSync = require("browser-sync");
var usemin = require("gulp-usemin");

/* ### Tasks definidas ### */
gulp.task("default", function() {
	console.log("Hello Gulp");
});

//Limpar página de backup
gulp.task("clean", function() {
	return gulp.src("dist")
			   .pipe(clean());
})

//Fazer backup da página src
gulp.task("copy", ["clean"], function() {
	return gulp.src("src/**/*")
			   .pipe(gulp.dest("dist"));
});

//Incluindo prefixos de navegador nos arquivos CSS
gulp.task("prefix", ["copy"], function() {
	return gulp.src("dist/css/*.css")
			   .pipe(prefixer({
			   		browsers: ["last 2 versions", "IE 10"]
			   }))
			   .pipe(gulp.dest("dist/css"));
});	

/* Recarrega servidor após alguma alteração*/
gulp.task("server", function() {
	browserSync.init({
		server: {
			baseDir: "./src"
		}
	});

	gulp.watch("src/**/*").on("change", browserSync.reload);
});

/* Unifica os arquivos CSS e JS para diminuir o número de requisições*/
gulp.task("usemin", ["copy"], function() {
	return gulp.src("src/*.html")
			   .pipe(usemin({
			   		css: [],
			   		js: []
			   }))
			   .pipe(gulp.dest("dist"));
});