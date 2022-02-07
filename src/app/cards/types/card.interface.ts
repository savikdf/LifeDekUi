export interface CardInterface{
  id: string;
  name: string;
  description: string;
  createDate: Date;

  //not included in card dto from api:
  isCompleted : boolean;
}
