<?php
  $conn = mysqli_connect('localhost', 'root', 'qkqhsksk98', 'opentutorials');
  $query = "SELECT * FROM topic";
  $result = mysqli_query($conn, $query);
  $list = "";

  while($row = mysqli_fetch_array($result)){
    $escaped_title = htmlspecialchars($row['title']);
    $list = $list."<li><a href=\"index.php?id={$row['id']}\">{$escaped_title}</a></li>";
  }

  $sql = "SELECT * from author";
  $result = mysqli_query($conn, $sql);
  $select = "<select name='author_id'>";
  while( $row = mysqli_fetch_array($result)){
    $select .= "<option value={$row['id']}>{$row['name']}</option>";
  }
  $select .= "</select>";
?>
<!DOCTYPE html>
<html>
  <head>
    <title>WEB</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="index.php">WEB</a></h1>
    <ol>
      <?=$list?>
    </ol>
    <form action="process_create.php" method="post">
      <p><input type="text" name="title" placeholder="title" autocomplete="off"></p>
      <p><textarea name="description" placeholder="description"></textarea></p>
      <?=$select?>
      <p><button>submit</button></p>
    </form>
  </body>
</html>
