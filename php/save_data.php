<?php
    // Description: Stores user data in a json file.

    function save_data($data) {
        // Get the users from the 'users.json' file
        $json_users = file_get_contents('../data/users.json');
        $users = json_decode($json_users, true);

        // We add the new user
        array_push($users, $data);
        file_put_contents('../data/users.json', json_encode($users));
    }
?>