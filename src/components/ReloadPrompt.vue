<script lang="ts" setup>
import { useRegisterSW } from 'virtual:pwa-register/vue'

import { NButton, NButtonGroup, NCard, NSpace, NText } from 'naive-ui'

const intervalMS = 60 * 60 * 1000
const {
  offlineReady,
  needRefresh,
  updateServiceWorker
} = useRegisterSW({
  onRegistered (r) {
    r && setInterval(() => {
      r.update()
    }, intervalMS)
  }
})

const close = async () => {
  offlineReady.value = false
  needRefresh.value = false
}
</script>

<template>
  <n-card
    v-if="offlineReady || needRefresh"
    size="small"
  >
    <n-space
      justify="space-between"
      vertical
    >
      <n-text>
        <span v-if="offlineReady">
          Die App ist runtergeladen
        </span>
        <span v-else>
          Es sind updated verfügbar. Bitte neuladen
        </span>
      </n-text>
      <n-button-group>
        <n-button v-if="needRefresh" type="success" @click="updateServiceWorker()">
          Neu laden
        </n-button>
        <n-button type="error" @click="close">
          Schließen
        </n-button>
      </n-button-group>
    </n-space>
  </n-card>
</template>

<style lang="scss" scoped>
.n-card {
  bottom: 1.5rem;
  right: 1.5rem;
  position: fixed;
  width: calc(100% - 48px);
  max-width: 350px;
}
</style>
