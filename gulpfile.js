/* Import dos módulos do Node, inclusive o Gulp*/
var gulp = require("gulp");
var prefixer = require("gulp-autoprefixer");
var clean = require("gulp-clean");

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