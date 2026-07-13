<template>
  <div class="mobile-layout">
    <header class="global-header">
      <div class="brand">
        <div class="brand-mark">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <path d="M8 12h8M12 8v8" />
          </svg>
        </div>
        <span class="brand-name">{{ displayBrand }}</span>
      </div>
      <nav class="quick-links">
        <div class="link-block" @click="go('data')">项目</div>
        <div class="link-block" @click="go('data')">财务</div>
        <div class="link-block" @click="go('data')">物料</div>
      </nav>
    </header>

    <div class="mobile-content">
      <router-view />
    </div>

    <MobileTabBar @open-popover="openPopover" @close-popover="closePopover" />

    <BottomPopover v-model="popoverVisible" :target="popoverTarget">
      <DataPopoverContent v-if="popoverType === 'data'" @navigate="popoverNavigate" />
      <ProfilePopoverContent v-else @navigate="popoverNavigate" @logout="handleLogout" />
    </BottomPopover>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import MobileTabBar from '@/components/MobileTabBar.vue'
import BottomPopover from '@/components/BottomPopover.vue'
import DataPopoverContent from '@/components/DataPopoverContent.vue'
import ProfilePopoverContent from '@/components/ProfilePopoverContent.vue'

const router = useRouter()
const userStore = useUserStore()

const brandName = '众焱网络科技有限公司' // 后续从后台配置读取
const displayBrand = computed(() => brandName.slice(0, 4))

const popoverVisible = ref(false)
const popoverTarget = ref(null)
const popoverType = ref('data')

const go = (name) => router.push(`/${name}`)

const openPopover = (key, target) => {
  if (popoverVisible.value && popoverTarget.value === target) {
    popoverVisible.value = false
    return
  }
  popoverType.value = key
  popoverTarget.value = target
  popoverVisible.value = true
}

const closePopover = () => {
  popoverVisible.value = false
}

const popoverNavigate = (route) => {
  popoverVisible.value = false
  setTimeout(() => {
    router.push(route)
  }, 180)
}

const handleLogout = () => {
  popoverVisible.value = false
  userStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.mobile-layout {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--bg);
  position: relative;
}

.global-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 30;
  height: calc(56px + var(--safe-top));
  padding-top: var(--safe-top);
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  background: var(--surface);
  border-bottom: 1px solid var(--line);
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.brand-mark {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: var(--brand);
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.brand-name {
  font-size: 17px;
  font-weight: 800;
  letter-spacing: 0.3px;
  color: var(--text);
  flex-shrink: 0;
  width: 4.1em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.quick-links {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  flex: 1;
  min-width: 0;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.quick-links::-webkit-scrollbar {
  display: none;
}

.link-block {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  padding: 7px 12px;
  border-radius: 12px;
  background: var(--brand-soft);
  color: var(--brand);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.18s;
  -webkit-tap-highlight-color: transparent;
  white-space: nowrap;
  flex-shrink: 0;
}

.link-block:active {
  background: var(--brand);
  color: #ffffff;
  transform: scale(0.96);
}

.mobile-content {
  flex: 1;
  min-height: 0;
  margin-top: calc(56px + var(--safe-top));
  margin-bottom: calc(64px + var(--safe-bottom));
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}

.mobile-content > :deep(*) {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  position: relative;
}
</style>
