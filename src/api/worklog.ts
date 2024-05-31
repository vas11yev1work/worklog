import { WorklogItem } from '@/types/worklog.types';
import { v4 } from 'uuid';
import dayjs from 'dayjs';

export class Worklog {
  static getWorklog() {
    return JSON.parse(localStorage.getItem('worklog') ?? '[]') as WorklogItem[];
  }

  static saveWorklog(worklog: WorklogItem[]) {
    localStorage.setItem('worklog', JSON.stringify(worklog));
  }

  static clearWorklog() {
    localStorage.setItem('worklog', JSON.stringify([]));
  }

  static createWorklogItem(taskNumber: number | string) {
    const worklogItem: WorklogItem = {
      id: v4(),
      taskNumber,
      timeStart: dayjs().toISOString(),
      pauseTime: [],
      status: 'active',
    };
    const worklog = Worklog.getWorklog();
    worklog.push(worklogItem);
    Worklog.saveWorklog(worklog);
  }

  static completeWorklogItem(id: string) {
    const worklog = Worklog.getWorklog();
    const index = worklog.findIndex(item => item.id === id);
    if (index !== -1) {
      worklog[index].status = 'completed';
      worklog[index].timeEnd = dayjs().toISOString();
      Worklog.saveWorklog(worklog);
    }
  }

  static deleteWorklogItem(id: string) {
    const worklog = Worklog.getWorklog();
    const index = worklog.findIndex(item => item.id === id);
    if (index !== -1) {
      worklog.splice(index, 1);
      Worklog.saveWorklog(worklog);
    }
  }

  static startPauseWorklogItem(id: string) {
    const worklog = Worklog.getWorklog();
    const index = worklog.findIndex(item => item.id === id);
    if (index !== -1) {
      worklog[index].status = 'paused';
      if (!worklog[index].pauseTime) {
        worklog[index].pauseTime = [];
      }
      worklog[index].pauseTime.push([dayjs().toISOString()]);
      Worklog.saveWorklog(worklog);
    }
  }

  static endPauseWorklogItem(id: string) {
    const worklog = Worklog.getWorklog();
    const index = worklog.findIndex(item => item.id === id);
    if (index !== -1) {
      if (
        worklog[index].status !== 'paused' ||
        worklog[index].pauseTime.length === 0 ||
        worklog[index].pauseTime[worklog[index].pauseTime.length - 1].length === 2
      ) {
        return;
      }
      worklog[index].status = 'active';
      worklog[index].pauseTime[worklog[index].pauseTime.length - 1].push(dayjs().toISOString());
      Worklog.saveWorklog(worklog);
    }
  }
}
