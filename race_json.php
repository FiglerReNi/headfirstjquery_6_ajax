<?php

if (isset($_POST['action']) && $_POST['action'] === "addRunners") {
    $fname = htmlspecialchars($_POST['txtFirstName']);
    $lname = htmlspecialchars($_POST['txtLastName']);
    $gender = htmlspecialchars($_POST['ddlGender']);
    $minute = htmlspecialchars($_POST['txtMinute']);
    $second = htmlspecialchars($_POST['txtSecond']);
    if (preg_match('/[^\w\s]/i', $fname) || preg_match('/[^\w\s]/i', $lname)) {
        fail('Invalid name provided.');
    }
    if (empty($fname) || empty($lname)) {
        fail('Please enter a first and last name.');
    }
    if (empty($gender)) {
        fail('Please select a gender.');
    }
    $time = $minute . ":" . $second;
    $query = "INSERT INTO runners 
              SET first_name = '$fname',
                  last_name = '$lname',
                  gender = '$gender',
                  finish_time = '$time'";
    $result = dbConnection($query);
    if ($result) {
        $message = "Runner: " . $fname . " " . $lname . " added successfully!";
        success($message);
    } else {
        fail('Insert failed!');
        exit;
    }
} elseif (isset($_GET['action']) && $_GET['action'] === "getRunners") {
    $query = "SELECT first_name, last_name, gender, finish_time
          FROM runners
          ORDER BY finish_time ASC";
    $result = dbConnection($query);
    $resultArray = [];
    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
        array_push($resultArray, $row);
    }
    echo json_encode($resultArray);
    exit;
}

function dbConnection($query)
{
    $link = mysqli_connect('127.0.0.1', 'runner_db_user', 'runner_db_password') OR die('Could not connect to database.');
    mysqli_select_db($link, 'race_json');
    return mysqli_query($link, $query);
}

function fail($message)
{
    die(json_encode(array('status' => 'fail', 'message' => $message)));
}

function success($message)
{
    die(json_encode(array('status' => 'success', 'message' => $message)));
}