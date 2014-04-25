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
				browsers: ['last 3 versions']
			},
			multiple_files: {
				expand: true,
				flatten: true,
				src: 'assets/build/css/compiled/screen.css',
				dest: 'assets/build/css/prefixed/'
			}
		},

		modernizr: {
			"devFile": "assets/js/modernizr/modernizr-2.6.2.min.js",
			"outputFile": "assets/build/js/modernizr-custom.js"
		},

		exec: {
			serverup: {
				command:'/Applications/MAMP/bin/start.sh'
			},
			serverdown: {
				command: '/Applications/MAMP/bin/stop.sh'
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
			js: {
				src: [
					'assets/js/g.js',
					'assets/js/partials/*.js',
					'assets/js/main.js'
				],
				dest: 'assets/build/js/main.js'
			}
		},

		uglify: {
			dist: {
				options: {
					sourceMap: true,
					sourceMapName: 'assets/build/js/main.min.map'
				},
				files: {
					'assets/build/js/plugins.js' : 'assets/js/plugins/plugins.js',
					'assets/build/js/main.min.js': 'assets/build/js/main.js'
				}
				//src: 'assets/build/js/main.js',
				//dest: 'assets/build/js/main.min.js'
				// options: {
				// 	sourceMap: true,
				// 	sourceMapName: 'assets/build/js/main.map'
				// },
				// files: {
				// 	'assets/build/js/main.min.js': ['assets/build/js/main.js']
				// }
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
				files: ['assets/js/*.js', 'assets/js/**/*.js'],
				tasks: ['concat', 'uglify', 'jshint'],
				options: {
					spawn: false
				}
			},
			html: {
				files: ['*.html', '**/*.html'],
				tasks: [],
				options: {
					spawn: false
				}
			},
			php: {
				files: ['*.php', '**/*.php'],
				tasks: [],
				options: {
					spawn: false
				}
			},
			compass: {
				files: ['assets/css/*.scss', 'assets/css/**/*.scss'],
				tasks: ['compass:server', 'autoprefixer', 'cssmin', 'clean']
			},
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

	grunt.registerTask('dev', ['connect', 'modernizr', 'watch']);
	//grunt.registerTask('dev', ['exec:serverup', 'modernizr', 'watch', 'exec:serverdown']);
};