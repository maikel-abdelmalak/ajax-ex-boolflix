$(document).ready(function(){

$('.search button').on('click', cerca_film)



function cerca_film (){
    var ricerca = $('.search input').val()
    if(ricerca != ''){

        $.ajax({

            'url': 'https://api.themoviedb.org/3/search/movie',
            'method': 'GET',
            'data': {
                'api_key': 'ca530b2f29c17ae553941132a3b631ce',
                'query': ricerca,
            },
            success: function(data){
                var film = data.results
                for (var i = 0; i < film.length; i++) {
                    var titolo = film[i].title;
                    var titoloOriginale = film[i].title;
                    var lingua= film[i].title;
                    var voto = film[i].title;
                    console.log(stampa);
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
})
