if(annyang){
    var voices,
        accion = document.getElementById('boton');

    var utter = new SpeechSynthesisUtterance();
    utter.rate = 1;
    utter.pitch = 0.5;
    utter.lang = "es-DOM";

    //cargando las voces del sistema operativo.
    window.SpeechSynthesis.onvoiceschanged = function () {
        voices = window.SpeechSynthesis.getVoices();
        console.log(voices);
    };
    //Comandos
    accion.addEventListener('click', function(){
        var commands = {
            'hola': function (){
                utter.text = "Hola";
                utter.voice = voices[2];
                window.SpeechSynthesis.speak(utter);
            },
            'Como estas': function (){
                utter.text = "Muy bien";
                utter.voice = voices[2];
                window.SpeechSynthesis.speak(utter);
            },'Cual es tu nombre': function (){
                utter.text = "Mi nombre es Luna, y tu como te llamas?";
                utter.voice = voices[2];
                window.SpeechSynthesis.speak(utter);
                //Guardara el nombre que le decimos por voz
                annyang.addCallback('result', function(phrases){
                    //Imprimira el nombre por consola
                    console.log("Nombre: ", phrases[0]);
                    //Para el evento result.
                    annyang.removeCallback('result');
                    utter.text = 'Es un placer conocerte ' + phrases[0];
                    window.SpeechSynthesis.speak(utter);
                });
            },
            'Que eres': function (){
                utter.text = "Soy tu asistente personal creada para ti de parte de necodt";
                utter.voice = voices[2];
                window.SpeechSynthesis.speak(utter);
            },
        }
    });
   
    //Agregando comando que reconocera annyang
    annyang.addCommands(commands);

    //Empezara a escuchar
    annyang.start({ autoRestart: false, Continuous: true});
}