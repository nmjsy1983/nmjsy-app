<template>
  <div class="one-sentence-card">
    <div class="card-header">
      <span class="card-title">一句话记录</span>
      <span class="record-count" v-if="records.length">已记录 {{ records.length }} 条</span>
    </div>

    <div class="input-area">
      <textarea
        v-model="text"
        class="sentence-input"
        rows="2"
        placeholder="今天发生了什么？说一句话..."
        maxlength="200"
      />
    </div>

    <div v-if="previewImages.length" class="preview-list">
      <div v-for="(img, index) in previewImages" :key="index" class="preview-item">
        <img :src="img" alt="preview" />
        <button class="remove-btn" @click="removeImage(index)">×</button>
      </div>
    </div>

    <div class="action-bar">
      <label class="camera-btn">
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          capture="environment"
          multiple
          @change="handleFileChange"
        />
        <Camera class="icon-svg" />
        <span>拍照</span>
      </label>
      <label class="album-btn">
        <input
          type="file"
          accept="image/*"
          multiple
          @change="handleFileChange"
        />
        <Picture class="icon-svg" />
        <span>相册</span>
      </label>
      <button class="submit-btn" :disabled="!canSubmit" @click="submit">
        记录
      </button>
    </div>

    <div v-if="records.length" class="recent-records">
      <div v-for="(record, index) in recentRecords" :key="record.id" class="record-item">
        <div class="record-meta">
          <span class="record-time">{{ formatTime(record.time) }}</span>
        </div>
        <div class="record-text">{{ record.text }}</div>
        <div v-if="record.images?.length" class="record-images">
          <img v-for="(img, i) in record.images.slice(0, 3)" :key="i" :src="img" />
          <span v-if="record.images.length > 3" class="more-images">+{{ record.images.length - 3 }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Camera, Picture } from '@element-plus/icons-vue'

const STORAGE_KEY = 'nmjsy_one_sentence_records'

const text = ref('')
const previewImages = ref([])
const records = ref([])

const fileInput = ref(null)

const canSubmit = computed(() => {
  return text.value.trim().length > 0 || previewImages.value.length > 0
})

const recentRecords = computed(() => records.value.slice(0, 3))

const loadRecords = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      records.value = JSON.parse(saved)
    }
  } catch (e) {
    console.warn('load records failed', e)
  }
}

const saveRecords = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records.value))
  } catch (e) {
    console.warn('save records failed', e)
  }
}

const handleFileChange = (event) => {
  const files = Array.from(event.target.files || [])
  files.forEach((file) => {
    if (!file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (e) => {
      previewImages.value.push(e.target.result)
    }
    reader.readAsDataURL(file)
  })
  event.target.value = ''
}

const removeImage = (index) => {
  previewImages.value.splice(index, 1)
}

const submit = () => {
  if (!canSubmit.value) return
  const record = {
    id: Date.now(),
    text: text.value.trim(),
    images: [...previewImages.value],
    time: Date.now(),
  }
  records.value.unshift(record)
  saveRecords()
  text.value = ''
  previewImages.value = []
}

const formatTime = (timestamp) => {
  const d = new Date(timestamp)
  const now = new Date()
  const isToday = d.toDateString() === now.toDateString()
  const timeStr = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
  if (isToday) return `今天 ${timeStr}`
  return `${d.getMonth() + 1}/${d.getDate()} ${timeStr}`
}

loadRecords()
</script>

<style scoped>
.one-sentence-card {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.card-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--text);
}

.record-count {
  font-size: 12px;
  color: var(--text-tertiary);
}

.input-area {
  margin-bottom: 12px;
}

.sentence-input {
  width: 100%;
  min-height: 64px;
  padding: 12px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--surface);
  color: var(--text);
  font-size: 14px;
  line-height: 1.5;
  resize: none;
  outline: none;
  -webkit-appearance: none;
}

.sentence-input::placeholder {
  color: var(--text-tertiary);
}

.sentence-input:focus {
  border-color: var(--brand);
  background: var(--bg);
}

.preview-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.preview-item {
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--line);
  flex-shrink: 0;
}

.preview-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-btn {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 12px;
  line-height: 1;
  cursor: pointer;
  display: grid;
  place-items: center;
}

.action-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}

.camera-btn,
.album-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  border-radius: 10px;
  background: var(--surface-2);
  color: var(--text-secondary);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
}

.camera-btn:active,
.album-btn:active {
  background: var(--brand-soft);
  color: var(--brand);
}

.camera-btn input,
.album-btn input {
  display: none;
}

.icon-svg {
  width: 16px;
  height: 16px;
}

.submit-btn {
  margin-left: auto;
  padding: 8px 18px;
  border-radius: 10px;
  border: none;
  background: var(--brand);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}

.submit-btn:disabled {
  background: var(--line-strong);
  color: var(--text-tertiary);
  cursor: not-allowed;
}

.submit-btn:not(:disabled):active {
  background: var(--brand-dark);
}

.recent-records {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px dashed var(--line);
}

.record-item {
  padding: 12px;
  border-radius: 14px;
  background: var(--surface);
  margin-bottom: 10px;
}

.record-meta {
  margin-bottom: 6px;
}

.record-time {
  font-size: 12px;
  color: var(--text-tertiary);
}

.record-text {
  font-size: 14px;
  color: var(--text);
  line-height: 1.5;
  word-break: break-word;
}

.record-images {
  display: flex;
  gap: 6px;
  margin-top: 8px;
  flex-wrap: wrap;
}

.record-images img {
  width: 56px;
  height: 56px;
  border-radius: 8px;
  object-fit: cover;
  border: 1px solid var(--line);
}

.more-images {
  width: 56px;
  height: 56px;
  border-radius: 8px;
  background: var(--surface-2);
  display: grid;
  place-items: center;
  font-size: 13px;
  color: var(--text-secondary);
}
</style>
