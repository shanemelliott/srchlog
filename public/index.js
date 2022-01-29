$(function () {


    $('#search').on('click',function(){
        var search=encodeURI($('#msgTxt').val())
        $('#postResult').html("")

            $.getJSON('/search/?search='+search,function (response) {
               console.log(response)
               $('#VETextpostResult').html('<pre>'+response.vetext.join('\r\n')+'</pre>')
               $('#apipostResult').html('<pre>'+response.vistaapi.join('\r\n')+'</pre>')
            })
    })

})