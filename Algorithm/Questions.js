(2)
function transportation(M,load){
  let answer = 0;

  load.sort((a,b) => b-a);
  getAnswer(M, load);
  function getAnswer(M, load){
    let sum = 0;
    let pops_arr = [];
    if(load.length){
      if(load.length > 1){
        for(let i=0;i<load.length;i++){
          if(M >= sum + load[i]){
             sum += load[i]
            pops_arr.push(i);
          }
        }
        pops_arr.map( (v,i) => load.splice(v-i, 1) );
        answer++;
        getAnswer(M, load);
      }else{
        if(load[0] > M){
          answer = -1;
        }else{
          answer++;
        }
      }
    }
  }
  return answer;
}

(3)
#include <stdio.h>

int main(void)
{
    int i, j, min, index, temp;
    int array[10] = {1, 10, 5, 8, 7, 6, 4, 3, 2, 9};
    for(i = 0;i < 10;i++){
        min = 9999;
        for(j = i;j < 10;j++){
            if( min > array[j]){
                min = array[j];
                index = j;
            }
        }
        temp = array[i];
        array[i] = array[index];
        array[index] = temp;
    }
    return 0;
}

(4)
#include <stdio.h>

int main()
{
    int i, j, temp;
    int array[10] = {10,9,8,7,6,5,4,3,2,1};

    for(i = 0;i < 10;i++){
        for(j = 0;j < 9 - i;j++){
            if(array[j] > array[j+1]){
                temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
            }
        }
    }
    return 0;
}

(5)
#include <stdio.h>

int main()
{
    int i, j, temp;
    int array[10] = {10,9,8,7,6,5,4,3,2,1};
    for(i = 0;i < 9;i++){
        j = i;
        while(array[j] > array[j+1]){
            temp = array[j];
            array[j] = array[j+1];
            array[j+1] = temp;
            j--;
        }
    }
    return 0;
}

(6)
#include <stdio.h>

int number = 10;
int data[] = {10,9,8,7,6,5,4,3,2,1};

void quickSort(int* data, int start, int end){
    if(start >= end){
        return;
    }

    int key = start;
    int i = start + 1, j = end, temp;

    while(i <= j){
        while(i <= end && data[i] <=(>=) data[key]){ // 기준값(data[key]보다 큰 것을 찾아야 하므로, 작으면 i를 증가)
            i++;
        }
        while(j > start && data[j] >=(<=) data[key]){// 기준값(data[key])보다 작은 것을 찾아야 하므로 크면 j를 감소)
            j--;
        }
        if( i > j){
            temp = data[j];
            data[j] = data[key];
            data[key] = temp;
        }else{
            temp = data[i];
            data[i] = data[j];
            data[j] = temp;
        }
    }

    quickSort(data, start, j - 1);
    quickSort(data, j + 1, end);
}

int main(void){
    quickSort(data, 0, number -1);
    return 0;
}
