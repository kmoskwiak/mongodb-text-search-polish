'use strict';

import mongoose, { Schema } from 'mongoose';

var SearchIndexSchema = new Schema({
    key: { type: String, index: true },     // Słowo poddane procesowi stemmingu
    score: { type: Number, default: 1 },    // Liczba wystąpień słowa w artykule 
    entity: { type: Schema.Types.ObjectId } // ID artykułu
});

var SearchIndex = mongoose.model('SearchIndex', SearchIndexSchema);

export default SearchIndex;