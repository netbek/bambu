/**
 * bambu
 *
 * @author Hein Bekker <hein@netbek.co.za>
 * @copyright (c) 2015 Hein Bekker
 * @license https://github.com/netbek/bambu/LICENSE MIT
 */

module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			banner: ['/*',
				' * <%= pkg.name %>',
				' * <%= pkg.homepage %>',
				' *',
				' * @author <%= pkg.author.name %> <<%= pkg.author.email %>>',
				' * @copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>',
				' * @license <%= pkg.license.url %> <%= pkg.license.type %>',
				' */\n'].join('\n')
		},
		clean: {
			init: ['build', 'dist'],
			exit: ['build'],
		},
		bambu_grid: {
			grid: {
				options: {
					columns: 12,
					gutter: 2,
					unit: 'em',
					rowClass: 'row',
					columnClass: 'col',
					mediaQueries: {
						xs: 'screen and (min-width: 0em)', // 0px
						sm: 'screen and (min-width: 40em)', // 640px
						md: 'screen and (min-width: 62em)' // 992px
					}
				},
				dest: 'src/css/bambu-grid.css'
			}
		},
		concat: {
			dist: {
				src: [
					'src/css/bambu-base.css',
					'bower_components/normalize-css/normalize.css',
					'src/css/bambu-grid.css'
				],
				dest: 'dist/css/bambu.css'
			}
		},
		cssmin: {
			options: {
				advanced: false
			},
			dist: {
				files: [
					{
						src: ['dist/css/bambu.css'],
						dest: 'dist/css/bambu.min.css'
					}
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-bambu-grid');

	grunt.registerTask('default', [
		'clean:init',
		'bambu_grid',
		'concat',
		'cssmin',
		'clean:exit'
	]);

};