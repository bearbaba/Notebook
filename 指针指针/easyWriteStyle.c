/* #include <stdio.h>

typedef struct
{
  int data;
} Str1;

int main()
{
  Str1 b;
  Str1 *c;
  c = &b;
  b.data = 2;
  printf("%d\n", b.data);
  printf("%d\n", c->data);
  printf("%d\n", (*c).data);

  printf("%d\n", &b);
  printf("%d\n", b);
  printf("%d", c);
  return 0;
}
 */

/* #include <stdio.h>
typedef struct
{
  int data;
  int data2;
} Stu;

int main()
{
  Stu a;
  a.data = 2;
  a.data2 = 3;
  printf("%d", a);
  return 0;
} */

/* #include <stdio.h>
typedef struct
{
  int data;
  int data2;
} Stu;

int main()
{
  Stu a;
  Stu *b;
  a.data = 2;
  a.data2 = 3;
  b = &a;
  printf("%d\n", a);
  printf("%d\n", b->data);
  printf("%d\n", (*b).data);
  return 0;
}  */

#include<stdio.h>
typedef struct {
  int data;
} * Stu, Stu1;
int main()
{
  Stu b;
  Stu1 a;
  a.data = 2;
  b = &a;
  printf("%d", b->data);
  return 0;
}