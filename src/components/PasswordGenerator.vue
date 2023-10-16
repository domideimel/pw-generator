<script lang="ts" setup>
import { ref } from 'vue'
import { NButton, NCheckbox, NForm, NFormItem, NInput, NInputGroup, NInputNumber, NSlider, NSpace, useNotification } from 'naive-ui'
import { generatePassword } from '../helpers'
import Card from './Card.vue'
import { useClipboard, useStorage } from '@vueuse/core'
import { NOTIFICATION_ERROR_CONFIG, NOTIFICATION_SUCCESS_CONFIG, PASSWORD_CACHE_LENGTH } from '../lib/constants'
import { PasswordMap } from '../types/types'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })

const uppercase = ref<boolean>(true)
const lowercase = ref<boolean>(true)
const numbers = ref<boolean>(true)
const symbols = ref<boolean>(true)
const length = ref<number>(20)
const result = ref<string>('')

const hasCopied = ref<boolean>(false)

const notification = useNotification()
const { copy } = useClipboard({ legacy: true })
const state = useStorage<PasswordMap>('lastGeneratedPasswords', new Map(), localStorage)

const getResult = () => {
  hasCopied.value = false
  result.value = generatePassword({
    lower: lowercase.value,
    upper: uppercase.value,
    number: numbers.value,
    symbol: symbols.value,
    length: length.value
  })
}

const getGeneratedPassword = async () => {
  try {
    if (!result.value.length) {
      throw new Error(t('not_generated_error'))
    }
    if (hasCopied.value) {
      throw new Error(t('copied_error'))
    }
    if (state.value.size >= PASSWORD_CACHE_LENGTH) {
      state.value.delete(state.value.keys().next().value)
    }
    await copy(result.value)
    state.value.set(result.value, result.value)
    notification.success({
      ...NOTIFICATION_SUCCESS_CONFIG,
      content: t(NOTIFICATION_SUCCESS_CONFIG.content)
    })
    hasCopied.value = true
  } catch (e: any) {
    notification.error({
      ...NOTIFICATION_ERROR_CONFIG,
      content: e.message
    })
  }
}
</script>


<template>
  <card :title="$t('title')">
    <n-form>
      <n-form-item>
        <n-input-group>
          <n-input
            v-model:value="result"
            clearable
            disabled
            :placeholder="$t('placeholder')"
            size="large"
            type="text"
            @click="getGeneratedPassword"
          />
          <n-button
            size="large"
            :ghost="true"
            @click="getGeneratedPassword"
            :disabled="!result.length || hasCopied"
          >
            {{ hasCopied ? $t('copied') : $t('copy') }}
          </n-button>
        </n-input-group>
      </n-form-item>
      <n-form-item
        :show-feedback="false"
        :label="$t('pw_length')"
      >
        <n-space vertical>
          <n-slider v-model:value="length"/>
          <n-input-number
            v-model:value="length"
            :placeholder="$t('pw_length')"
          />
        </n-space>
      </n-form-item>
      <n-form-item
        :show-feedback="false"
        size="small"
      >
        <n-space vertical>
          <n-checkbox v-model:checked="uppercase" :label="$t('uppercase')"/>
          <n-checkbox v-model:checked="lowercase" :label="$t('lowercase')"/>
          <n-checkbox v-model:checked="numbers" :label="$t('numbers')"/>
          <n-checkbox v-model:checked="symbols" :label="$t('symbols')"/>
        </n-space>
      </n-form-item>
      <n-form-item>
        <n-button
          size="large"
          @click="getResult"
          :ghost="true"
        >
          {{ $t('generate') }}
        </n-button>
      </n-form-item>
    </n-form>
  </card>
</template>
