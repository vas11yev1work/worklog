<template>
  <Card>
    <CardHeader class="flex-row justify-between">
      <div>
        <CardTitle class="mb-4">TASK-{{ item.taskNumber }}</CardTitle>
        <div class="flex flex-col gap-1">
          <CardDescription>Начало: {{ dayjs(item.timeStart).format('D MMM YYYY HH:mm') }}</CardDescription>
          <CardDescription v-if="item.timeEnd">
            Конец: {{ dayjs(item.timeEnd).format('D MMM YYYY HH:mm') }}
          </CardDescription>
          <CardDescription v-if="item.timeEnd">Jira Time: {{ jiraTime }}</CardDescription>
          <div class="flex items-center">
            <div class="mr-1.5 h-3 w-3 rounded-full" :class="statusColor" />
            <CardDescription>{{ statusText }}</CardDescription>
          </div>
        </div>
      </div>
      <div v-if="item.status !== 'completed'" class="flex gap-2">
        <Button v-if="item.status !== 'paused'" variant="outline" size="icon" @click="$emit('pause')">
          <Pause class="h-5 w-5" />
        </Button>
        <Button v-else variant="outline" size="icon" @click="$emit('play')">
          <Play class="h-5 w-5" />
        </Button>
        <Button v-if="item.status === 'active'" size="icon" @click="$emit('complete')">
          <Check class="h-5 w-5" />
        </Button>
      </div>
      <Button v-if="item.status === 'completed'" size="icon" variant="destructive" @click="$emit('delete')">
        <Trash class="h-5 w-5" />
      </Button>
    </CardHeader>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { WorklogItem } from '@/types/worklog.types';
import { Pause, Check, Trash, Play } from 'lucide-vue-next';
import dayjs from 'dayjs';
import { computed } from 'vue';

const props = defineProps<{
  item: WorklogItem;
}>();

defineEmits<{
  (e: 'pause' | 'delete' | 'complete' | 'play'): void;
}>();

const statusText = computed(() => {
  switch (props.item.status) {
    case 'active':
      return 'В работе';
    case 'paused':
      return 'Пауза';
    case 'completed':
      return 'Завершен';
    default:
      return 'Неизвестно';
  }
});

const statusColor = computed(() => {
  switch (props.item.status) {
    case 'active':
      return 'bg-blue-500';
    case 'paused':
      return 'bg-amber-500';
    case 'completed':
      return 'bg-emerald-500';
    default:
      return 'bg-gray-100';
  }
});

const jiraTime = computed(() => {
  if (!props.item.timeEnd) return 0;
  const timeStart = dayjs(props.item.timeStart);
  const timeEnd = dayjs(props.item.timeEnd);
  return convertMinutesToDHM(timeEnd.diff(timeStart, 'minute') - pauseTime.value);
});

const pauseTime = computed(() => {
  if (!props.item.pauseTime) return 0;
  return props.item.pauseTime.reduce((acc, item) => {
    if (item.length !== 2) return acc;
    const diff = dayjs(item[1]).diff(dayjs(item[0]), 'minute');
    console.log(diff);
    return acc + diff;
  }, 0);
});

function convertMinutesToDHM(minutes: number): string {
  if (!minutes) return '0m';

  const minutesInHour = 60;
  const hoursInDay = 8;

  const days = Math.floor(minutes / (hoursInDay * minutesInHour));
  const remainingMinutes = minutes % (hoursInDay * minutesInHour);
  const hours = Math.floor(remainingMinutes / minutesInHour);
  const mins = remainingMinutes % minutesInHour;

  const result: string[] = [];
  if (days > 0) {
    result.push(`${days}d`);
  }
  if (hours > 0) {
    result.push(`${hours}h`);
  }
  if (mins > 0) {
    result.push(`${mins}m`);
  }

  return result.join(' ');
}
</script>
