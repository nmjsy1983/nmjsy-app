<template>
  <Teleport to="body">
    <Transition name="popover-fade">
      <div v-if="modelValue" class="popover-backdrop" @click.self="close">
        <Transition name="popover-grow">
          <div
            v-if="modelValue"
            ref="panelRef"
            class="popover-panel"
            :style="panelStyle"
          >
            <div class="popover-arrow" :style="arrowStyle" />
            <div class="popover-body">
              <slot />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, ref, watch, nextTick } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  target: { type: Object, default: null },
})

const emit = defineEmits(['update:modelValue'])

const panelRef = ref(null)
const position = ref({ left: 0, arrowLeft: 0 })

const panelStyle = computed(() => ({
  left: `${position.value.left}px`,
}))

const arrowStyle = computed(() => ({
  left: `${position.value.arrowLeft}px`,
}))

const updatePosition = async () => {
  if (!props.target || !props.modelValue) return
  await nextTick()
  const rect = props.target.getBoundingClientRect()
  const panelWidth = panelRef.value?.offsetWidth || 130
  const center = rect.left + rect.width / 2
  let left = center - panelWidth / 2
  const minLeft = 12
  const maxLeft = window.innerWidth - panelWidth - 12
  left = Math.max(minLeft, Math.min(maxLeft, left))
  // 小三角指向触发图标的中心（相对于面板左侧）
  const arrowLeft = center - left - 6
  position.value = { left, arrowLeft }
}

watch(() => props.modelValue, (val) => {
  if (val) updatePosition()
})

watch(() => props.target, () => {
  if (props.modelValue) updatePosition()
})

const close = () => {
  emit('update:modelValue', false)
}
</script>

<style scoped>
.popover-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: calc(64px + var(--safe-bottom));
  z-index: 100;
  background: rgba(28, 25, 23, 0.2);
}

.popover-panel {
  position: fixed;
  bottom: calc(68px + var(--safe-bottom));
  width: 25vw;
  min-width: 120px;
  max-width: 150px;
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.14);
  z-index: 101;
  transform-origin: center bottom;
}

.popover-arrow {
  position: absolute;
  bottom: -7px;
  width: 12px;
  height: 12px;
  background: var(--bg);
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  transform: rotate(45deg);
  z-index: -1;
}

.popover-body {
  position: relative;
  z-index: 1;
  border-radius: 18px;
  overflow: hidden;
}

.popover-fade-enter-active,
.popover-fade-leave-active {
  transition: opacity 0.2s ease;
}

.popover-fade-enter-from,
.popover-fade-leave-to {
  opacity: 0;
}

.popover-grow-enter-active,
.popover-grow-leave-active {
  transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease;
}

.popover-grow-enter-from,
.popover-grow-leave-to {
  opacity: 0;
  transform: scale(0.85) translateY(10px);
}
</style>
