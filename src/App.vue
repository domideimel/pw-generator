<script lang="ts" setup>
import { computed } from 'vue'
import { darkTheme, GlobalThemeOverrides, NConfigProvider, NGlobalStyle, NGrid, NGridItem, NLayout, NNotificationProvider, useOsTheme } from 'naive-ui'
import { BuiltInGlobalTheme } from 'naive-ui/es/themes/interface'
import 'vfonts/Lato.css'
import PasswordGenerator from './components/PasswordGenerator.vue'
import LastPasswords from './components/LastPasswords.vue'
import { useStorage } from '@vueuse/core/index'

const hasPurgesOldCache = useStorage<boolean>('hasPurgesOldCache', false, localStorage)

if (!hasPurgesOldCache.value) {
  localStorage.clear()
  hasPurgesOldCache.value = true
}

const osThemeRef = useOsTheme()
const theme = computed<BuiltInGlobalTheme | null>(() => (osThemeRef.value === 'dark' ? darkTheme : null))
const themeOverrides: GlobalThemeOverrides = {
  common: {
    fontWeight: '400',
    fontWeightStrong: '600',
    fontFamily: 'v-sans'
  },
}
</script>

<template>
  <n-config-provider
    :theme="theme"
    :theme-overrides="themeOverrides"
    tag="main"
  >
    <n-global-style/>
    <n-notification-provider>
      <n-layout
        :native-scrollbar="true"
        content-style="padding: 24px;"
        embedded
      >
        <n-grid y-gap="24" :cols="1">
          <n-grid-item>
            <password-generator/>
          </n-grid-item>
          <n-grid-item>
            <last-passwords/>
          </n-grid-item>
        </n-grid>
      </n-layout>
    </n-notification-provider>
  </n-config-provider>
</template>

<style scoped>
.n-layout {
  min-height: 100vh;
}
</style>
