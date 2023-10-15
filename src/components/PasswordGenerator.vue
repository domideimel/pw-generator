<script lang="ts" setup>
import { ref } from 'vue'
import { NButton, NCheckbox, NForm, NFormItem, NInput, NInputGroup, NInputNumber, NSlider, NSpace, useNotification } from 'naive-ui'
import { generatePassword } from '../helpers'
import Card from './Card.vue'
import { useClipboard, useStorage } from '@vueuse/core'
import { NOTIFICATION_ERROR_CONFIG, NOTIFICATION_SUCCESS_CONFIG, PASSWORD_CACHE_LENGTH } from '../lib/constants'

const uppercase = ref<boolean>(true)
const lowercase = ref<boolean>(true)
const numbers = ref<boolean>(true)
const symbols = ref<boolean>(true)
const length = ref<number>(20)
const result = ref<string>('')

const notification = useNotification()
const { copy } = useClipboard({ legacy: true })
const state = useStorage<string[]>('lastGeneratedPasswords', [], localStorage)

const getResult = () => {
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
      throw new Error('Es wurde noch kein Passwort generiert.')
    }
    await copy(result.value)
    state.value = [result.value, ...state.value].slice(0, PASSWORD_CACHE_LENGTH)
    notification.success(NOTIFICATION_SUCCESS_CONFIG)
  } catch (e: any) {
    notification.error({
      ...NOTIFICATION_ERROR_CONFIG,
      content: e.message
    })
  }
}
</script>


<template>
  <card title="Passwort Generator">
    <n-form>
      <n-form-item>
        <n-input-group>
          <n-input
            v-model:value="result"
            clearable
            disabled
            placeholder="Passwort"
            size="large"
            type="text"
            @click="getGeneratedPassword"
          />
          <n-button
            size="large"
            text-color="#fff"
            type="info"
            @click="getGeneratedPassword"
          >
            kopieren
          </n-button>
        </n-input-group>
      </n-form-item>
      <n-form-item
        :show-feedback="false"
        label="Passwortlänge"
        size="small"
      >
        <n-space vertical>
          <n-slider v-model:value="length"/>
          <n-input-number
            v-model:value="length"
            placeholder="Passwortlänge"
            size="small"
          />
        </n-space>
      </n-form-item>
      <n-form-item
        :show-feedback="false"
        size="small"
      >
        <n-space vertical>
          <n-checkbox v-model:checked="uppercase" label="Großbuchstaben verwenden"/>
          <n-checkbox v-model:checked="lowercase" label="Kleinbuchstaben verwenden"/>
          <n-checkbox v-model:checked="numbers" label="Nummern verwenden"/>
          <n-checkbox v-model:checked="symbols" label="Sonderzeichen verwenden"/>
        </n-space>
      </n-form-item>
      <n-form-item>
        <n-button
          size="large"
          text-color="#fff"
          type="info"
          @click="getResult"
        >Passwort generieren
        </n-button>
      </n-form-item>
    </n-form>
  </card>
</template>
