export interface WorklogItem {
  id: string;
  taskNumber: number | string;
  timeStart: string;
  timeEnd?: string;
  status: 'active' | 'paused' | 'completed';
  pauseTime: string[][];
}
