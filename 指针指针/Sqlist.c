#include<stdio.h>
#include<stdlib.h>
#define MAXSIZE 10
typedef struct{
  int *data;
  int length;
  int maxSize;
} Sqlist;

void initList(Sqlist *list){
  list->data = (int *)malloc(sizeof(int *) * MAXSIZE);
  list->length = 0;
  list->maxSize = MAXSIZE;
}

void pushList(Sqlist *list, int value){
  list->data = value;
  list->length++;
}

int printList(Sqlist *list, int index){
    return (list->data)[index];
}

int main(){
  Sqlist a;
  initList(&a);
  pushList(&a, 1);
  printf("%d", printList(&a, 0));
  return 0;
}