module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {
			dist: {
				options: {
					style: 'expanded'
				},
				files: {
					'assets/build/css/compiled/screen.css' : 'assets/css/screen.scss'
				}
			}
		},

		compass: {
			options: {
				sassDir: 'assets/css/',
				cssDir: 'assets/build/css/compiled/',
				imagesDir: 'assets/images/',
				javascriptsDir: 'assets/build/js/',
				outputStyle: 'expanded'
			},
			dist: {},
			server: {
				options: {
					debugInfo: true
				}
			}
		},

		autoprefixer: {
			options: {
				browsers: ['last 2 version']
			},
			multiple_files: {
				expand: true,
				flatten: true,
				src: 'assets/build/css/compiled/screen.css',
				dest: 'assets/build/css/prefixed/'
			}
		},

		cssmin: {
			combine: {
				files: {
					'assets/build/css/screen.min.css': ['assets/build/css/prefixed/screen.css']
				}
			}
		},

		jshint: {
			beforeconcat: ['assets/js/*.js']
		},

		concat: {
			dist: {
				src: [
					'assets/js/vendor/*.js',
					'assets/js/*.js'
				],
				dest: 'assets/build/js/main.js'
			}
		},

		uglify: {
			build: {
				src: 'assets/build/js/main.js',
				dest: 'assets/build/main.min.js'
			}
		},

		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: "assets/images/",
					src: ['**/*.{png,gif,jpg}'],
					dest: "assets/images/"
				}]
			}
		},

		watch: {
			options: {
				livereload: true
			},
			scripts: {
				files: 'assets/js/*/js',
				tasks: ['concat', 'uglify', 'jshint'],
				options: {
					spawn: false
				}
			},
			compass: {
				files: ['assets/css/*.scss', 'assets/css/**/*.scss'],
				tasks: ['compass:server', 'autoprefixer', 'cssmin', 'clean']
			},
			// css: {
			// 	files: ['assets/css/*.scss', 'assets/css/**/*.scss'],
			// 	tasks: ['sass', 'autoprefixer', 'cssmin', 'clean'],
			// 	options: {
			// 		spawn: false
			// 	}
			// },
			images: {
				files: ['assets/images/**/*.{png,gif,jpg}', 'assets/images/*.{png,gif,jpg}'],
				tasks: ['imagemin'],
				options: {
					spawn: false
				}
			}
		},

		connect: {
			server: {
				options: {
					port: 8000,
					base: './'
				}
			}
		},

		clean: ['assets/build/css/prefixed/', 'assets/build/css/compiled/']
	});

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('default', ['concat', 'uglify', 'sass', 'imagemin']);

	grunt.registerTask('dev', ['connect', 'watch']);
};