<?php

    $arquivo = fopen("contas.txt", "r");
    $dados = fread($arquivo,filesize("contas.txt"));
    fclose($arquivo);

    $dados_linhas = explode("\n", $dados);
    $usuario_in = $_POST["user"];
    $senha_in = $_POST["pass"];

    $found = false;
    $i = 0;

    do{
        
        $dados_conta = explode(":", $dados_linhas[$i]);
        $usuario = $dados_conta[0];
        $senha = $dados_conta[1];
        $acesso = $dados_conta[2];
        
        if(strcmp($usuario_in,$usuario) == 0 && strcmp($senha_in,$senha) == 0){
            $found = true;
        }
        
        //echo "<div>$usuario $senha $acesso</div>";
        $i++;
        
    }while(!$found && $i < count($dados_linhas));

    
    if($found){
        echo $acesso;
    }

    else{
        echo "err";
    }

?>