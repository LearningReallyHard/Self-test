<?php
  $conn = mysqli_connect('localhost', 'root', 'qkqhsksk98', 'opentutorials');
?>
<!DOCTYPE html>
<html>
  <head>
    <title>WEB</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="./author.php">WEB</a></h1>
    <p><a href="./index.php">topic</a></p>
    <table border="1">
      <tr>
        <td>id</td><td>name</td><td>profile</td><td>update</td>
      </tr>
      <?php
        $sql = "SELECT * FROM author";
        $result = mysqli_query($conn, $sql);
        while($row = mysqli_fetch_array($result)){
          $filtered = array(
            'id' => htmlspecialchars($row['id']),
            'name' => htmlspecialchars($row['name']),
            'profile' => htmlspecialchars($row['profile'])
          );
          ?>
          <tr>
            <td><?=$filtered['id']?></td>
            <td><?=$filtered['name']?></td>
            <td><?=$filtered['profile']?></td>
            <td><a href="./author.php?id=<?=$filtered['id']?>">update</a></td>
            <td>
              <form action="process_delete_author.php" method="post" onSubmit="if(!confirm('are you sure')){return false;}">
                <input type="hidden" name="id" value="<?=$filtered['id']?>">
                <button>Delete</button>
              </form>
            </td>
          </tr>
          <?php
        }
      ?>
    </table>
    <?php
      $escaped = array(
        'name' => '',
        'profile' => ''
      );
      $lable_submit = 'Create Author';
      $form_action = 'process_create_author.php';
      $form_id = '';
      if(isset($_GET['id'])){
        $filtered = mysqli_real_escape_string($conn, $_GET['id']);
        $lable_submit = 'Update Author';
        $form_action = 'process_update_author.php';
        $form_id = "<input type='hidden' name='id' value='{$filtered}'>";
        settype($filtered, 'integer');
        $sql = "SELECT * FROM author WHERE id = {$filtered}";
        $result = mysqli_query($conn, $sql);
        $row = mysqli_fetch_array($result);
        $escaped['name'] = htmlspecialchars($row['name']);
        $escaped['profile'] = htmlspecialchars($row['profile']);
      }
    ?>
    <p>
      <form action="<?=$form_action?>" method="post">
        <?=$form_id?>
        <p><input name="name" placeholder="name" autocomplete="off" value="<?=$escaped['name']?>"></p>
        <p><textarea name="profile" placeholder="profile"><?=$escaped['profile']?></textarea></p>
        <p><button><?=$lable_submit?></button></p>
      </form>
    </p>
  </body>
</html>
