import { defineStore } from 'pinia';
import { WorklogItem } from '@/types/worklog.types';
import { Worklog } from '@/api/worklog.ts';

interface WorklogState {
  worklog: WorklogItem[];
}

export const useWorklogStore = defineStore({
  id: 'worklog',
  state: (): WorklogState => ({
    worklog: [],
  }),
  actions: {
    getWorklog() {
      this.worklog = Worklog.getWorklog();
    },
    createWorklogItem(taskNumber: string | number) {
      Worklog.createWorklogItem(taskNumber);
      this.getWorklog();
    },
    completeWorklogItem(id: string) {
      Worklog.completeWorklogItem(id);
      this.getWorklog();
    },
    deleteWorklogItem(id: string) {
      Worklog.deleteWorklogItem(id);
      this.getWorklog();
    },
    startPauseWorklogItem(id: string) {
      Worklog.startPauseWorklogItem(id);
      this.getWorklog();
    },
    endPauseWorklogItem(id: string) {
      Worklog.endPauseWorklogItem(id);
      this.getWorklog();
    },
    clearWorklog() {
      Worklog.clearWorklog();
      this.getWorklog();
    },
  },
});
