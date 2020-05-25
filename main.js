$(document).ready(function(){
//intercetto il click sul bottone e richiamo la funzione cerca_film
$('.search button').on('click', cerca_film)
$('.search input').keypress(function(event) {
  if ( event.which == 13 ) {
     cerca_film();
 }

})
stars(7.6)
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
                    var source   = $('#ul-template').html()
                    var template = Handlebars.compile(source);
                    var context = {titolo: titolo, titoloOriginale: titoloOriginale, lingua: lingua, voto:voto}
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

function stars(voto){
    var rate = voto / 2;
    var rate = Math.round(rate)
    console.log(rate);
}
})
