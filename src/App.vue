<script lang="ts" setup>
import { computed } from 'vue'
import { darkTheme, GlobalThemeOverrides, NConfigProvider, NGlobalStyle, NLayout, NNotificationProvider, useOsTheme } from 'naive-ui'
import { BuiltInGlobalTheme } from 'naive-ui/es/themes/interface'
import 'vfonts/Lato.css'
import PasswordGenerator from './components/PasswordGenerator.vue'
import ReloadPrompt from './components/ReloadPrompt.vue'

const osThemeRef = useOsTheme()
const theme = computed<BuiltInGlobalTheme | null>(() => (osThemeRef.value === 'dark' ? darkTheme : null))
const themeOverrides: GlobalThemeOverrides = {
  common: {
    fontWeight: '400',
    fontWeightStrong: '600',
    fontFamily: 'v-sans'
  }
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
        :native-scrollbar="false"
        content-style="padding: 24px;"
        embedded
      >
        <password-generator/>
      </n-layout>
    </n-notification-provider>
    <reload-prompt/>
  </n-config-provider>
</template>

<style scoped>
.n-layout {
  height: 100vh;
}
</style>
