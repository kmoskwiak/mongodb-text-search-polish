(function(global){
    var resultContainer = document.getElementById('search-result');
    var app = {};

    app.search = function(e){
        e.preventDefault();
        var req = new XMLHttpRequest();
        req.open('GET', '/api/search?search=' + e.target.elements.search.value, true);

        req.onreadystatechange = function(response){
            if(req.readyState == 4){
                if(req.status == 200){
                    var reply = JSON.parse(req.responseText);
                    createSearchResults(reply);
                }
            }
        };

        req.send(null);
    };

    function createSearchResults(results){
        resultContainer.innerHTML = '';
        results.map(function(result){
            var div = document.createElement('div');
            div.className = 'search-item';
            div.innerText = result.article;
            resultContainer.appendChild(div);
        });
    }


    global._mongoApp = app;
})(window);