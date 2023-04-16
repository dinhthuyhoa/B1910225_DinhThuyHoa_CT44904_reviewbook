const config = {
    app: {
        port: process.env.PORT || 3000,
    },

    db: {
        uri: process.env.MONGODB_URI || 3000,
    }
};

module.exports = config;