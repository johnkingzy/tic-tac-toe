export interface Player {
  id: number;
  name: string;
  icon: string;
  score: number;
}

export enum NoticeTypeEnum {
  success = 'success',
  warning = 'warning',
  info = 'info',
}
export type Notice = {
  type?: NoticeTypeEnum;
  title: string;
};
