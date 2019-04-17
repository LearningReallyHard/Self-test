<?php
  $conn = mysqli_connect('localhost', 'root', 'qkqhsksk98', 'opentutorials');
  $filtered = array(
    'id' => mysqli_real_escape_string($conn, $_POST['id'])
  );
  $sql = "
    DELETE FROM topic WHERE id = {$filtered['id']}
  ";

  $result = mysqli_query($conn, $sql);
  if( $result === false ){
    echo mysqli_error($conn);
  }
  header("Location:./index.php?id={$filtered['id']}");
?>
