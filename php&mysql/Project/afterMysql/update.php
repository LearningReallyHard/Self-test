<?php
  $conn = mysqli_connect('localhost', 'root', 'qkqhsksk98', 'opentutorials');
  $query = "SELECT * FROM topic";
  $result = mysqli_query($conn, $query);
  $list = "";

  while($row = mysqli_fetch_array($result)){
    $escaped_title = htmlspecialchars($row['title']);
    $list = $list."<li><a href=\"index.php?id={$row['id']}\">{$escaped_title}</a></li>";
  }

  $update_link = '';

  if(isset($_GET['id'])){
    $filter_id = mysqli_real_escape_string($conn, $_GET['id']);
    $sql = "SELECT * FROM topic WHERE id={$filter_id}";
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_array($result);
    $article = array(
      'title' => htmlspecialchars($row['title']),
      'description' => htmlspecialchars($row['description'])
    );
    $update_link = "<a href=\"/update.php?id={$_GET['id']}\">update</a>";
  }else{
    $article = array(
      'title' => 'Welcome',
      'description' => 'Hello, Web'
    );
  }
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
    <form action="process_update.php" method="post">
      <input type="hidden" name="id" value=<?=$_GET['id']?>>
      <p><input type="text" name="title" placeholder="title" value=<?=$article['title']?>></p>
      <p><textarea name="description" placeholder="description"><?=$article['description']?></textarea></p>
      <p><button>submit</button></p>
    </form>
  </body>
</html>
