#include<stdio.h>
void changValue(int a){
  a = 2;
}
int main(){
  int a = 1;
  changValue(a);
  printf("%d", a);
  return 0;
}