$(document).ready(function(){
//uso le funzioni cerca film e serie per riempire la pagina prima della ricerca dell'utente
cerca_film('netflix')
cerca_serie('batman')

//intercetto il click sul bottone e richiamo la funzione cerca_film
$('.search button').on('click', function(){
    //recupero il valore dell'input
    var ricerca = $('.search input').val()
    //se l'input è vuoto al click del bottone search faccio apparire l'input di ricerca
    if(ricerca == ''){
    $('.search input').css({"width":"180px", "padding":"0px 5px"})
    }else{
        //altrimenti richiamo le funzioni cerca film e serie
        search()
    }

})
//intercetto il keypress su invio
$('.search input').keypress(function(event) {
  if ( event.which == 13 ) {
      search()

 }

})
//al click del logo rimposto la pagina iniziale
$('.logo img').click(function(){
    $('.original-title').show()
    cerca_film('netflix')
    cerca_serie('batman')
    $('.film-container h2').text('Film')
    $('.serie-container h2').text('Serie Tv');
})

//FUNZIONI
function search(){
    //nascondo il "titolo"
    $('.original-title').hide()
    //svuoto i contenitori
    $('.wrapper').empty()
    //recupero il valore dell'input
    var ricerca = $('.search input').val()
    //richiamo le funzioni di chiamata
    cerca_film(ricerca);
    cerca_serie(ricerca);
    //modifico i testi dei titoli delle sezioni
    $('.film-container h2').text('Film trovati per: "' + ricerca + '"')
    $('.serie-container h2').text('Serie Tv trovate per: "' + ricerca + '"');
}

//ajax film
function cerca_film (ricerca){
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
                var wrapper_film = $('.film')
                //recupero i risultati
                var film = data.results
                //ciclo gli oggetti all'interno dell'array film
                for (var i = 0; i < film.length; i++) {
                    //recupero i 4 dati
                    var titolo = film[i].title;
                    var titoloOriginale = film[i].original_title;
                    var lingua= film[i].original_language;
                    var voto = film[i].vote_average;
                    var poster = film[i].poster_path;
                    var overwiew = film[i].overview;
                    console.log(overwiew);

                    append_board(wrapper_film, titolo, titoloOriginale, lingua, voto, poster, overwiew)
                }

            },
            error: function(a, b, c){
                var numero = a.status;
                var source   = $('#errore-template').html()
                var template = Handlebars.compile(source);
                var context = {numeroErrore: numero, tipoErrore: c}
                var html = template(context);
                $('.film').append(html);
            }
        })
    }
}


//ajax serie tv
function cerca_serie (ricerca){
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
                var wrapper_serie = $('.serie')
                //recupero i risultati
                var tv = data.results
                //ciclo gli oggetti all'interno dell'array film
                for (var i = 0; i < tv.length; i++) {
                    //recupero i 4 dati
                    var titolo = tv[i].name;
                    var titoloOriginale = tv[i].original_name;
                    var lingua= tv[i].original_language;
                    var voto = tv[i].vote_average;
                    var poster = tv[i].poster_path;
                    var overwiew = tv[i].overview;
                    //con handlebars creo una lista in cui inserisco i dati di ogni film
                    append_board(wrapper_serie, titolo, titoloOriginale, lingua, voto, poster, overwiew)
                }

            },
            error: function(a, b, c){
                var numero = a.status;
                var source   = $('#errore-template').html()
                var template = Handlebars.compile(source);
                var context = {numeroErrore: numero, tipoErrore: c}
                var html = template(context);
                $('.serie').append(html);
            }
        })
    }
}


//crea card
function append_board(contenitore, titolo, titoloOriginale, lingua, voto, poster, overwiew){
    //con handlebarsinserisco i dati nel dom
    if(poster != null){
        var sfondo = 'https://image.tmdb.org/t/p/w185/'+poster;
    }else{
        sfondo = 'img/non-disponibile.png'
    }


    var stato = bandiera(lingua)
    var stelle = stars(voto)
    var source   = $('#board-template').html()
    var template = Handlebars.compile(source);
    var context = {titolo: titolo, titoloOriginale: titoloOriginale, lingua: stato, voto:stelle, poster:sfondo, overwiew:overwiew}
    var html = template(context);
    contenitore.append(html);

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
