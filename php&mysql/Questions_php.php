(2)
echo strlen('ABC');

(4)
echo nl2br($phrases);

(5)
echo file_get_contents("./data/".$_GET['id']);

(6)
echo var_dump('11');
result : string(2) "11"

(7)
$i = '';
echo isset($i)
result : true

(8)
$arr = array('a','b','c','d')
array_push($arr, 'e')
echo count($arr)

(9)
$list = scandir('./data')
$list[0] : '.', $list[1] : '..'

(10)
file_put_contents('result.txt', $a);

(11)
header('Location:/index.php')

(12)<?= $_GET['id']; ?>

(13)
rename('./data/A','./data/B')

(14)
unlink('./data/A')

(16)
require_once('./lib/print.php')

(17)
htmlspecialchars('~')

(18)
strip_tags('<div><a>A</a></div>', '<div>')

(19)
echo basename('./data/text.txt')
result : text.txt

(20)
$a = array(
  'name' => 'a',
  'age' => 10
)

(21)
  $conn = mysqli_connect('localhost', 'a', 'b', 'c');
  $query = "INSERT INTO topic ( title, description, created )
            VALUES( 'Mysql', 'Mysql is...', NOW())";
  $result = mysqli_query($conn, $query);
  if( $result === false){
    echo mysqli_error($conn)
  }

(22)
print_r($a)

(23)
$filter = mysqli_real_escape_string($conn, $_GET['id'])

(24)
die($a)

(25)
settype($a, 'integer')

(26)
$query = "DELETE FROM topic where id = 1;";
$query .= "delete from author where id = 1;";
$result = mysqli_multi_query($conn, $query)

(27)
./Project/afterMysql
C:\Bitnami\wampstack-7.1.27-1\apache2\htdocs\afterMysql

(28)
./Project/Login
C:\Bitnami\wampstack-7.1.27-1\apache2\htdocs\Login

(29)
let url = new URL(location.href);
var c = url.searchParams.get('start');
