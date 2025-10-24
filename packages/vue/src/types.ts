/**
 * @touchspin/vue - TypeScript Types
 */

import type { TouchSpinCoreOptions } from '@touchspin/core';

export type { TouchSpinCoreOptions };

/**
 * Metadata passed to change handler
 */
export interface TouchSpinChangeMeta {
  source: 'user' | 'prop' | 'api';
  action?: 'increment' | 'decrement' | 'setValue' | 'input';
}

/**
 * TouchSpin Vue component props
 */
export interface TouchSpinProps {
  // Value management
  modelValue?: number;
  defaultValue?: number;

  // Core settings
  min?: number;
  max?: number;
  step?: number;
  decimals?: number;

  // Display
  prefix?: string;
  suffix?: string;

  // State
  disabled?: boolean;
  readOnly?: boolean;

  // Form integration
  name?: string;
  id?: string;

  // Styling
  class?: string;
  inputClass?: string;

  // Pass-through props for inner input
  inputProps?: Record<string, any>;

  // Test ID (input will be suffixed with -input)
  dataTestid?: string;

  // Advanced TouchSpin core options (optional)
  coreOptions?: Partial<Omit<TouchSpinCoreOptions, 'renderer'>>;
}

/**
 * TouchSpin Vue component emits
 */
export interface TouchSpinEmits {
  'update:modelValue': [value: number];
  change: [value: number, meta: TouchSpinChangeMeta];
  blur: [event: FocusEvent];
  focus: [event: FocusEvent];
  onMin: [];
  onMax: [];
  onStartSpin: [];
  onStopSpin: [];
  onStartUpSpin: [];
  onStartDownSpin: [];
  onStopUpSpin: [];
  onStopDownSpin: [];
  onSpeedChange: [];
}

/**
 * Imperative handle API exposed via defineExpose
 */
export interface TouchSpinHandle {
  focus(): void;
  blur(): void;
  increment(): void;
  decrement(): void;
  getValue(): number;
  setValue(value: number): void;
  startUpSpin(): void;
  startDownSpin(): void;
  stopSpin(): void;
  updateSettings(opts: Partial<TouchSpinCoreOptions>): void;
}
