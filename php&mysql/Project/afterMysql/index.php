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
  $delete_link = '';

  if(isset($_GET['id'])){
    $filter_id = mysqli_real_escape_string($conn, $_GET['id']);
    $sql = "SELECT * FROM topic LEFT JOIN author ON topic.author_id = author.id WHERE topic.id={$filter_id}";
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_array($result);
    $article = array(
      'title' => htmlspecialchars($row['title']),
      'description' => htmlspecialchars($row['description']),
      'name' => htmlspecialchars($row['name'])
    );
    $update_link = "<a href=\"update.php?id={$_GET['id']}\">update</a>";
    $delete_link = "
      <form action='process_delete.php' method='post'>
        <input type='hidden' name='id' value='{$_GET['id']}'>
        <button>Delete</button>
      </form>
    ";
  }else{
    $article = array(
      'title' => 'Welcome',
      'description' => 'Hello, Web',
      'name' => ''
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
    <a href="author.php">author</a>
    <ol><?=$list?></ol>
    <a href="create.php">create</a>
    <?=$update_link?>
    <?=$delete_link?>
    <h2><?= $article['title']?></h2>
    <?= $article['description']?>
    <p>by <?= $article['name']?></p>
  </body>
</html>
