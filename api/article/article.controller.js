'use strict';

import Article from './article.model';

/**
 * Get list of articles based on query
 * @param {Object} query    find conditions 
 */
function _fetchArticles(query){
    return new Promise(function(resolve, reject){
        Article
        .find(query)
        .exec(function(err, articles){
            if(err){
                return reject(err);
            }
            return resolve(articles);
        });
    });
}

exports.fetchArticles = _fetchArticles;