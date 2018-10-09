const awspublish = require('gulp-awspublish'),
    fs = require('fs'),
    pkg = require('./package.json'),
    rename = require('gulp-rename'),
    yaml = require('js-yaml'),
    gulp = require('gulp'),
    axios = require('axios'),
    imagemin = require('gulp-imagemin'),
    imageminJpegRecompress = require('imagemin-jpeg-recompress'),
    responsive = require('gulp-responsive');

function bakeStory(slug) {
    return axios.get('http://localhost:3000/' + pkg.name  + '/api/docs/' + slug + '.json').then(result => {
        return new Promise((resolve, reject) => {
            fs.writeFileSync(
                __dirname + '/static/docs/' + (slug ? slug : 'index') + '.json',
                JSON.stringify(result.data)
            );

            resolve();
        });
    });
}

const slugs = [
    'index', 'walled-off', 'border-closing-history'
];

gulp.task('bake-stories', () => {
    return Promise.all(slugs.map(slug => bakeStory(slug)));
});

gulp.task('resize-img', () =>
    gulp
        .src('static/img/**/*.{png,jpg,JPG,jpeg}', {
            base: 'static/img/'
        })
        .pipe(rename(function (path) {
            if (path.extname == '.JPG') {
                path.extname = ".jpg";
            }
            if (path.extname == '.jpeg') {
                path.extname = ".jpg";
            }
        }))
        .pipe(
            responsive(
                {
                    '**/*': [
                        {
                            width: 2880,
                            rename: { suffix: '-2880' }
                        },
                        {
                            width: 1440,
                            rename: { suffix: '-1440' }
                        },
                        {
                            width: 720,
                            rename: { suffix: '-720' }
                        }
                    ]
                },
                {
                    quality: 60,
                    compressionLevel: 6,
                    withMetadata: false,
                    errorOnEnlargement: false,
                    errorOnUnusedImage: false
                }
            )
        )
        .pipe(
            imagemin(
                [
                    // imagemin.gifsicle({ interlaced: true }),
                    /*
                    imageminJpegRecompress({
                        progressive: true,
                        method: 'smallfry',
                        quality: 'veryhigh'
                    }),*/
                    imagemin.optipng(),
                    // imagemin.svgo({ plugins: [{ cleanupIDs: false }] })
                ],
                { verbose: true }
            )
        )
        .pipe(gulp.dest('static/resized/'))
);
