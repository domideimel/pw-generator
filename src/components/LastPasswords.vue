<script setup lang="ts">
import Card from './Card.vue'
import { useClipboard, useStorage } from '@vueuse/core'
import { NButton, NIcon, NList, NListItem, NPopover, NSpace, useNotification } from 'naive-ui'
import { ContentCopyFilled, DeleteFilled, InfoOutlined } from '@vicons/material'
import { NOTIFICATION_ERROR_CONFIG, NOTIFICATION_SUCCESS_CONFIG } from '../lib/constants'
import { PasswordMap } from '../types/types'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })

const notification = useNotification()
const state = useStorage<PasswordMap>('lastGeneratedPasswords', new Map(), localStorage)
const { copy } = useClipboard({ legacy: true })

const getLastGeneratedPassword = async (password: string) => {
  try {
    await copy(password)
    notification.success({
      ...NOTIFICATION_SUCCESS_CONFIG,
      content: t(NOTIFICATION_SUCCESS_CONFIG.content)
    })
  } catch (e) {
    notification.error({
      ...NOTIFICATION_ERROR_CONFIG,
      content: t(NOTIFICATION_ERROR_CONFIG.content)
    })
  }
}
</script>

<template>
  <card :title="$t('last_passwords')">
    <template #header-extra>
      <n-popover trigger="hover">
        <template #trigger>
          <n-button :circle="true" :bordered="false" :ghost="true">
            <n-icon>
              <InfoOutlined/>
            </n-icon>
          </n-button>
        </template>
        <span>{{$t('tooltip')}}</span>
      </n-popover>
    </template>
    <n-list>
      <n-list-item v-if="![...state.values()].length">{{$t('not_generated')}}</n-list-item>
      <n-list-item v-for="[key, password] in state" :key="key">
        <template #suffix>
          <n-space size="small" :wrap="false">
            <n-button
              @click.prevent="getLastGeneratedPassword(password)"
              :round="true"
              :ghost="true"
              :title="$t('copy')"
            >
              <n-icon>
                <ContentCopyFilled/>
              </n-icon>
            </n-button>
            <n-button
              @click.prevent="state.delete(key)"
              :round="true"
              :title="$t('delete')"
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
