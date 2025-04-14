current_discapacidad_index = 0

var audioDL = true
var contador = 0;
var mrPack = true;
var herramienta = 'b';

var puntosAzules = 0;
var puntosRojos = 0;

function checarMrPack(){
    if (mrPack) {
        $('#mrpackH,#mrpackN').css('opacity','1');
    } else {
        $('#mrpackH,#mrpackN').css('opacity','0');
    }
}

function pausedButton(state) {
    if (state == 1) {
        $('#pausado,#mrpackN').show();
        $('#no-pausado,#mrpackH').hide();
        console.log('pausado');
    } else {
        $('#pausado,#mrpackN').hide();
        $('#no-pausado,#mrpackH').show();
        console.log('no pausado');
    }
}

function togglePause() {
    if (audioDL) {
        if (audios_DL.paused && audios_DL.currentTime > 0 && !audios_DL.ended) {
            audios_DL.play();
            pausedButton(0);
        } else {
            audios_DL.pause();
            pausedButton(1);
        }
    } else {
        if (audios_DL.paused && audios_DL.currentTime > 0 && !audios_DL.ended) {
            audios_DL.play();
            pausedButton(0);
        } else {
            audios_DL.pause();
            pausedButton(1);
        }
    }
    if (videoG) {
        if (document.getElementById('video_gral').paused && document.getElementById('video_gral').currentTime > 0 && !document.getElementById('video_gral').ended) {
            document.getElementById('video_gral').play();
            pausedButton(0);
        } else {
            pausedButton(1);
            document.getElementById('video_gral').pause();
        }
    }
}

var no_slide = 2;

$('document').ready(function() {
    $.ajaxSetup({
        cache: false
    });

    
    var inicio = true;
    var totalSlide = 12;
    var porcentaje = (no_slide * 100) / totalSlide;

    if (no_slide > totalSlide) {
        no_slide = 1
    }

    if (no_slide <= 1) {
        no_slide = 1
        $('.prev').addClass('clickDisabled');
    }

    $('body').on('click', '.ocultar', function() {
        $('.negro').hide();
        $('.row-view').css("background-image", "url('')");
    });

    $('#play').addClass('clickDisabled');


    function control_secundarios() {

        if (no_slide == 1) {
            $('.cintas').show();
            $('.next').show();
            $('.ico1').show();
            $('.ico2').show();
            $('.ico3').show();
            $('.contenedor_control').hide();
            $('.fondo_logo').hide();
            $('.banderaSiguiente').addClass('forzar');
            $('.banderaHome').hide();
            $('.prev').addClass('clickDisabled').hide();
        } else {
            $('.ico1').hide();
            $('.ico2').hide();
            $('.ico3').hide();
            $('.next').show();
            $('.click-next').show();
            $('.reset').show();
            $('.prev').show();
            $('.linea').show();
            $('.linea2').show();
            $('.banderaSiguiente').addClass('forzar');
            $('.banderaHome').hide();
            $('.prev').removeClass('clickDisabled').show();
            $('.next').addClass('clickDisabled');
            ferhabla = true
            paulhabla = true
            prisihabla = true
            video_s8 = false
        }

        if (no_slide == 1 || no_slide == totalSlide) {
            $('.logo').hide();
            $('.carlos').hide();
            $('.cintas').show();
            $('.siguiente').hide();
            $('.fondo-logo').show();
            $('.book').hide();
            var video_s8 = false
            var video_s8 = false
            var video_s6 = false
            var video_s8 = false

        } else {
            $('.logo').show();
            $('.carlos').show();
            $('.cintas').show();
            $('.fondo-logo').hide();
        }

        if (no_slide == totalSlide) {
            $('.controles').hide();
            //$('.next,.reset,.pausa').hide();
            //$('.reset').hide();
        } else {
            //$('.next,.reset,.pausa').show();;
        }



        if ([2, 3, 4, 5].indexOf(no_slide) > -1) {
            $('.row-view').css("background", "#fff");
        } else {
            $('.row-view').css("background", "#f4f8fc");
        }
    }

    function obtenerPorcentaje() {
        porcentaje = (no_slide * 100) / totalSlide;
    }

    function book() {
        obtenerPorcentaje();
        $('.marcador').attr('style', 'width:' + porcentaje + '%');
    }

    control_secundarios();
    book();

    $('body').on('click', '.next', function(event) {

        removeEventsVideo();
        $('.contenedor_control').hide();

        setTimeout(function() {
            $('.contenedor_control').fadeIn();
        }, 2000);

        if (inicio != true) {
            //console.log('La wea', ('slide_s5_s1_3_0' in window && !!window.slide_s5_s1_3_0))
            if ('slide_s5_s1_3_0' in window && !!window.slide_s5_s1_3_0) {
                //console.log('Aquì esta la wea')
                no_slide = 6;
            } else {
                no_slide = no_slide + 1;
            }
        } else {
            inicio = false;
        }

        book();
        scormSetSlide(no_slide); 

        console.log('slide '+no_slide);

        $.ajax({
            url: 'AUT01/html/'+ herramienta + no_slide + '.html',
            type: 'GET',

            error: function(xhr, status) {
                alert('Disculpe, existió un problema');
            },

            complete: function(xhr, status) {


                control_secundarios();
                $('.wrapper').html(xhr.responseText);
                $(this).addClass('clickDisabled');
                $('.banderaSiguiente').addClass('forzar');

                if ($('.temp').length > 0) {
                    $('.temp').each(function() {
                        var nombre = $(this).data('nombre');
                        var tiempo = $(this).data('tiempo');
                        temporizador(nombre, tiempo);
                    });
                } else {}

            }
        });

    });

    $('body').on('click', '.resetC', function(event) {
        book();
        no_slide = 1;
        scormSetSlide(no_slide);

        $.ajax({
            url: 'AUT01/html/'+ herramienta + no_slide + '.html',
            type: 'GET',

            error: function(xhr, status) {
                alert('Disculpe, existió un problema');
            },

            complete: function(xhr, status) {


                control_secundarios();
                $('.wrapper').html(xhr.responseText);
                $(this).addClass('clickDisabled');
                $('.banderaSiguiente').addClass('forzar');

            }
        });

    });

    $('body').on('click', '.prev', function(event) {
        $('.banderaSiguiente').addClass('forzar');

        removeEventsVideo();
        $('.contenedor_control').hide();

        setTimeout(function() {
            $('.contenedor_control').fadeIn();
        }, 2000);

        if (inicio != true) {
            if ('slide_s5_s1_3_0' in window && window.slide_s5_s1_3_0) {
                no_slide = 3;
            } else {
                no_slide = no_slide - 1;
            }
        } else {
            inicio = false;
        }

        scormSetSlide(no_slide); 


        $.ajax({
            url: 'AUT01/html/'+ herramienta + no_slide + '.html',
            type: 'GET',

            error: function(xhr, status) {
                alert('Disculpe, existió un problema');
            },

            complete: function(xhr, status) {
                control_secundarios();
                book();
                $('.wrapper').html(xhr.responseText);

                if ($('.temp').length > 0) {
                    $('.temp').each(function() {
                        var nombre = $(this).data('nombre');
                        var tiempo = $(this).data('tiempo');
                        temporizador(nombre, tiempo);
                    });
                } else {}

            }
        });
    });

    $('body').on('click', '.pausa', function(event) {
        togglePause();
    });
    $('body').on('click', '#play', function(event) {
        togglePause();
    });



    $('body').on('click', '.reset', function(event) {
        $('.banderaSiguiente').addClass('forzar');

        removeEventsVideo();
        $('.contenedor_control').hide();


        setTimeout(function() {
            $('.contenedor_control').fadeIn();
        }, 2000);

        $.ajax({
            url: 'AUT01/html/'+ herramienta + no_slide + '.html',
            type: 'GET',

            error: function(xhr, status) {
                alert('Disculpe, existió un problema');
            },

            complete: function(xhr, status) {
                control_secundarios();
                $('.wrapper').html(xhr.responseText);

            }
        });

    });



    function temporizador(target, tiempo) {
        setTimeout(function() {
            $("." + target).addClass("animated fadeOut");
        }, tiempo);
    }


    setTimeout(function() {
        $(".primer").toggle();
        $(".precarga").toggle("fast");
        $(".top").show();
        $(".bottom_pleca").show();
        $(".sumate").show();
    }, 1000);

    function removeEventsVideo() {
        video_s1 = false;
        video_s8 = false;
        $('.play').unbind('click');
        $('.pausa').unbind('click');
        pausedButton(0);
    }
});


// SCORM // 
//$( document ).ready(function() { init(); }); 
//$( window ).unload(function() {finish(); });

var inscorm = false; 

if (inscorm) {
    var nFindAPITries = 0; 
    var API = null; 

    function FindAPI(win) {
        while ((win.API == null) && (win.parent != null) && (win.parent != win)) {
            nFindAPITries++; 
            if (nFindAPITries > 500) {
                alert("No es posible almacenar avance"); 
                return null; 
            } 
            win = win.parent; 
        } 
        return win.API; 
    } 

    function init() {
        if ((window.parent) && (window.parent != window)) {
            API = FindAPI(window.parent); 
        } 
        if ((API == null) && (window.opener != null)) {
            API = FindAPI(window.opener); 
        } 
        if (API == null) {
            alert("No es posible conectar con API"); 
        } else {
            //Inicia Comunicaci��n con la Plataforma LMS 
            startScormAPI(); 
        } 
    } 

    function finish() {
        if (API != null) {
            API.LMSFinish("", ""); 
        } 
    } 

    function startScormAPI() {
        API.LMSInitialize("", ""); 
        var visto1 = API.LMSGetValue("cmi.core.score.raw"); 
        var avance = API.LMSGetValue("cmi.core.lesson_location"); 
        if (visto1 == 100) {
            API.LMSSetValue("cmi.core.lesson_status", "passed"); 
            var avance = API.LMSSetValue("cmi.core.lesson_location", "0"); 
            API.LMSCommit("", ""); 
        } else {
            API.LMSSetValue("cmi.core.lesson_status", "incomplete"); 
            API.LMSCommit("", ""); 
            if (!isNaN(parseInt(avance, 10))) {
                no_slide = avance == '0' ? 1 : parseInt(avance, 10); 
            } 
        } 
    } 
} 

function scormSetSlide(sc_slide) {
    if (inscorm) {
        API.LMSSetValue("cmi.core.lesson_location", sc_slide); 
        API.LMSCommit("", ""); 
    } 
} 

function scormScore(sc_score) {
    if (inscorm) {
        if (sc_score >= '80') {
            API.LMSSetValue("cmi.core.lesson_status", "completed"); 
            API.LMSCommit("", ""); 
        } else {
            API.LMSSetValue("cmi.core.lesson_status", "failed"); 
            API.LMSCommit("", ""); 
        } 
        API.LMSSetValue("cmi.core.score.raw", sc_score); 
        API.LMSCommit("", ""); 
        visto1 = API.LMSGetValue("cmi.core.score.raw"); 
    } 
}