$(document).ready(function(){
//intercetto il click sul bottone e richiamo la funzione cerca_film
$('.search button').on('click', cerca_film)
$('.search input').keypress(function(event) {
  if ( event.which == 13 ) {
     cerca_film();
 }

})

//FUNZIONI
function cerca_film (){
    //recupero il valore dell'input
    var ricerca = $('.search input').val()
    //se l'input non è vuoto faccio una chiamata ajax in qui la query è il valore dell'input
    $('main').empty()
    if(ricerca != ''){
        $.ajax({

            'url': 'https://api.themoviedb.org/3/search/movie',
            'method': 'GET',
            'data': {
                'api_key': 'ca530b2f29c17ae553941132a3b631ce',
                'query': ricerca,
            },
            success: function(data){
                //recupero i risultati
                var film = data.results
                //ciclo gli oggetti all'interno dell'array film
                for (var i = 0; i < film.length; i++) {
                    //recupero i 4 dati
                    var titolo = film[i].title;
                    var titoloOriginale = film[i].original_title;
                    var lingua= film[i].original_language;
                    var voto = film[i].vote_average;
                    //con handlebars creo una lista in cui inserisco i dati di ogni film
                    var t = stars(voto)
                    console.log(t);
                    console.log(voto);
                    var source   = $('#ul-template').html()
                    var template = Handlebars.compile(source);
                    var context = {titolo: titolo, titoloOriginale: titoloOriginale, lingua: lingua, voto:t}
                    var html = template(context);
                    $('main').append(html);
                }

            },
            error: function(a, b, c){
                var numero = a.status;
                var source   = $('#errore-template').html()
                var template = Handlebars.compile(source);
                var context = {numeroErrore: numero, tipoErrore: c}
                var html = template(context);
                $('main').append(html);
            }
        })
    }
}

function stars(nu){
    var rate = nu / 2;
    var rate = Math.round(rate)
    console.log('questo è il rate' + rate);
    var stars_gold = '';
    var stars_white = '';
    var s = 5 - rate;
    console.log('s: ' + s);
    for (var i = 0; i < rate; i++) {
        var stars_gold = stars_gold + '<i class="fas fa-star"></i>';
}
console.log('i' + i);
    for (var c = 0; c < s; c++) {
        var stars_white = stars_white + '<i class="far fa-star"></i>';
}
    var star = stars_gold + stars_white;
    return star

}
})
