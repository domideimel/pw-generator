<script setup lang="ts">
import Card from './Card.vue'
import { useClipboard, useStorage } from '@vueuse/core'
import { NButton, NIcon, NList, NListItem, NPopover, NSpace, useNotification } from 'naive-ui'
import { ContentCopyFilled, DeleteFilled, InfoOutlined } from '@vicons/material'
import { NOTIFICATION_ERROR_CONFIG, NOTIFICATION_SUCCESS_CONFIG } from '../lib/constants'
import { PasswordMap } from '../types/types'

const notification = useNotification()
const state = useStorage<PasswordMap>('lastGeneratedPasswords', new Map(), localStorage)
const { copy } = useClipboard({ legacy: true })

const getLastGeneratedPassword = async (password: string) => {
  try {
    await copy(password)
    notification.success(NOTIFICATION_SUCCESS_CONFIG)
  } catch (e) {
    notification.error(NOTIFICATION_ERROR_CONFIG)
  }
}
</script>

<template>
  <card title="Zuletzt generierte Passwörter">
    <template #header-extra>
      <n-popover trigger="hover">
        <template #trigger>
          <n-button :circle="true" :bordered="false" :ghost="true">
            <n-icon>
              <InfoOutlined/>
            </n-icon>
          </n-button>
        </template>
        <span>Neue Passwörter werden an das Ende der Liste hinzugefügt</span>
      </n-popover>
    </template>
    <n-list>
      <n-list-item v-if="![...state.values()].length">Es wurden noch keine Passwörter generiert.</n-list-item>
      <n-list-item v-for="[key, password] in state" :key="key">
        <template #suffix>
          <n-space size="small" :wrap="false">
            <n-button
              @click.prevent="getLastGeneratedPassword(password)"
              :round="true"
              :ghost="true"
            >
              <n-icon>
                <ContentCopyFilled/>
              </n-icon>
            </n-button>
            <n-button
              @click.prevent="state.delete(key)"
              :round="true"
            >
              <n-icon>
                <DeleteFilled/>
              </n-icon>
            </n-button>
          </n-space>
        </template>
        {{ password }}
      </n-list-item>
    </n-list>
  </card>
</template>
