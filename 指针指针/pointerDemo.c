#include<stdio.h>
int main(){
  int *a;
  int b = 3;
  a = &b;
  printf("%d", a);
  printf("%d", &b);
  return 0;
}