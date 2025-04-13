let ultimoBotonUsado = ''; // Para recordar qué botón fue presionado

$(document).ready(function () {
  cargarSVG(); // Carga el tablero principal al inicio

  // 🔁 Función para cargar el tablero con todos los botones de preguntas
  function cargarSVG() {
    $.ajax({
      url: 'AUT01/images/svg/b10-01.svg',
      type: 'GET',
      success: function (data) {
        $('#pasos').html(data);
        svg(); // Reactiva la lógica de puntuación y tiempo
        activarBotonesDePregunta(); // Activa los botones tipo "btn-a-100"
      },
      error: function () {
        alert('No se pudo cargar el tablero');
      }
    });
  }

  // ✅ Detecta clics en los botones tipo btn-a-100
  function activarBotonesDePregunta() {
    $('[id^=btn-]').off().on('click', function () {
      const id = $(this).attr('id');              // ej: btn-raChocolates-100
      const partes = id.replace('btn-', '').split('-'); // ['raChocolates', '100']
      const base = partes[0];                     // 'raChocolates'
      const puntos = partes[1];                   // '100'
      ultimoBotonUsado = id;
  
      cargarPreguntaSVG(base, puntos);            // esto construye el nombre real del archivo
    });
  }

  // 📄 Carga un archivo SVG con la pregunta
  function cargarPreguntaSVG(nombreArchivo, puntos) {
  const file = `AUT01/images/svg/${nombreArchivo}_${puntos}.svg`;
  $.ajax({
    url: file,
    type: 'GET',
    success: function (data) {
      $('#pasos').html(data);

      $('#pasos').on('click', '[id^=btn-]', function () {
        const id = $(this).attr('id');
        if (!id.startsWith('btn-dsc')) {
          // Si NO es un botón de "descubrir", volvemos al tablero
          volverAlTablero();
        }
      });
    },
    error: function () {
      alert("No se pudo cargar la pregunta: " + file);
    }
  });
}

  // ↩️ Vuelve al tablero y desactiva el botón ya usado
  function volverAlTablero() {
    $.ajax({
      url: 'AUT01/images/svg/b10-01.svg',
      type: 'GET',
      success: function (data) {
        $('#pasos').html(data);
        svg();
        activarBotonesDePregunta();

        if (ultimoBotonUsado) {
          // Apaga y desactiva el botón que ya se usó
          $(`#${ultimoBotonUsado}`).css('opacity', '0.3').off();
        }
      }
    });
  }

  // 🎮 Lógica interna de puntos y cronómetro (de tu código original)
  function svg() {
    var tiempo = 30;
    var id = 0;
    var grupo = 0;
    var puntos = 0;
    var contador = 0;

    $('#marcadorAzul').html('0')
    $('#marcadorRojo').html('0')

    function countDown(){
      $('#cd,#CDB').show();
      cronometro = setInterval(function(){
        if(tiempo == 0){
          clearInterval(cronometro);
        } else {
          tiempo = tiempo - 1;
          $('#countDown').html(tiempo);
        }
      },1000);
    }

    function reset(){
      $('#overlay,#controles,[id^=pop],#cd,#CDB').hide();
      $('#ma,#mr').show();
      id = 0;
      grupo = 0;
      tiempo = 30;
      clearInterval(cronometro);
      $('#countDown').html('30');
    }

    function checar(){
      if(contador == 25){
        $('#t1').attr('class','next').click();
      }
    }

    function valores(){
      $('#marcadorAzul').html(puntosAzules);
      $('#marcadorRojo').html(puntosRojos);
    }

    $('[id^=sel],[id^=res],#cd,#CDB').hide();

    $('[id^=pr]').attr('class','cursor').on('click',function(){
      numberItem = $(this).attr('id').split('-');
      id = parseInt(numberItem[1],10);
      grupo = $(this).data('grupo');
      puntos = $(this).data('puntos');

      $('#sel'+grupo+'-'+id).show();
      $('#overlay,#controles').show();
      $('#descubrirR,#btnEAR,#btnERR,#incorrecto,#btnEA,#btnER,#incorrectoR,#ma,#mr').hide();
      $('#descubrir').show().attr('class','cursor');
      $('#pop'+grupo+'-'+id).show();

      countDown();
      contador++;
    });

    $('#descubrir').on('click',function(){
      $('#res'+grupo+'-'+id).show();
      $('#incorrecto,#btnEA,#btnER').show().attr('class','cursor');
      clearInterval(cronometro);
    });

    $('#incorrecto').on('click',function(){
      reset();
      checar();
      startAudioDL('incorrecto',2);
    });

    $('#btnEA').on('click',function(){
      puntosAzules += puntos;
      valores();
      reset();
      checar();
      startAudioDL('correcto',1);
    });

    $('#btnER').on('click',function(){
      puntosRojos += puntos;
      valores();
      reset();
      checar();
      startAudioDL('correcto',1);
    });
  }

  // 🔊 Reproduce sonidos
  function startAudioDL(path, index) {
    $('#audios_DL').attr('src', 'AUT01/audio/' + path + '.mp3');
    audios_DL_index = index;
    audios_DL.load();
    audios_DL.play();
  }
});
