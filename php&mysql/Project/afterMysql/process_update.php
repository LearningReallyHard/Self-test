<?php
  $conn = mysqli_connect('localhost', 'root', 'qkqhsksk98', 'opentutorials');
  $filtered = array(
    'title' => mysqli_real_escape_string($conn,$_POST['title']),
    'description' => mysqli_real_escape_string($conn, $_POST['description']),
    'id' => mysqli_real_escape_string($conn, $_POST['id'])
  );
  $sql = "
    UPDATE topic SET title = '{$filtered['title']}',
    description = '{$filtered['description']}'
    WHERE id = {$filtered['id']}
  ";

  $result = mysqli_query($conn, $sql);
  if( $result === false ){
    echo mysqli_error($conn);
  }
  header("Location:./index.php?id={$filtered['id']}");
?>
