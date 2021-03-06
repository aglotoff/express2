const fs = require('fs');
const path = require('path');

const browserSync = require('browser-sync');
const del = require('del');
const gulp = require('gulp');
const data = require('gulp-data');
const filter = require('gulp-filter');
const beautify = require('gulp-beautify');
const plumber = require('gulp-plumber');
const pug = require('gulp-pug');
const pugInheritance = require('gulp-pug-inheritance');
const tap = require('gulp-tap');
const lazypipe = require('lazypipe');
const YAML = require('yaml');

const config = require('../config');

const htmlTasks = lazypipe()
    .pipe(data, (file) => {
        // pass YAML data to pug
        const globalData = YAML.parse(
            fs.readFileSync(config.paths.html.globalData).toString(),
        );
        const dataFile = path.join(
            config.paths.html.pageDataDir,
            file.relative.replace(/.pug$/, '.yml'),
        );
        return {
            data: fs.existsSync(dataFile) ? {
                ...globalData,
                ...YAML.parse(fs.readFileSync(dataFile).toString()),
            } : globalData,
        };
    })
    .pipe(pug, config.plugins.pug)
    .pipe(beautify.html, config.plugins.beautify)
    .pipe(gulp.dest, config.paths.html.dest)
    .pipe(browserSync.reload, { stream: true });

// ----------------------------------------
//   Task: Build: HTML
// ----------------------------------------

gulp.task('build:html', (cb) => {
    gulp.src(config.paths.html.src)
        .pipe(plumber())
        .pipe(htmlTasks())
        .on('end', cb);
});

// ----------------------------------------
//   Task: Watch: HTML: Templates
// ----------------------------------------

gulp.task('watch:html:templates', () => gulp.watch(config.paths.html.watch)
    .on('all', (e, filePath) => {
        if ((e !== 'add') && (e !== 'change')) {
            return;
        }

        // Rebuild only changed .pug files and their dependents
        gulp.src(filePath)
            .pipe(plumber())
            .pipe(pugInheritance(config.plugins.pugInheritance))
            .pipe(tap((file) => {
                // make all paths relative to the src/pug/pages folder
                // eslint-disable-next-line no-param-reassign
                file.base = config.paths.html.pagesDir;
            }))
            // exclude all files outside the src/pug/pages folder,
            // e.g. layout files
            .pipe(filter((file) => !file.relative.startsWith('..')))
            .pipe(htmlTasks());
    }));

// ----------------------------------------
//   Task: Watch: HTML: Global Data
// ----------------------------------------

gulp.task('watch:html:global-data', () => gulp.watch(
    config.paths.html.globalData,
    gulp.series('build:html'),
));

// ----------------------------------------
//   Task: Watch: HTML: Page Data
// ----------------------------------------

gulp.task('watch:html:page-data', () => gulp.watch(config.paths.html.pageData)
    .on('all', (e, filePath) => {
        if ((e !== 'add') && (e !== 'change')) {
            return;
        }

        // Rebuild only the page whose data has changed
        const pageFile = path.join(
            config.paths.html.pagesDir,
            path
                .relative(config.paths.html.pageDataDir, filePath)
                .replace(/.yml$/, '.pug'),
        );

        gulp.src(pageFile, {
            allowEmpty: true,
            base: config.paths.html.pagesDir,
        })
            .pipe(plumber())
            .pipe(htmlTasks());
    }));

// ----------------------------------------
//   Task: Watch: HTML
// ----------------------------------------

gulp.task('watch:html', gulp.parallel(
    'watch:html:templates',
    'watch:html:global-data',
    'watch:html:page-data',
));

// ----------------------------------------
//   Task: Clean: HTML
// ----------------------------------------

gulp.task('clean:html', () => del(config.paths.html.clean));
