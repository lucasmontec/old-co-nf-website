<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>site2</title>
        <link rel="stylesheet" href="style.css" type="text/css">
        
        <!-- script: ativa jquery -->
        <!-- link: ativa a fonte especial -->
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" type="text/javascript"></script>
        <link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro' rel='stylesheet' type='text/css'>
    </head>
    
    <body>

        <!-- inicia o javascript -->
        <script src="main.js" type="text/javascript"></script>
        
        <form class="login_form" name="login" method="post">

            <p>Usuário:</p>
            <input class="login_form_text_input" id="user" type="text" name="user"/>
            <p>Senha:</p>
            <input class="login_form_text_input" id="pass" type="password" name="pass"/>

            <input type="submit" id="botao" value="Entrar"/>
            
            <!-- se erro: dentro do javascript -->
            <div id="erro"></div>

        </form>
    
    </body>
</html>