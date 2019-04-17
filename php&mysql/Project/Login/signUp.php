<?php
$id = $_POST['id'];
$pw = $_POST['pass'];

$conn = mysqli_connect('localhost', 'root', 'qkqhsksk98', 'login');
$query = "SELECT * FROM users WHERE user_id = '{$id}'";
$result = mysqli_query($conn, $query);
$row = mysqli_fetch_array($result);
if($row){
  echo "중복된 id 입니다.";
  echo "<a href='./signUp.html>back</a>'";
  exit();
}

$query = "INSERT INTO users( user_id, pass )
          VALUES ( '{$id}', '{$pw}')";
mysqli_query($conn, $query);
echo "sign up success";
echo "<a href='./main.php'>main</a>";
?>
