#include<stdio.h>
int main(){
  int a[3] = {1, 2, 3};
  printf("%d\n", a);
  printf("%d", &a[0]);
  return 0;
}