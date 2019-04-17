<?php
  $conn = mysqli_connect('localhost', 'root', 'qkqhsksk98', 'opentutorials');
  $filtered = array(
    'name' => mysqli_real_escape_string($conn,$_POST['name']),
    'profile' => mysqli_real_escape_string($conn, $_POST['profile']),
    'id' => mysqli_real_escape_string($conn, $_POST['id'])
  );
  $sql = "
    UPDATE author SET name = '{$filtered['name']}',
    profile = '{$filtered['profile']}'
    WHERE id = {$filtered['id']}
  ";

  $result = mysqli_query($conn, $sql);
  if( $result === false ){
    echo mysqli_error($conn);
  }
  header("Location:./author.php");
?>
