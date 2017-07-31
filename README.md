# Przeszukiwanie tekstu w MongoDB dla języka polskiego

## Wstęp

Celem było zaimplementowanie wyszukiwarki na stronie. Aplikacja ma zwracać listę artykułów zawierających wyszukiwane słowa.

Początkowa implementacja bazująca na `regex` zwracała wszystkie artykuły z wyszukiwaną frazą, jednak nie dawała informacji o trafności wyszukiwania (np informacji, że w danym artykule znajdują się 3 z 4 wyszukiwanych słów). Brak dodatkowego wymiaru do sortowania wyników wymuszał sortowanie po dacie publikacji, co sprawiało, że bardziej pasujące artykuły były nisko w wynikach.

Operator `$text` w wersji 3.2 MongoDB pozwala na przeszukiwanie tekstu w polach zaindeksowanych za pomocą `text index`. Niestety obecna wersja bazy nie wspiera języka polskiego, co oznacza m.in brak wsparcia dla stemmingu dla tego języka.

Zaimplementowanie dodatkowej kolekcji kluczy (`SearchIndexSchema`) pozwoliło uzyskać trafniejsze wyniki wyszukiwania oraz dodatkowy wymiar do sortowania.

## Tworzenie kluczy

Model kluczy:

```
var SearchIndexSchema = new Schema({
    key: { type: String, index: true },     // Słowo poddane procesowi stemmingu
    score: { type: Number, default: 1 },    // Liczba wystąpień słowa w artykule 
    entity: { type: Schema.Types.ObjectId } // ID artykułu
});

```

Schemat tworzenia kluczy dla pojedynczego artykułu:

```
Artykuł ---> Usunięcie znaków specjalnych za pomocą regex ---> Rozbicie artykułu na pojedyncze słowa ---> Stemming słów ---> Zliczanie wystąpień danego słowa w artykule ---> Zapis do bazy danych

```

## Wyszukiwanie

Po wpisaniu hasła przez użytkownika jest ono poddawane procesowi stemmingu, a następnie przeszukiwana jest kolekcja kluczy. 
Sortowanie wyników odbywa się po 3 wymiarach:
* `wordsMatch` - ilość pasujących słów do artykułu,
* `score` - suma wystąpień każdego słowa w tekście,
* `_id` - id artykułu (niejawnie data publikacji).

```
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
```

## Uruchomienie

Po uruchomieniu bazy danych:

```
npm start
```


