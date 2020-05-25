$(document).ready(function(){
//intercetto il click sul bottone e richiamo la funzione cerca_film
$('.search button').on('click', function(){
    $('main').empty()
    cerca_film()
    cerca_serie()
})

$('.search input').keypress(function(event) {
  if ( event.which == 13 ) {
      $('main').empty()
     cerca_film();
     cerca_serie ()
 }

})

//FUNZIONI
function cerca_film (){
    //recupero il valore dell'input
    var ricerca = $('.search input').val()
    //se l'input non è vuoto faccio una chiamata ajax in qui la query è il valore dell'input
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
                    var poster = film[i].backdrop_path;

                    append_board(titolo, titoloOriginale, lingua, voto)
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



function cerca_serie (){
    //recupero il valore dell'input
    var ricerca = $('.search input').val()
    //se l'input non è vuoto faccio una chiamata ajax in qui la query è il valore dell'input
    if(ricerca != ''){
        $.ajax({

            'url': 'https://api.themoviedb.org/3/search/tv',
            'method': 'GET',
            'data': {
                'api_key': 'ca530b2f29c17ae553941132a3b631ce',
                'query': ricerca,
            },
            success: function(data){
                //recupero i risultati
                var tv = data.results
                //ciclo gli oggetti all'interno dell'array film
                for (var i = 0; i < tv.length; i++) {
                    //recupero i 4 dati
                    var titolo = tv[i].name;
                    var titoloOriginale = tv[i].original_name;
                    var lingua= tv[i].original_language;
                    var voto = tv[i].vote_average;
                    var poster = tv[i].backdrop_path
                    //con handlebars creo una lista in cui inserisco i dati di ogni film
                    append_board(titolo, titoloOriginale, lingua, voto)
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



function append_board(titolo, titoloOriginale, lingua, voto, poster){
    //con handlebarsinserisco i dati nel dom
    var sfondo = 'https://image.tmdb.org/t/p/w185/'+poster;
    var stato = bandiera(lingua)
    var stelle = stars(voto)
    var source   = $('#board-template').html()
    var template = Handlebars.compile(source);
    var context = {titolo: titolo, titoloOriginale: titoloOriginale, lingua: stato, voto:stelle, poster:sfondo}
    var html = template(context);
    $('main').append(html);
}
//funzione per stampare le stelle che rappresentano il voto
function stars(nu){
    var rate = nu / 2;
    var rate = Math.round(rate)
    var stars_gold = '';
    var stars_white = '';
    var s = 5 - rate;
    for (var i = 0; i < rate; i++) {
        var stars_gold = stars_gold + '<i class="fas fa-star"></i>';
    }
    for (var c = 0; c < s; c++) {
        var stars_white = stars_white + '<i class="far fa-star"></i>';
    }
    var star = stars_gold + stars_white;
    return star

}

//se la bandiera è presente la inserisco altrimenti stampo la siglia
function bandiera(sigla){
    if(sigla == 'en'|| sigla == 'it'|| sigla == 'fr'){
        var stato = '<img src="img/'+sigla+'.png" alt="">'
    }else{
        stato=sigla;
    }
    return stato
}
})
