module.exports = (grunt) ->

# Project configuration.
    grunt.initConfig
        pkg: grunt.file.readJSON 'package.json'

# CSS processing
        sass: 
            dist: 
                options: 
                    style: 'expanded'
                files: 
                    'assets/build/css/compiled/screen.css' : 'assets/css/screen.scss'

        compass: 
            options: 
                sassDir: 'assets/css/'
                cssDir: 'assets/build/css/compiled/'
                imagesDir: 'assets/images/'
                javascriptsDir: 'assets/build/js/'
                outputStyle: 'expanded'

            dist:''
            server: 
                options: 
                    debugInfo: true

        autoprefixer: 
            options: 
                browsers: ['last 2 version']

            multiple_files:
                expand: true,
                flatten: true,
                src: 'assets/build/css/compiled/screen.css'
                dest: 'assets/build/css/prefixed/'

        modernizr: 
            "devFile": "assets/js/modernizr/modernizr-2.6.2.min.js"
            "outputFile": "assets/build/js/modernizr-custom.js"

        cssmin: 
            combine: 
                files:'assets/build/css/screen.min.css': ['assets/build/css/prefixed/screen.css']

# JavaScript Processing
        coffee: 
            app:
                expand: true
                cwd: 'assets/js/coffee/'
                src: ['**/*.coffee']
                dest: 'assets/js/'
                ext: '.js'

        jshint: 
            beforeconcat: ['assets/js/*.js']

        concat: 
            dist: 
                src: [
                    'assets/js/vendor/*.js'
                    'assets/js/*.js'
                ]
                dest: 'assets/build/js/main.js'

        uglify: 
            build: 
                src: 'assets/build/js/main.js',
                dest: 'assets/build/main.min.js'

# Image Processing
        imagemin: 
            dynamic: 
                files: [
                    expand: true
                    cwd: "assets/images/"
                    src: ['**/*.{png,gif,jpg}']
                    dest: "assets/images/"
                    ]

# Watch Task

        watch: 
            options:
                livereload: 
                    port: 9000 # Allows you to specify port incase you want to run multiple projects as once.
                    #Allows you to connect an Https server and still have livereload 
                    #key: grunt.file.read 'path/to/ssl.key'
                    #cert: grunt.file.read 'path/to/ssl.crt'
                    #you can pass in any other options you'd like to the https server, as listed here: http://nodejs.org/api/tls.html#tls_tls_createserver_options_secureconnectionlistener
            coffee:
                files: 'assets/js/coffee/**/*.coffee'
                tasks: 'coffee'
            js: 
                files: 'assets/js/*/js'
                tasks: ['concat', 'uglify', 'jshint']
                options: 
                    spawn: false

            html: 
                files: ['*.html', '**/*.html']
                tasks: []
                options: 
                    spawn: false


            compass: 
                files: ['assets/css/*.scss', 'assets/css/**/*.scss']
                tasks: ['compass:server', 'autoprefixer', 'cssmin', 'clean']

            images: 
                files: ['assets/images/**/*.{png,gif,jpg}', 'assets/images/*.{png,gif,jpg}']
                tasks: ['imagemin']
                options: 
                    spawn: false

# Connect Task
        connect: 
            server: 
                options: 
                    port: 8000
                    base: './'

# Clean Task
        clean: ['assets/build/css/prefixed/', 'assets/build/css/compiled/']


# Load dependencies
    require('load-grunt-tasks')(grunt)

# Define Tasks
    grunt.registerTask 'default', [
                                    'coffee'
                                    'concat' 
                                    'uglify' 
                                    'sass' 
                                    'imagemin'
                                ]

    grunt.registerTask 'dev', [
                                'connect' 
                                'modernizr' 
                                'watch'
                            ]