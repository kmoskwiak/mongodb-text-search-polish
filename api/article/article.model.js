'use strict';

import mongoose, { Schema } from 'mongoose';

var ArticleSchema = new Schema({
    article: String
});

var Article = mongoose.model('Article', ArticleSchema);

export default Article;