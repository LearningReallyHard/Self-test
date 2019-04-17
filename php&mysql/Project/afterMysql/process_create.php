<?php
  $conn = mysqli_connect('localhost', 'root', 'qkqhsksk98', 'opentutorials');
  $filtered = array(
    'title' => mysqli_real_escape_string($conn,$_POST['title']),
    'description' => mysqli_real_escape_string($conn, $_POST['description']),
    'author_id' => mysqli_real_escape_string($conn, $_POST['author_id'])
  );
  $sql = "
    INSERT INTO topic ( title, description, created, author_id)
    VALUES ( '{$filtered['title']}', '{$filtered['description']}', NOW(), '{$filtered['author_id']}')
  ";

  $result = mysqli_query($conn, $sql);
  if( $result === false ){
    echo mysqli_error($conn);
  }
  header("Location:./index.php");
?>
