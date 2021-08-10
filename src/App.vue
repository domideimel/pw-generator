<template>
  <div class="container">
    <h2>Passwort Generator</h2>
    <div class="result-container">
      <div class="scroll-container">
        <input
          type="text"
          v-model="result"
          id="result"
          readonly
          ref="pw"
          @click="getGeneratedPassword"
        />
      </div>
      <button class="btn" @click="getGeneratedPassword">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="far"
          data-icon="copy"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill="currentColor"
            d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z"
          />
        </svg>
      </button>
    </div>
    <div class="settings">
      <div class="setting">
        <label>Passwort länge</label>
        <input
          type="number"
          min="4"
          max="999"
          v-model="length"
        />
      </div>
      <div class="setting">
        <label>Großbuchstaben verwenden</label>
        <input
          type="checkbox"
          id="uppercase"
          v-model="uppercase"
        />
      </div>
      <div class="setting">
        <label>Kleinbuchstaben verwenden</label>
        <input
          type="checkbox"
          id="lowercase"
          v-model="lowercase"
        />
      </div>
      <div class="setting">
        <label>Nummern verwenden</label>
        <input
          type="checkbox"
          id="numbers"
          v-model="numbers"
        />
      </div>
      <div class="setting">
        <label>Sonderzeichen verwenden</label>
        <input
          type="checkbox"
          id="symbols"
          v-model="symbols"
        />
      </div>
    </div>
    <button class="btn btn-large" id="generate" @click="getResult">
      Passwort generieren
    </button>
  </div>
  <transition name="fade">
    <div class="toast" v-show="modal">
      Dein Passwort wurde kopiert.
    </div>
  </transition>
  <reload-prompt />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { copyToClipboard, generatePassword } from './helpers';
import { debounce } from 'lodash-es';
import ReloadPrompt from './components/ReloadPrompt.vue';

export default defineComponent({
  name: 'App',
  components: { ReloadPrompt },
  setup () {
    const uppercase = ref<string | number | string[]>('true');
    const lowercase = ref<string | number | string[]>('true');
    const numbers = ref<string | number | string[]>('true');
    const symbols = ref<string | number | string[]>('true');
    const length = ref<number>(20);
    const result = ref<string>('');
    const modal = ref<boolean>(false);

    const pw = ref(null);

    const getResult = () => {
      result.value = generatePassword(!!lowercase.value, !!uppercase.value, !!numbers.value, !!symbols.value, length.value);
    };

    const toggleModal = debounce(() => {
      modal.value = !modal.value;
    }, 200);

    const getGeneratedPassword = () => {
      if (!result.value.length) return;
      copyToClipboard(result.value);
      // @ts-ignore
      pw.value.select();
      toggleModal();
      setTimeout(() => resetGenerator(), 2000);
    };

    const resetGenerator = () => {
      toggleModal();
      result.value = '';
    };

    return {
      getGeneratedPassword,
      getResult,
      toggleModal,
      uppercase,
      lowercase,
      numbers,
      symbols,
      length,
      result,
      modal,
      pw
    };
  }
});
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Muli&display=swap');

* {
  box-sizing: border-box;
}

body {
  background-color: #3B3B98;
  color: #fff;
  display: flex;
  font-family: 'Muli', sans-serif;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  min-height: 100vh;
}

p {
  margin: 5px 0;
}

h2 {
  margin: 10px 0 20px;
  text-align: center;
}

input[type=checkbox] {
  margin-right: 0;
}

.container {
  background-color: #23235B;
  box-shadow: 0px 2px 10px rgba(255, 255, 255, 0.2);
  padding: 20px;
  width: 350px;
  max-width: 100%;
}

.scroll-container {
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  max-height: 100%;
}

.result-container {
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  letter-spacing: 1px;
  padding: 12px 10px;
  height: 50px;
  width: 100%;
}

.result-container .btn {
  font-size: 20px;
  position: absolute;
  top: 5px;
  right: 5px;
  height: 40px;
  width: 40px;
}

#result:focus {
  outline: none;
}

#result {
  width: 100%;
  height: 100%;
  border: none;
  color: inherit;
  background: none;
  font-size: 20px;
}

.btn {
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  padding: 8px 12px;
  background-color: #3B3B98;
}

.btn-large {
  display: block;
  width: 100%;
}

.setting {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
}

@media screen and (max-width: 400px) {
  #result {
    font-size: 14px;
  }
}

.toast {
  position: absolute;
  top: 24px;
  right: 24px;
  padding: 16px;
  background: green;
  border-radius: 10px;
}

fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
