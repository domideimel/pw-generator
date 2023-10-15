<script setup lang="ts">
import Card from './Card.vue'
import { useClipboard, useStorage } from '@vueuse/core'
import { NButton, NIcon, NList, NListItem, NSpace, useNotification } from 'naive-ui'
import { ContentCopyFilled, DeleteFilled } from '@vicons/material'
import { NOTIFICATION_ERROR_CONFIG, NOTIFICATION_SUCCESS_CONFIG } from '../lib/constants'

const notification = useNotification()
const state = useStorage<string[]>('lastGeneratedPasswords', [], localStorage)
const { copy } = useClipboard({ legacy: true })

const getLastGeneratedPassword = async (password: string) => {
  try {
    await copy(password)
    notification.success(NOTIFICATION_SUCCESS_CONFIG)
  } catch (e) {
    notification.error(NOTIFICATION_ERROR_CONFIG)
  }
}

const deletePassword = (password: string) => {
  state.value = state.value.filter((item) => item !== password)
}
</script>

<template>
  <card title="Zuletzt generierte Passwörter">
    <n-list v-if="state.length">
      <n-list-item v-for="password in state" :key="password">
        <template #suffix>
          <n-space size="small" :wrap="false">
            <n-button @click.prevent="getLastGeneratedPassword(password)">
              <n-icon>
                <ContentCopyFilled/>
              </n-icon>
            </n-button>
            <n-button @click.prevent="deletePassword(password)">
              <n-icon>
                <DeleteFilled/>
              </n-icon>
            </n-button>
          </n-space>
        </template>
        {{ password }}
      </n-list-item>
    </n-list>
    <n-list v-else>
      <n-list-item>Es wurden noch keine Passwörter generiert.</n-list-item>
    </n-list>
  </card>
</template>
