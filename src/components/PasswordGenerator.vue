<template>
  <n-space
    align="center"
    justify="center"
    wrap
  >
    <n-card title="Passwort Generator">
      <n-form>
        <n-form-item>
          <n-input-group>
            <n-input
              type="text"
              size="large"
              clearable
              disabled
              placeholder="Passwort"
              v-model:value="result"
              @click="getGeneratedPassword"
            />
            <n-button
              type="info"
              size="large"
              text-color="#fff"
              @click="getGeneratedPassword"
            >
              kopieren
            </n-button>
          </n-input-group>
        </n-form-item>
        <n-form-item
          label="Passwortlänge"
          size="small"
          :show-feedback="false"
        >
          <n-space vertical>
            <n-slider v-model:value="length" />
            <n-input-number
              size="small"
              placeholder="Passwortlänge"
              v-model:value="length"
            />
          </n-space>
        </n-form-item>
        <n-form-item
          size="small"
          :show-feedback="false"
        >
          <n-space vertical>
            <n-checkbox v-model:checked="uppercase" label="Großbuchstaben verwenden" />
            <n-checkbox v-model:checked="lowercase" label="Kleinbuchstaben verwenden" />
            <n-checkbox v-model:checked="numbers" label="Nummern verwenden" />
            <n-checkbox v-model:checked="symbols" label="Sonderzeichen verwenden" />
          </n-space>
        </n-form-item>
        <n-form-item>
          <n-button
            type="info"
            size="large"
            text-color="#fff"
            @click="getResult"
          >Passwort generieren
          </n-button>
        </n-form-item>
      </n-form>
    </n-card>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { NButton, NCard, NCheckbox, NForm, NFormItem, NInput, NInputGroup, NInputNumber, NSlider, NSpace, useNotification } from 'naive-ui'
import { copyToClipboard, generatePassword } from '../helpers'

export default defineComponent({
  components: {
    NCard,
    NInput,
    NSpace,
    NForm,
    NInputGroup,
    NButton,
    NSlider,
    NFormItem,
    NCheckbox,
    NInputNumber
  },
  setup () {
    const uppercase = ref<boolean>(true);
    const lowercase = ref<boolean>(true);
    const numbers = ref<boolean>(true);
    const symbols = ref<boolean>(true);
    const length = ref<number>(20);
    const result = ref<string>('');
    const getResult = () => {
      result.value = generatePassword(lowercase.value, uppercase.value, numbers.value, symbols.value, length.value);
    };
    const notification = useNotification();

    const toggleModal = () => {
      notification.success({
        content: 'Dein Passwort wurde kopiert.',
        meta: '',
        duration: 10000
      });
    };

    const getGeneratedPassword = () => {
      if (!result.value.length) return;
      copyToClipboard(result.value);
      toggleModal();
      setTimeout(() => resetGenerator(), 2000);
    };

    const resetGenerator = () => {
      result.value = '';
    };
    return {
      uppercase,
      lowercase,
      numbers,
      symbols,
      length,
      result,
      getGeneratedPassword,
      getResult,
      toggleModal
    };
  }
});
</script>

<style scoped lang="scss">
.n-space {
  flex-basis: 100%;
}

.n-card {
  width: calc(100vw - 48px);

  @media only screen and (min-width: 769px) {
    width: calc(75vw - 48px);
  }

  @media only screen and (min-width: 1025px) {
    width: 50vmin;
  }
}
</style>
