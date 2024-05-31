<template>
  <div class="mx-auto my-8 w-[580px]">
    <div class="mb-6 flex justify-between">
      <h1 class="text-3xl font-bold">Трекинг времени</h1>
      <Button size="sm" variant="destructive" @click="clear">Очистить</Button>
    </div>
    <div class="mb-4 flex w-full items-center gap-2">
      <Input v-model.number="taskNumber" placeholder="Номер задачи" />
      <Button @click="create">Начать задачу</Button>
    </div>
    <div class="flex flex-col gap-2">
      <ActiveWorklog
        v-for="item in worklogStore.worklog"
        :item="item"
        @complete="completeTask(item.id)"
        @delete="deleteTask(item.id)"
        @pause="pauseTask(item.id)"
        @play="playTask(item.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { onBeforeMount, ref } from 'vue';
import { useWorklogStore } from '@/stores/worklog.store';
import ActiveWorklog from '@/components/ActiveWorklog.vue';

const worklogStore = useWorklogStore();
const taskNumber = ref<string | number>('');

function create() {
  if (!taskNumber.value) return;
  worklogStore.createWorklogItem(taskNumber.value);
  taskNumber.value = '';
}

function clear() {
  worklogStore.clearWorklog();
}

function completeTask(id: string) {
  worklogStore.completeWorklogItem(id);
}

function deleteTask(id: string) {
  worklogStore.deleteWorklogItem(id);
}

function pauseTask(id: string) {
  worklogStore.startPauseWorklogItem(id);
}

function playTask(id: string) {
  worklogStore.endPauseWorklogItem(id);
}

onBeforeMount(() => {
  worklogStore.getWorklog();
});
</script>
