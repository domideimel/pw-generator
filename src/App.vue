<template>
  <n-config-provider
    :theme="theme"
    :theme-overrides="themeOverrides"
    tag="main"
  >
    <n-global-style />
    <n-notification-provider>
      <n-layout
        embedded
        content-style="padding: 24px;"
        :native-scrollbar="false"
      >
        <password-generator />
      </n-layout>
    </n-notification-provider>
    <reload-prompt />
  </n-config-provider>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { darkTheme, GlobalThemeOverrides, NConfigProvider, NGlobalStyle, NLayout, NNotificationProvider, NSpace, useOsTheme } from 'naive-ui'
import { BuiltInGlobalTheme } from 'naive-ui/es/themes/interface'
import 'vfonts/Lato.css'
import PasswordGenerator from './components/PasswordGenerator.vue'
import ReloadPrompt from './components/ReloadPrompt.vue'

export default defineComponent({
  name: 'App',
  components: {
    ReloadPrompt,
    PasswordGenerator,
    NConfigProvider,
    NGlobalStyle,
    NLayout,
    NSpace,
    NNotificationProvider
  },
  setup () {
    const osThemeRef = useOsTheme();
    const theme = computed<BuiltInGlobalTheme | null>(() => (osThemeRef.value === 'dark' ? darkTheme : null));
    const themeOverrides: GlobalThemeOverrides = {
      common: {
        fontWeight: '400',
        fontWeightStrong: '600',
        fontFamily: 'v-sans'
      }
    };
    return {
      theme,
      osThemeRef,
      themeOverrides
    };
  }
});
</script>
<style scoped>
.n-layout {
  height: 100vh;
}
</style>
