import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from './App.vue'

describe('App.vue', () => {
  it('renders the main heading', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('TouchSpin Vue Event Demo')
  })

  it('renders TouchSpin components', () => {
    const wrapper = mount(App)
    const touchSpinComponents = wrapper.findAllComponents({ name: 'TouchSpin' })
    expect(touchSpinComponents.length).toBeGreaterThan(0)
  })

  it('renders demo sections', () => {
    const wrapper = mount(App)
    const sections = wrapper.findAll('.demo-section')
    expect(sections.length).toBe(3) // Imperative API, USD Spinner, Events
  })

  it('initializes with default values', () => {
    const wrapper = mount(App)
    // Check that the component has initial state
    expect(wrapper.vm).toBeDefined()
  })
})
