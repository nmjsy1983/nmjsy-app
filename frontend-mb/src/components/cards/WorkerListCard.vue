<template>
  <div class="card">
    <div class="card-header">
      <span class="card-label">人员记工</span>
      <span class="card-more">全部</span>
    </div>
    <div class="list-scroll">
      <div v-for="(item, i) in list" :key="i" class="list-item">
        <div class="list-main">
          <div class="list-title">{{ item.worker }} · {{ item.project }}</div>
          <div class="list-meta">{{ item.date }} · {{ item.type }}</div>
        </div>
        <div class="list-hours">{{ item.hours }}h</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const list = [
  { worker: '张三', project: '项目A', date: '07-14', type: '木工', hours: 8 },
  { worker: '李四', project: '项目B', date: '07-14', type: '瓦工', hours: 9 },
  { worker: '王五', project: '项目A', date: '07-13', type: '钢筋工', hours: 8.5 },
  { worker: '赵六', project: '项目C', date: '07-13', type: '水电工', hours: 7 },
  { worker: '孙七', project: '项目B', date: '07-12', type: '焊工', hours: 8 },
  { worker: '周八', project: '项目A', date: '07-12', type: '架子工', hours: 9 },
  { worker: '吴九', project: '项目C', date: '07-11', type: '泥工', hours: 8 },
  { worker: '郑十', project: '项目B', date: '07-10', type: '油漆工', hours: 8.5 },
  { worker: '钱十一', project: '项目A', date: '07-10', type: '电工', hours: 7.5 },
  { worker: '冯十二', project: '项目C', date: '07-09', type: '杂工', hours: 6 },
]
</script>

<style scoped>
.card {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 18px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.card-label {
  font-size: 12px;
  color: var(--text-secondary);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.6px;
}

.card-more {
  font-size: 12px;
  color: var(--brand);
  font-weight: 500;
}

.list-scroll {
  height: 320px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.list-scroll::-webkit-scrollbar {
  display: none;
}

.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid var(--line);
}

.list-item:last-child {
  border-bottom: none;
}

.list-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
  margin-bottom: 3px;
}

.list-meta {
  font-size: 11px;
  color: var(--text-tertiary);
}

.list-hours {
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  font-weight: 700;
  color: var(--blue);
  white-space: nowrap;
}
</style>
