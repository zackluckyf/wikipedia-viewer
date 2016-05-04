$(document).ready(function(){
    "use strict";
    
    var search = "";
    
    $('.submit-button').click(function(){
       searchWiki(); 
    });
    
    $("input").on("keydown",function search(e) {
        if(e.keyCode == 13) {
            searchWiki();
        }
    });
    
    function searchWiki(){
        search = $('.text-box').val();
        $.get('https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=5&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=' + search + '&callback=?', function( data ) {
        console.log(data);
        var i = 1;
        $('.top').css('margin-top', '5vh');
        for(var prop in data.query.pages){
            var id = data.query.pages[prop].pageid;
            $(".title" + (i).toString()).html(data.query.pages[prop].title)
                                        .append('<br />')
                                        .append(data.query.pages[prop].extract)
                                        .css('width', '80vw')
                                        .css('background-color', '#c70101')
                                        .css('border', '2px solid #cccc03')
                                        .css('border-radius', '5px')
                                        .css('cursor', 'pointer')
                                        .attr('href', 'http://en.wikipedia.org/?curid=' + id);
            i++;
        }
        }, "json" );
        $('.text-box').val("");
    }
    
});

