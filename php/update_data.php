<?php
    // Descripcion: Actualiza los diamantes y los juegos jugados del usuario

    // Obtenemos los valores nuevos por metodo post
    $json_data = file_get_contents('php://input');
    $new_values = json_decode($json_data, true);

    $username = $new_values['username'];
    $win = $new_values['win'];
    $bet = $new_values['bet'];

    // Leer el contenido del archivo JSON
    $json_users = file_get_contents('../data/users.json');

    // Decodificar el contenido JSON en un array asociativo
    $users = json_decode($json_users, true);

    // Buscar el usuario por su nombre de usuario
    foreach ($users as &$user) {
        if ($user['username'] === $username) {
            // Actualizar los datos del usuario
            if ($win) {
                $user['gamesWon']++;
                $user['diamonds'] = $user['diamonds'] + $bet;
                break;

            } else {
                $user['diamonds'] = $user['diamonds'] - $bet;
                break;
            }
        }
    }

    // Codificar nuevamente los datos en formato JSON
    $users = json_encode($users);

    // Escribir los datos actualizados en el archivo JSON
    file_put_contents('../data/users.json', $users);
?>