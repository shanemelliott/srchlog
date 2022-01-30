$(function () {
    var vetext=$('#VETextpostResult')
    var api=$('#apipostResult')

    function hiliter(word, data) {
        var rgxp = new RegExp(word, 'g');
        var repl = '<mark>' + word + '</mark>';
        return data.replace(rgxp, repl);
    }
  


    $('#search').on('click',function(){
        var search=encodeURI($('#msgTxt').val())
      
            $.getJSON('/search/?search='+search,function (response) {
               console.log(response)
               var vetextData=response.vetext.join('\r\n')
               var apiData=response.vistaapi.join('\r\n')
               if(search){
                    vetextData=hiliter(search,vetextData)
                    apiData=hiliter(search,apiData)
               }
               vetext.html('<pre id=logs>'+vetextData+'</pre>')
               api.html('<pre id=logs2>'+apiData+'</pre>')          
            })
    })

})