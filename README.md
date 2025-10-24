# TouchSpin Vue

Vue adapter for TouchSpin numeric input spinner - A feature-rich, accessible number input component with increment/decrement buttons.

## Features

- Vue 3 Composition API - Modern Vue 3 with `<script setup>` support
- Touch & Mouse Support - Works on desktop and mobile devices
- Accessible - Full keyboard navigation and screen reader support
- TypeScript - Complete type definitions included
- Performance - Lightweight and fast
- Customizable - Extensive styling and behavior options
- Reactive & Imperative - Both declarative props and direct API control

## Installation

```bash
npm install @touchspin/vue @touchspin/core
# or
yarn add @touchspin/vue @touchspin/core
# or
pnpm add @touchspin/vue @touchspin/core
```

## Quick Start

```vue
<template>
  <TouchSpin
    v-model="value"
    :min="0"
    :max="100"
    :step="1"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TouchSpin from '@touchspin/vue/vanilla'
import '@touchspin/renderer-vanilla/css'

const value = ref(25)
</script>
```

## Available Renderers

Choose the renderer that matches your design system:

| Renderer | Import | CSS Import | Description |
|----------|--------|------------|-------------|
| **Vanilla** | `@touchspin/vue/vanilla` | `@touchspin/renderer-vanilla/css` | Clean, framework-free styling |

## API Reference

### Props

#### Value Management
```vue
<TouchSpin
  v-model="number"                   <!-- Current value -->
  :default-value="number"            <!-- Initial value (uncontrolled) -->
  @change="(value, meta) => void"    <!-- Value change handler -->
/>
```

#### Configuration
```vue
<TouchSpin
  :min="number"                      <!-- Minimum value -->
  :max="number"                      <!-- Maximum value -->
  :step="number"                     <!-- Increment/decrement step -->
  :decimals="number"                 <!-- Decimal places -->
  :prefix="'string'"                 <!-- Text before input -->
  :suffix="'string'"                 <!-- Text after input -->
/>
```

#### State & Behavior
```vue
<TouchSpin
  :disabled="boolean"                <!-- Disable input and buttons -->
  :read-only="boolean"               <!-- Make input read-only -->
/>
```

#### Form Integration
```vue
<TouchSpin
  name="string"                      <!-- Form field name -->
  id="string"                        <!-- Input element ID -->
/>
```

#### Styling
```vue
<TouchSpin
  class="string"                     <!-- Wrapper CSS class -->
  :input-class="'string'"             <!-- Input CSS class -->
/>
```

#### Events
```vue
<TouchSpin
  @blur="FocusEventHandler"          <!-- Input blur event -->
  @focus="FocusEventHandler"         <!-- Input focus event -->

  <!-- TouchSpin Events -->
  @on-min="() => void"                <!-- Fired at minimum boundary -->
  @on-max="() => void"                <!-- Fired at maximum boundary -->
  @on-start-spin="() => void"         <!-- Fired when spinning starts -->
  @on-stop-spin="() => void"          <!-- Fired when spinning stops -->
  @on-start-up-spin="() => void"      <!-- Fired when upward spinning starts -->
  @on-start-down-spin="() => void"    <!-- Fired when downward spinning starts -->
  @on-stop-up-spin="() => void"       <!-- Fired when upward spinning stops -->
  @on-stop-down-spin="() => void"     <!-- Fired when downward spinning stops -->
  @on-speed-change="() => void"       <!-- Fired when spin speed increases -->
/>
```

#### Advanced
```vue
<TouchSpin
  :core-options="object"             <!-- Advanced TouchSpin core options -->
  :input-props="object"              <!-- Pass-through props for input -->
  data-testid="string"               <!-- Test ID (input gets -input suffix) -->
/>
```

### Imperative API (ref)

For direct programmatic control, use a template ref:

```vue
<template>
  <div>
    <button @click="handleIncrement">+1</button>
    <TouchSpin ref="touchSpinRef" v-model="value" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TouchSpin from '@touchspin/vue/vanilla'
import type { TouchSpinHandle } from '@touchspin/vue/vanilla'

const touchSpinRef = ref<TouchSpinHandle>()
const value = ref(50)

const handleIncrement = () => {
  touchSpinRef.value?.increment()
}
</script>
```

#### TouchSpinHandle Methods

```ts
interface TouchSpinHandle {
  // Focus Management
  focus(): void;                    // Focus the input
  blur(): void;                     // Blur the input

  // Value Control
  increment(): void;                // Increment by step
  decrement(): void;                // Decrement by step
  getValue(): number;               // Get current value
  setValue(value: number): void;    // Set new value

  // Continuous Spinning
  startUpSpin(): void;              // Start continuous upward spinning
  startDownSpin(): void;            // Start continuous downward spinning
  stopSpin(): void;                 // Stop any continuous spinning

  // Configuration
  updateSettings(opts: Partial<TouchSpinCoreOptions>): void;
                                  // Update settings at runtime
}
```

## Usage Examples

### Basic Controlled Component

```vue
<template>
  <div>
    <TouchSpin
      v-model="value"
      :min="0"
      :max="100"
      :step="5"
    />
    <p>Value: {{ value }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TouchSpin from '@touchspin/vue/vanilla'

const value = ref(10)
</script>
```

### With Prefix/Suffix

```vue
<template>
  <TouchSpin
    v-model="price"
    :min="0"
    :max="1000"
    :step="0.01"
    :decimals="2"
    prefix="$"
    suffix=" USD"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TouchSpin from '@touchspin/vue/vanilla'

const price = ref(29.99)
</script>
```

### Event Handling

```vue
<template>
  <div>
    <TouchSpin
      v-model="value"
      :min="0"
      :max="100"
      @on-min="addEvent('Reached minimum')"
      @on-max="addEvent('Reached maximum')"
      @on-start-spin="addEvent('Spin started')"
      @on-stop-spin="addEvent('Spin stopped')"
    />

    <h3>Event Log:</h3>
    <ul>
      <li v-for="(event, i) in events" :key="i">{{ event }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TouchSpin from '@touchspin/vue/vanilla'

const value = ref(50)
const events = ref<string[]>([])

const addEvent = (eventName: string) => {
  events.value.push(`${new Date().toLocaleTimeString()}: ${eventName}`)
}
</script>
```

### Imperative Control

```vue
<template>
  <div>
    <div>
      <button @click="setValue42">Set to 42</button>
      <button @click="startSpinning">Start Spinning Up</button>
      <button @click="stopSpinning">Stop Spinning</button>
      <button @click="updateValue">Get Current Value</button>
    </div>

    <TouchSpin
      ref="touchSpinRef"
      v-model="value"
      :min="0"
      :max="100"
    />

    <p>Current value: {{ currentValue }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TouchSpin from '@touchspin/vue/vanilla'
import type { TouchSpinHandle } from '@touchspin/vue/vanilla'

const touchSpinRef = ref<TouchSpinHandle>()
const value = ref(25)
const currentValue = ref(0)

const setValue42 = () => {
  touchSpinRef.value?.setValue(42)
}

const startSpinning = () => {
  touchSpinRef.value?.startUpSpin()
}

const stopSpinning = () => {
  touchSpinRef.value?.stopSpin()
}

const updateValue = () => {
  currentValue.value = touchSpinRef.value?.getValue() ?? 0
}
</script>
```

### Form Integration

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <label>
      Quantity:
      <TouchSpin
        v-model="quantity"
        name="quantity"
        :min="1"
        :max="99"
      />
    </label>
    <button type="submit">Add to Cart</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TouchSpin from '@touchspin/vue/vanilla'

const quantity = ref(1)

const handleSubmit = () => {
  console.log('Quantity:', quantity.value)
}
</script>
```

## Advanced Configuration

### Custom Core Options

```vue
<template>
  <TouchSpin
    v-model="value"
    :min="0"
    :max="100"
    :step="1"
    :core-options="{
      verticalbuttons: true,
      buttonup_class: 'custom-up',
      buttondown_class: 'custom-down'
    }"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TouchSpin from '@touchspin/vue/vanilla'

const value = ref(50)
</script>
```

## Testing

```ts
import { mount } from '@vue/test-utils'
import TouchSpin from '@touchspin/vue/vanilla'

test('increments value', async () => {
  const wrapper = mount(TouchSpin, {
    props: {
      modelValue: 5,
      min: 0,
      max: 10
    }
  })

  const incrementBtn = wrapper.find('[data-touchspin-injected="up"]')
  await incrementBtn.trigger('click')

  expect(wrapper.vm.modelValue).toBe(6)
})
```

## Development

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build all packages
yarn build

# Run tests
yarn test
```

## Related Packages

### Core
- **@touchspin/core** - Core TouchSpin logic and API

### Renderers
- **@touchspin/renderer-vanilla** - Vanilla CSS renderer

### Adapters
- **@touchspin/angular** - Angular adapter
- **@touchspin/react** - React adapter
- **@touchspin/vue** - Vue adapter (this package)
- **@touchspin/jquery** - jQuery plugin
- **@touchspin/webcomponent** - Web Components
- **@touchspin/standalone** - Standalone bundle

## Contributing

Contributions welcome! Please see the [main TouchSpin repository](https://github.com/istvan-ujjmeszaros/touchspin) for [contribution guidelines](https://github.com/istvan-ujjmeszaros/touchspin/blob/main/CONTRIBUTING.md).

## License

MIT © Istvan Ujj-Meszaros
