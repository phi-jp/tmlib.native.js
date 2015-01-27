var gulp = require('gulp');
var ghelper = require('gulp-helper');
ghelper.require();


gulp.task('default', function() {
    var targets = [
        "scripts/native.js",
        "scripts/api.js",
        "scripts/gamekit.js",
        "scripts/nativeaudio.js",
    ];

	gulp.src(targets)
		.pipe(concat('tmlib.native.js'))
		.pipe(gulp.dest('./'))
		.pipe(uglify())
	    .pipe(rename({
	      extname: '.min.js'
	    }))
		.pipe(gulp.dest('./'))
		;
});

