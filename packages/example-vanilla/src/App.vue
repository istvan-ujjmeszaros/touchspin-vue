<template>
  <div class="App">
    <h1>TouchSpin Vue Event Demo</h1>

    <div class="demo-section">
      <h2>Imperative API Methods</h2>
      <p>Test all TouchSpin methods via the ref API:</p>
      <div class="method-buttons">
        <button @click="touchSpinRef?.focus()">Focus</button>
        <button @click="touchSpinRef?.blur()">Blur</button>
        <button @click="touchSpinRef?.increment()">Increment</button>
        <button @click="touchSpinRef?.decrement()">Decrement</button>
        <button @click="handleGetValue">Get Value</button>
        <button @click="handleSetValue">Set Value</button>
        <button @click="touchSpinRef?.startUpSpin()">Start Up Spin</button>
        <button @click="touchSpinRef?.startDownSpin()">Start Down Spin</button>
        <button @click="touchSpinRef?.stopSpin()">Stop Spin</button>
        <button @click="handleUpdateSettings">Update Settings</button>
      </div>
    </div>

    <div class="demo-section">
      <h2>USD Spinner with Event Tracking</h2>
      <TouchSpin
        ref="touchSpinRef"
        v-model="value"
        :min="0"
        :max="100"
        :step="0.5"
        :decimals="2"
        prefix="$"
        suffix=" USD"
        @onMin="handleMin"
        @onMax="handleMax"
        @onStartSpin="handleStartSpin"
        @onStopSpin="handleStopSpin"
        @onStartUpSpin="handleStartUpSpin"
        @onStartDownSpin="handleStartDownSpin"
        @onStopUpSpin="handleStopUpSpin"
        @onStopDownSpin="handleStopDownSpin"
        @onSpeedChange="handleSpeedChange"
      />
      <p>Current value: ${{ value.toFixed(2) }} USD</p>
    </div>

    <div class="demo-section">
      <h2>TouchSpin Events</h2>
      <p>Events that have been fired:</p>
      <ul class="event-list">
        <li
          v-for="event in allEvents"
          :key="event"
          :class="{ fired: firedEvents.has(event), 'not-fired': !firedEvents.has(event) }"
        >
          {{ event }}: {{ firedEvents.has(event) ? '✅ Fired' : '❌ Not fired' }}
        </li>
      </ul>
      <button class="reset-events-btn" @click="resetEvents">Reset Events</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import TouchSpin from '../../vue/src/TouchSpin.vue'
import type { TouchSpinHandle } from '../../vue/src/types'
import '@touchspin/renderer-vanilla/css'

const value = ref(25.5)
const firedEvents = ref(new Set<string>())
const touchSpinRef = ref<TouchSpinHandle>()

const handleEvent = (eventName: string) => {
  firedEvents.value.add(eventName)
}

const handleMin = () => handleEvent('onMin')
const handleMax = () => handleEvent('onMax')
const handleStartSpin = () => handleEvent('onStartSpin')
const handleStopSpin = () => handleEvent('onStopSpin')
const handleStartUpSpin = () => handleEvent('onStartUpSpin')
const handleStartDownSpin = () => handleEvent('onStartDownSpin')
const handleStopUpSpin = () => handleEvent('onStopUpSpin')
const handleStopDownSpin = () => handleEvent('onStopDownSpin')
const handleSpeedChange = () => handleEvent('onSpeedChange')

const handleGetValue = () => {
  const currentValue = touchSpinRef.value?.getValue()
  alert(`Current value: ${currentValue}`)
}

const handleSetValue = () => {
  const newValue = prompt('Enter new value:', '42')
  if (newValue !== null) {
    const numValue = parseFloat(newValue)
    if (!isNaN(numValue)) {
      touchSpinRef.value?.setValue(numValue)
    }
  }
}

const handleUpdateSettings = () => {
  const newStep = prompt('Enter new step size:', '1')
  if (newStep !== null) {
    const numStep = parseFloat(newStep)
    if (!isNaN(numStep)) {
      touchSpinRef.value?.updateSettings({ step: numStep })
      alert(`Step size updated to ${numStep}`)
    }
  }
}

const allEvents = [
  'onMin',
  'onMax',
  'onStartSpin',
  'onStopSpin',
  'onStartUpSpin',
  'onStartDownSpin',
  'onStopUpSpin',
  'onStopDownSpin',
  'onSpeedChange',
]

const resetEvents = () => {
  firedEvents.value.clear()
}
</script>

<style scoped>
.App {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.12);
  border: 1px solid #c7d2fe;
  --ts-wrapper-background-color: #ffffff;
  --ts-wrapper-border-color: #1d4ed8;
  --ts-wrapper-box-shadow: 0 4px 16px rgba(30, 64, 175, 0.2);
  --ts-wrapper-focus-border-color: #1e40af;
  --ts-wrapper-focus-box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.35), 0 6px 16px rgba(15, 23, 42, 0.18);
  --ts-input-text-color: #0f172a;
  --ts-input-placeholder-color: #64748b;
  --ts-button-background-color: #2563eb;
  --ts-button-background-color-hover: #1d4ed8;
  --ts-button-background-color-active: #1e3a8a;
  --ts-button-text-color: #ffffff;
  --ts-button-border-color: transparent;
  --ts-addon-background-color: #dbeafe;
  --ts-addon-text-color: #1d4ed8;
  --ts-vertical-button-background-color: #2563eb;
  --ts-vertical-button-background-color-hover: #1d4ed8;
  --ts-vertical-button-text-color: #ffffff;
  --ts-vertical-button-border-color: transparent;
}

.App h1 {
  color: #0b1120;
  margin-bottom: 2rem;
  font-size: 2.5rem;
}

.demo-section {
  margin: 2rem 0;
  padding: 1.5rem;
  border: 1px solid #cbd5f5;
  border-radius: 14px;
  background: #fdfcff;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 12px 28px rgba(15, 23, 42, 0.08);
}

.demo-section h2 {
  margin-bottom: 1rem;
  color: #1d4ed8;
  font-size: 1.35rem;
}

.demo-section p {
  margin-top: 1rem;
  color: #1e293b;
  font-weight: 500;
}

.ts-wrapper {
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.ts-wrapper:focus-within {
  transform: translateY(-1px);
}

.event-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}

.event-list li {
  padding: 0.5rem;
  margin: 0.25rem 0;
  border-radius: 6px;
  font-family: monospace;
  font-size: 0.9rem;
}

.event-list li.fired {
  background-color: #dcfce7;
  color: #166534;
  border: 1px solid #bbf7d0;
}

.event-list li.not-fired {
  background-color: #fef2f2;
  color: #991b1b;
  border: 1px solid #fecaca;
}

.reset-events-btn {
  background-color: #1d4ed8;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s ease;
}

.reset-events-btn:hover {
  background-color: #1e40af;
}

.method-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.5rem;
  margin-top: 1rem;
}

.method-buttons button {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background-color 0.2s ease;
}

.method-buttons button:hover {
  background-color: #2563eb;
}
</style>
