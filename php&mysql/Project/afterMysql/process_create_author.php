<?php
  $conn = mysqli_connect('localhost', 'root', 'qkqhsksk98', 'opentutorials');

  $filtered = array(
    'name' => mysqli_real_escape_string($conn, $_POST['name']),
    'profile' => mysqli_real_escape_string($conn, $_POST['profile'])
  );
  $query = "INSERT INTO author ( name, profile )
            VALUES ( '{$filtered['name']}', '{$filtered['profile']}')";
  $result = mysqli_query($conn, $query);
  if(!$result){
    die($mysqli_error($conn));
  }
  header("Location:./author.php");
?>
