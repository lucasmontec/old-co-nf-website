console.log("Started");

$("#generatedURL").hide();

$('#makeForm').submit(function() {
    $("#phraseCompress").val(LZString.compress($("#phraseCompress").val()));
    return true;
});

function magnitude(n) {
    if(n < 1) return 1;
    
    if(n == 1) return 10;

    var order = Math.floor(Math.log(n-1) / Math.LN10
                       + 0.000000001); // because float math sucks like that
    return Math.pow(10,order)*10;
}

new Clipboard('.btn');
$("#clippy").click(function() {
   toastr.info('link copied to clipboard!'); 
});

//Setup spinner
$( function() {
    var spin = $( "#dramaVal" ).spinner({
        min: 0,
        max: 1000000
    });
    spin.spinner( "value", 1 );
    $('.ui-spinner-button').click(function() {
       $(this).siblings('input').change();
    });
    
    var sharecode = "javascript:fbShare('" + encodeURIComponent(location.href) + "', 800, 600)";
    
    $("#faceshare").attr('href', sharecode);
});

//Used to switch page mode
var createMode = false;

function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function formParams(){
    var ret = "";
    ret += "phrase=";
    ret += LZString.compress($("#phraseCompress").val());
    ret += "&";
    ret += "author=";
    ret += ($("#authorVal").val() ? $("#authorVal").val() : "");
    ret += "&";
    ret += "drama=";
    ret += ($("#dramaVal").val() ? $("#dramaVal").val() : "");
    return ret;
}

function showURL(){
    //var link = window.location.href + "?" + $("#makeForm").serialize();
    var link = window.location.href + "?" + formParams();
    $("#genURL").attr('href', link);
    $("#genURL").html(link);
    $("#clippy").attr("data-clipboard-text", link);
    $("#generatedURL").fadeIn();
}

function setToCreate(){
    $("#show").hide();
    console.log("Set to create mode.");
    
    $(".changes").change(function() {
       showURL();
    });
    
     $(".changes").keyup(function() {
       showURL();
    });
}

function setToShow(){
    $("#show").show();
    $("#create").hide();
    console.log("Set to show mode.");
}

//Check if we have a drama reading
var reading = getParameterByName("drama");
var dramaReading = -1;
console.log("drama is "+reading);
if(reading && $.isNumeric(reading)){
    dramaReading = reading;
    setToShow();
    console.log("drama mag: "+magnitude(reading));
}else{
    setToCreate();
}

//Load any drama phrase
var phrase = getParameterByName("phrase");
var authorReading = getParameterByName("author");
console.log("phrase is "+LZString.decompress(phrase));
if(phrase){
    var phraseParam = document.getElementById('phrase');
    var author = "";
    if(authorReading){
        author = " - " + authorReading;
    }
    phraseParam.innerHTML = '"'+LZString.decompress(phrase)+'"'+author;
}

//If in show mode, display the gauge
if(!createMode){
    
    var labelSize = 25;
    if($(window).width() < 670){
        var labelSize = 15;
    }
    
    var opts = {
        angle: 0.15, // The span of the gauge arc
        lineWidth: 0.44, // The line thickness
        radiusScale: 1, // Relative radius
        pointer: {
        length: 0.5, // // Relative to gauge radius
        strokeWidth: 0.02, // The thickness
        color: '#000000' // Fill color
        },
        limitMax: false,     // If false, the max value of the gauge will be updated if value surpass max
        limitMin: false,     // If true, the min value of the gauge will be fixed unless you set it manually
        colorStart: '#66AA66',   // Colors
        colorStop: '#CC6666',    // just experiment with them
        strokeColor: '#66AA66',  // to see which ones work best for you
        generateGradient: true,
        highDpiSupport: true,     // High resolution support
        staticLabels: {
          font: labelSize+"px oswald",  // Specifies font
          labels: [0, magnitude(dramaReading)*0.1, magnitude(dramaReading)*0.5, magnitude(dramaReading)],  // Print labels at these values
          color: "#000000",  // Optional: Label text color
          fractionDigits: 1  // Optional: Numerical precision. 0=round off.
        },
    };
    var target = document.getElementById('MainCanvas'); // your canvas element
    var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
    gauge.maxValue = magnitude(dramaReading); // set max gauge value
    gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
    gauge.animationSpeed = 121; // set animation speed (32 is default value)
    gauge.set(dramaReading); // set actual value

    var display = document.getElementById('counter');
    display.innerHTML = dramaReading;

    $('#counter').each(function () {
        $(this).prop('Counter',0).animate({
            Counter: $(this).text()
        }, {
            duration: 5000,
            easing: 'swing',
            step: function (now) {
                $(this).text(numeral(now).format('0.0[000] a')+" dramas");
            }
        });
    });
    
}