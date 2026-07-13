<template>
  <Teleport to="body">
    <Transition name="drawer-fade">
      <div v-if="modelValue" class="drawer-overlay" @click.self="close">
        <Transition name="drawer-slide">
          <div v-if="modelValue" class="drawer-panel" :class="{ 'drawer-full': fullHeight }">
            <div class="drawer-handle" @click="close">
              <div class="drawer-bar" />
            </div>
            <div class="drawer-content">
              <slot />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  fullHeight: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue'])

const close = () => {
  emit('update:modelValue', false)
}
</script>

<style scoped>
.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: calc(64px + var(--safe-bottom));
  background: rgba(28, 25, 23, 0.45);
  z-index: 100;
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
}

.drawer-panel {
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 12px;
  max-height: 72vh;
  min-height: 260px;
  background: var(--bg);
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.14);
  overflow: hidden;
}

.drawer-panel.drawer-full {
  max-height: calc(92vh - 64px - var(--safe-bottom));
  min-height: calc(92vh - 64px - var(--safe-bottom));
}

.drawer-handle {
  flex-shrink: 0;
  padding: 10px 0 6px;
  display: grid;
  place-items: center;
  cursor: pointer;
}

.drawer-bar {
  width: 40px;
  height: 5px;
  border-radius: 3px;
  background: var(--line-strong);
}

.drawer-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  padding: 4px 0 calc(20px + var(--safe-bottom));
}

.drawer-fade-enter-active,
.drawer-fade-leave-active {
  transition: opacity 0.25s ease;
}

.drawer-fade-enter-from,
.drawer-fade-leave-to {
  opacity: 0;
}

.drawer-slide-enter-active,
.drawer-slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1);
}

.drawer-slide-enter-from,
.drawer-slide-leave-to {
  transform: translateY(110%);
}
</style>
