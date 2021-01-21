module.exports = {
    pages: {
        index: 'src/main.js',                    // main window
    },
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
//Add also your database location
                extraResources: ['src/res/']
            },
            //This line: add knex and sqlite3
            externals: ['knex','sqlite3'],
        }
    }
}