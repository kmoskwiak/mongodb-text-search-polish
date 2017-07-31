'use strict';

import Article from '../api/article/article.model';
import { _init } from '../api/search/search.controller';

var initdata = [
    'Jak się tak leży godzinami w nocy, to myśleniem można zajść bardzo daleko i w bardzo dziwne strony, wiesz...',
    'Nie żałuj, nigdy nie żałuj, że mogłeś coś zrobić w życiu, a tego nie zrobiłeś. Nie zrobiłeś, bo nie mogłeś.',
    'Wcale nie chcemy zdobywać kosmosu, chcemy tylko rozszerzyć Ziemię do jego granic. Jedne planety mają być pustynne jak Sahara, inne lodowate jak biegun albo tropikalne jak dżungla brazylijska. Jesteśmy humanitarni i szlachetni, nie chcemy podbijać innych ras, chcemy tylko przekazać im nasze wartości i w zamian przejąć ich dziedzictwo. Mamy się za rycerzy świętego Kontaktu. To drugi fałsz. Nie szukamy nikogo oprócz ludzi. Nie potrzeba nam innych światów. Potrzeba nam luster. Nie wiemy, co począć z innymi światami. Wystarczy ten jeden, a już się nim dławimy.',
    'Ludzie nie pragną nieśmiertelności - podjąłem po chwili. - Nie chcą tylko, po prostu, umierać. Chcą żyć, profesorze Decantor. Chcą czuć ziemię pod nogami, widzieć chmury nad głową, kochać innych ludzi, być z nimi i myśleć o tym. Nic więcej.',
    'Można przypuścić, że wszyscy ludzie mają świadomość, lecz na ogół nie wszyscy zdają sobie z tego sprawę.',
    'To, co czuję jest dla Ciebie nieużyteczne, wiem. Ale kiedyś będziesz miał wiele rzeczy za sobą i mało przed sobą. Będziesz może szukał wśród wspomnienia jakiegoś oparcia, czegoś, od czego zaczyna się rachubę lub na czym się ją kończy. Będziesz już całkiem inny i wszystko będzie inne, i nie wiem, gdzie będę, ale to nie ważne.',
    'Pomyśl wtedy, że mogłeś mieć moje sny i głos i troski i nieznane mi jeszcze pomysły. I moją niecierpliwość i nieśmiałość, że w taki sposób mogłeś mieć świat po raz drugi. A kiedy będziesz tak myślał, nie ważne będzie, żeś nie umiał, czy nie chciał tego mieć. (...) Ważne będzie tylko, że byłeś moją słabością i siłą, utratą i odzyskaniem, światłem, ciemnością, bólem – to znaczy życiem…',
    'Będziesz trwał w pyle, w który zmieni się moja pamięć zatrzymana na zawsze, silniejsza niż czas, niż gwiazdy, silniejsza niż śmierć… (...) Milczysz? To dobrze. Nie mów „zapomnij”. Nie mów tak. Jesteś przecież rozumnym mężczyzną.',
    'Więc gdybym zapomniała, to nie byłabym już ja, bo Ty wszedłeś we wszystkie moje rzeczy, zmieszałeś się z najdawniejszymi wspomnieniami, doszedłeś tam, gdzie nie ma jeszcze myśli, gdzie nie rodzą się nawet sny. I gdyby ktoś wydarł Cię ze mnie, zostałaby pustka, jak gdyby nigdy mnie nie było… (...) Chciałam o Tobie zapomnieć, jednak gdy patrzyłam na Błękitną Ziemię, było tak, jakbym patrzyła na Ciebie. Bo Ty jesteś wszędzie, gdzie patrzę.',
    'Książką można czytelnikowi głowę, owszem przemeblować o tyle, o ile jakieś meble już w niej przed lekturą stały.',
    'Nikt nic nie czyta, a jeśli czyta, to nic nie rozumie, a jeśli nawet rozumie, to nic nie pamięta.',
    'Człowiek wyruszył na spotkanie innych światów, innych cywilizacji, nie poznawszy do końca własnych zakamarków, ślepych dróg, studni, zabarykadowanych, ciemnych drzwi.',
    'Człowiek musi jeść, pić i ubierać się; reszta jest szaleństwem.',
    'Najłatwiej oczywiście zwalić wszystko na diabła i powiedzieć, że to on osobiście jest odpowiedzialny, że zło wstrzykiwane jest naszemu gatunkowi przez jakieś osobowe Belzebuby. Mnie się zdaje, że ono jednak siedzi w nas i że całkowicie go usunąć nigdy nie zdołamy.',
    'Jak to jednak miło pomyśleć, że tylko człowiek może być draniem.',
    'Idiotów uszczęśliwić można byle czym, z rozumnymi jest gorzej. Rozumowi niełatwo dogodzić. Rozum bezrobotny to wprost jedna zmartwiona dziura, nicość, potrzebne mu są przeszkody. Szczęśliwy przy ich pokonywaniu, zwyciężywszy, wnet popada we frustrację, a nawet wariację. Trzeba mu więc stawiać przeszkody wciąż nowe, podług jego miary.'
];

function initDB(){
    Article
    .find()
    .remove(function(){

        var articles = [];
        initdata.map(function(article){
            articles.push({
                article: article
            });
        });

        Article
        .create(articles, function(){
            
            _init()
            .then(function(){
                console.log('Search Indexes created!');
            })
            .catch(function(err){
                throw err;
            });

        });

    });
}

export default initDB;