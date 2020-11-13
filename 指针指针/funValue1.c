#include <stdio.h>
void changeValue(int *a)
{
  *a = 2;
}
int main()
{
  int a;
  a = 1;
  changeValue(&a);
  printf("%d", a);
  return 0;
}