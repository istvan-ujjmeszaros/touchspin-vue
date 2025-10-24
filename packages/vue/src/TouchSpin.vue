<template>
  <div :class="$props.class">
    <input
      ref="inputRef"
      v-bind="inputProps"
      :class="inputClass"
      :name="name"
      :id="id"
      :disabled="disabled"
      :readonly="readOnly"
      :data-testid="dataTestid ? `${dataTestid}-input` : undefined"
      @blur="handleBlur"
      @focus="handleFocus"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { TouchSpin as TouchSpinCore } from '@touchspin/core'
import { VanillaRenderer } from '@touchspin/renderer-vanilla'
import type { TouchSpinProps, TouchSpinEmits, TouchSpinHandle, TouchSpinChangeMeta, TouchSpinCoreOptions } from './types'

const props = withDefaults(defineProps<TouchSpinProps>(), {
  defaultValue: 0,
})

const emit = defineEmits<TouchSpinEmits>()

const model = defineModel<number>()

const inputRef = ref<HTMLInputElement>()

let instance: ReturnType<typeof TouchSpinCore> | null = null

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

// Cleanup function to be called on unmount
let cleanup: (() => void) | null = null

onMounted(async () => {
  await nextTick()
  if (!inputRef.value) return

  const input = inputRef.value
  input.value = String(model.value ?? props.defaultValue ?? 0)

  const initOptions: Record<string, any> = { renderer: VanillaRenderer }
  if (props.min !== undefined) initOptions.min = props.min
  if (props.max !== undefined) initOptions.max = props.max
  if (props.step !== undefined) initOptions.step = props.step
  if (props.decimals !== undefined) initOptions.decimals = props.decimals
  if (props.prefix !== undefined) initOptions.prefix = props.prefix
  if (props.suffix !== undefined) initOptions.postfix = props.suffix
  if (props.coreOptions) Object.assign(initOptions, props.coreOptions)

  instance = TouchSpinCore(input, initOptions)

  // Subscribe to changes
  const handleChange = () => {
    const numValue = Number(input.value)
    emit('update:modelValue', numValue)
    emit('change', numValue, { source: 'user', action: 'input' })
  }

  input.addEventListener('change', handleChange)

  // TouchSpin events
  const eventHandlers = [
    { event: 'touchspin.on.min', handler: () => emit('onMin') },
    { event: 'touchspin.on.max', handler: () => emit('onMax') },
    { event: 'touchspin.on.startspin', handler: () => emit('onStartSpin') },
    { event: 'touchspin.on.stopspin', handler: () => emit('onStopSpin') },
    { event: 'touchspin.on.startupspin', handler: () => emit('onStartUpSpin') },
    { event: 'touchspin.on.startdownspin', handler: () => emit('onStartDownSpin') },
    { event: 'touchspin.on.stopupspin', handler: () => emit('onStopUpSpin') },
    { event: 'touchspin.on.stopdownspin', handler: () => emit('onStopDownSpin') },
    { event: 'touchspin.on.speedchange', handler: () => emit('onSpeedChange') },
  ]

  eventHandlers.forEach(({ event, handler }) => {
    input.addEventListener(event, handler)
  })

  // Set up cleanup function
  cleanup = () => {
    input.removeEventListener('change', handleChange)
    eventHandlers.forEach(({ event, handler }) => {
      input.removeEventListener(event, handler)
    })
    instance?.destroy()
    instance = null
  }
})

onUnmounted(() => {
  if (cleanup) {
    cleanup()
  }
})

// Update value when model changes
watch(model, (newVal) => {
  if (instance && newVal !== undefined) {
    instance.setValue(newVal)
  }
})

// Update settings when props change
watch([() => props.min, () => props.max, () => props.step, () => props.decimals, () => props.prefix, () => props.suffix], () => {
  if (!instance) return
  const updateOptions: Record<string, any> = {}
  if (props.min !== undefined) updateOptions.min = props.min
  if (props.max !== undefined) updateOptions.max = props.max
  if (props.step !== undefined) updateOptions.step = props.step
  if (props.decimals !== undefined) updateOptions.decimals = props.decimals
  if (props.prefix !== undefined) updateOptions.prefix = props.prefix
  if (props.suffix !== undefined) updateOptions.postfix = props.suffix
  instance.updateSettings(updateOptions)
})

// Update disabled/readonly
watch([() => props.disabled, () => props.readOnly], () => {
  if (!inputRef.value) return
  if (props.disabled !== undefined) inputRef.value.disabled = props.disabled
  if (props.readOnly !== undefined) inputRef.value.readOnly = props.readOnly
})

const handle: TouchSpinHandle = {
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  increment: () => instance?.upOnce(),
  decrement: () => instance?.downOnce(),
  getValue: () => instance?.getValue() ?? 0,
  setValue: (value: number) => {
    instance?.setValue(value)
    emit('update:modelValue', value)
    emit('change', value, { source: 'api', action: 'setValue' })
  },
  startUpSpin: () => instance?.startUpSpin(),
  startDownSpin: () => instance?.startDownSpin(),
  stopSpin: () => instance?.stopSpin(),
  updateSettings: (opts: Partial<TouchSpinCoreOptions>) => instance?.updateSettings(opts),
}

defineExpose(handle)
</script>
