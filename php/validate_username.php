<?php
    // Description: Validate that the username is not empty, 
    // that it does not have more than 8 characters, 
    // that it is not equal to another username and store the user data.

    function username_exists($username) {
        // We convert the 'users.json' file to an associative array
        $json_users = file_get_contents('../data/users.json');
        $users = json_decode($json_users, true);
        
        // We check if the username exists
        $name_exists = false;
        foreach ($users as $user) {
            if ($user['username'] == $username) {
                $name_exists = true;
            }
        }

        return $name_exists;
    }

    // Get username by post method
    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data, true);
    $username = $data['username'];

    if (empty($username)) {
        $value = 'empty-name';

    } elseif (strlen($username) > 8) {
        $value = 'long-name';

    } else {
        $name_exists = username_exists($username);
        
        if ($name_exists) {
            $value = 'name-exists';

        } else {
            include('save_data.php');
            save_data($data);
            $value = 'save-data';
        }
    }

    // Returns an object with the value [empty-name | long-name | name-exists | save-data]
    $response = array('res' => $value);
    echo json_encode($response);
?>

