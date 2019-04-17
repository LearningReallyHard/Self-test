<?php
session_start();
$id = $_POST['id'];
$pass = $_POST['pass'];

$conn = mysqli_connect('localhost', 'root', 'qkqhsksk98', 'login');
$query = "SELECT * FROM users WHERE user_id = '{$id}' AND pass = '{$pass}'";
$result = mysqli_query($conn, $query);
$row = mysqli_fetch_array($result);
if($row){
  $_SESSION['userid'] = $id;
  header('Location:./main.php');
}else{
  echo "Wrong ID or Pass";
  echo "<a href='./login.html'>login</a>";
}
?>
