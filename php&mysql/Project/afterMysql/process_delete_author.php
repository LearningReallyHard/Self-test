<?php
  $conn = mysqli_connect('localhost', 'root', 'qkqhsksk98', 'opentutorials');
  $filtered = array(
    'id' => mysqli_real_escape_string($conn, $_POST['id'])
  );
  $sql = "DELETE FROM topic WHERE author_id = {$filtered['id']};";
  $sql .= "DELETE FROM author WHERE id = {$filtered['id']};";
  $result = mysqli_multi_query($conn, $sql);
  if( $result === false ){
    echo mysqli_error($conn);
  }
  header("Location:./author.php");
?>
