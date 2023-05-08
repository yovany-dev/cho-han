<?php
    // Get username by post method
    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data, true);
    $username = $data['username'];

    // We convert the 'users.json' file to an associative array
    $json_users = file_get_contents('../data/users.json');
    $users = json_decode($json_users, true);
    
    // We send the user data
    $user_data = array();
    foreach ($users as $user) {
        if ($user['username'] == $username) {

            $user_data['username'] = $user['username'];
            $user_data['gamesWon'] = $user['gamesWon'];
            $user_data['profilePicture'] = $user['profilePicture'];
            $user_data['diamonds'] = $user['diamonds'];
        }
    }

    echo json_encode($user_data);
?>