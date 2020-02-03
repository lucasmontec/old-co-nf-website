function validate_login(form){

    //evita evento padrao
    form.preventDefault();
    
    //evento novo:
    //post: request do tipo "post" no php
    //post(p1,p2,p3)
    //p1=pagina destino
    //p2=lista de variaveis para p1
    //p3=função que retorna de p1

    //login.php: endereço action
    //user:$("#user").text(): procura o [id=#user], de tipo texto
    //pass:$("#pass").text(): igual
    //tipo dicionario de python : "user" - nome, $("#user").text() - valor
    
    //console.log($("#user").val(), $("#pass").val());
    
    $.post("login.php", {user:$("#user").val(), pass:$("#pass").val()},

        function(resultado){

            //console.log(resultado)
            if (resultado == "err"){
                $("#erro").html("<div class='erro'></div><div id='fucking_p'>  Dados Inválidos</div>");
            }else{
             
                $("form[name=login]").fadeOut();
                setTimeout("window.location.replace('welcome.html')", 500);
                
            }
        }
    );
}

$(document).ready(
//get [document(=site)] if ready:
    
    function(){
        
        //get [submit]: evento padrao sera substituido por validate_login
        $("form[name=login]").submit(function(evt){validate_login(evt);});
    }
);