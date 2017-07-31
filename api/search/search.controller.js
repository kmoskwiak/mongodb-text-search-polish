'use strict';

import SearchIndex from './search.model';
import articleCtrl from '../article/article.controller';
import stemmer from './stemmer';

/**
 * Main search endpoint
 */
exports.index = function(req, res){
    var query = req.query;

    if(!query){
        return res.json([]);
    }

    var search = [];
    var searchRegularExp = [];
    if(query.search){ 

    // Remove from search special characters
    query.search = query.search
            .replace(/\n/gm, ' ')
            .replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()"']/g, '');

    // Split text into single words
    search = query.search.split(' ');
    search.map(function(word){
        if(word.length > 1){
            // Stemm word
            word = stemmer(word);
            // Create regex based on stemmed word
            searchRegularExp.push(new RegExp(escapeRegEx(word), 'i'));
        }
    });

    // Prepare conditions for aggregation
    var match = { key: { $in: searchRegularExp } };

        SearchIndex
        .aggregate([
            {
                $match: match
            },
            {
                $group: {
                    _id: '$entity',
                    wordsMatch: { $sum: 1 },
                    score: { $sum: '$score' }
                }
            },{
                $sort: {
                    wordsMatch: -1,
                    score: -1,
                    _id: -1
                }
            }
        ])
        .exec(function(err, result){
            if(err){ return res.status(500).json(err); }

            // Create sorted array of id`s 
            var ids = [];
            result.map(function(item){
                ids.push(item._id.toString());
            });

            // Get all articles with id`s form array
            articleCtrl.fetchArticles({_id: {$in: ids }})
            .then(function(results){

                // Replace id`s with articles
                results.map(function(article){
                    var index = ids.indexOf(article._id.toString());
                    ids[index] = article;
                });

                res.json(ids);
            });

            
        });
    }
    
};

/**
 * Init SearchIndex collection. Internal function
 */
function _init(){
    return cleanAllIndexes()
    .then(articleCtrl.fetchArticles)
    .then(function(articles){
        var tasks = [];
        articles.map(function(article){
            tasks.push(createKeys(article));
        });
        return Promise.all(tasks);
    })
    .then(function(_keys){
        var keys = [];

        _keys.map(function(key){
            keys = keys.concat(key);
        });

        return keys;
    })
    .then(addWords);
}

exports._init = _init;

/**
 * Init SearchIndex collection. Api endpoint
 */
exports.init = function(req, res){
    _init()
    .then(function(count){
        res.json({
            ok: true,
            keys: count
        });
    })
    .catch(function(err){
        res.json(err);
    });
};

/**
 * Cleans all indexes in database
 */
function cleanAllIndexes(){
    return new Promise(function(resolve, reject){
        SearchIndex
        .find()
        .remove(function(err){
            if(err){ return reject(err); }
            return resolve();
        });
    });
}

/**
 * Creates keys from article
 * @param {Object} entity Article
 * @return {Promise}
 */
function createKeys(entity){
    return new Promise(function(resolve, reject){

        var text = entity.article
        .replace(/\n/gm, ' ')
        .replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()"']/g, '');
        var words = {};
        var textArray = text.split(' ');

        textArray.map(function(word){
            word = word.trim();
            if(word.length < 3){ return; }
            // Stem word
            word = stemmer(word);

            if(words[word.toString()]){ 
                words[word.toString()] ++; 
                return;
            }
            words[word.toString()] = 1;
        });

        var wordsArray = [];

        for(var key in words){
            if(words.hasOwnProperty(key)){
                wordsArray.push({ 
                    key: key, 
                    score: words[key],
                    entity: entity._id
                });
            }
        }

        return resolve(wordsArray);
    });

}

/**
 * Saves keys in database
 * @param {Array} words  Array of SearchIndex entities
 */
function addWords(words){
    return new Promise(function(resolve, reject){
        SearchIndex.create(words, function(err, words){
            if(err){ return reject(err); }
            return resolve(words.length);
        });
    });
}

/**
 * Escape unwanded Regex
 * @param {Strong} str user input
 */
function escapeRegEx(str){
    return str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
}