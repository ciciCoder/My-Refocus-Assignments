/**
 * @typedef {Object} Ref
 * @property {unknown} value
 */

const arrayModifierMethods = Object.freeze([
  'push', // Adds one or more elements to the end of the array
  'pop', // Removes the last element from the array
  'shift', // Removes the first element from the array
  'unshift', // Adds one or more elements to the beginning of the array
  'splice',
])

const arrayNonModifierMethods = Object.freeze(['sort', 'find', 'findIndex'])

const { ref } = (function () {
  /**
   * Description
   * @param {unknown} value
   * @returns {function(Element): void}
   */
  function updateModels(value) {
    /**
     * Description
     * @param {Element} model
     * @returns {void}
     */
    return model => {
      if (model.hasAttribute('data-radio-group')) {
        /**@type {string} */
        const name = model.getAttribute('data-radio-group')
        /**@type {Array<HTMLInputElement>} */
        const radios = model.querySelectorAll(`input[type=radio][name=${name}]`)
        radios.forEach(radio => {
          radio.checked = false
          if (radio.checked && radio.value === value) return
          if (radio.value === value) radio.checked = true
          return
        })
        return
      }
      if (model.hasAttribute('data-checkbox-group')) {
        if (!Array.isArray(value))
          throw new Error('checkbox-group only accepts array as data-model')
        /**@type {number} */
        const size = Number(model.getAttribute('data-group-size') ?? 0)
        /**@type {Array<HTMLInputElement>} */
        const checkboxes = model.querySelectorAll('input[type=checkbox]')
        /**@type {unknown[]} */
        const tempVal = value
        if (tempVal.length > size && size) tempVal.pop()
        checkboxes.forEach(checkbox => {
          if (!tempVal.includes(checkbox.value))
            return (checkbox.checked = false)
          checkbox.checked = true
        })
        return
      }
      if (
        !(
          model instanceof HTMLInputElement ||
          model instanceof HTMLSelectElement
        )
      ) {
        /**@type {string|number} */
        const tempVal =
          typeof value === 'object' ? JSON.stringify(value) : value
        if (model.innerText === tempVal) return
        model.innerText = tempVal
        return
      }
      if (model.value === value) return
      model.value = value
    }
  }

  /**
   * Description
   * @param {Ref} proxy
   * @param {unknown} value
   * @returns {function(Element): void}
   */
  function initModels(proxy, value) {
    return model => {
      if (model instanceof HTMLSelectElement) {
        model.addEventListener('change', e => (proxy.value = e.target.value))
        model.value = value
        return
      }
      if (model instanceof HTMLInputElement) {
        model.addEventListener('keyup', e => (proxy.value = e.target.value))
        model.value = value
        return
      }
      if (model.hasAttribute('data-radio-group')) {
        const name = model.getAttribute('data-radio-group')
        const radios = model.querySelectorAll(`input[type=radio][name=${name}]`)
        radios.forEach(radio => {
          radio.addEventListener('change', function () {
            if (this.value === value) this.checked = true
            if (!this.checked) return
            /**@type {unknown} */
            const selectValue = this.value
            proxy.value = selectValue
          })
        })
        return
      }
      if (model.hasAttribute('data-checkbox-group')) {
        /**@type {number} */
        const size = Number(model.getAttribute('data-group-size') ?? 0)
        /**@type {Array<HTMLInputElement>} */
        const checkboxes = model.querySelectorAll('input[type=checkbox]')
        if (!Array.isArray(proxy.value)) proxy.value = []
        /**@type {unknown} */
        const tempVal = proxy.value
        if (tempVal.length > size && size) tempVal.pop()
        checkboxes.forEach(checkbox => {
          checkbox.addEventListener('change', e => {
            if (proxy.value.length >= size && size && checkbox.checked) {
              checkbox.checked = false
              return
            }
            if (checkbox.checked) {
              proxy.push(checkbox.value)
              return
            }
            const index = proxy.value.findIndex(item => item === checkbox.value)
            if (index < 0) return
            proxy.splice(index, 1)
          })
          checkbox.checked = false
          if (!tempVal.includes(checkbox.value))
            return (checkbox.checked = false)
          checkbox.checked = true
        })
        proxy.value = tempVal
        return
      }
      /**@type {string|number} */
      const tempVal = typeof value === 'object' ? JSON.stringify(value) : value
      model.innerText = tempVal
    }
  }

  return {
    /**
     * Description
     * @param {string} modelName
     * @param {any} value=null
     * @returns {Ref}
     * @example
     * <span data-model="testVar"></span>
     * <input type="text" data-model="testVar">
     * <script>
     *   const testVar = ref('testVar', 'default value');
     *   testVar.value = 'update all instances';
     * </script>
     */
    ref(modelName, value = null) {
      /**@type {Ref} */
      const holder = { value }
      const models = Array.from(
        document.querySelectorAll(`[data-model=${modelName}]`)
      )
      /**@type {ProxyHandler} */
      const proxyHandler = {
        get(target, prop) {
          if (arrayModifierMethods.includes(prop)) {
            return (...args) => {
              if (!Array.isArray(target.value)) return
              target.value[prop](...args)
              models.forEach(updateModels(target.value))
            }
          }
          if (arrayModifierMethods.includes(prop)) {
            return (...args) => {
              if (!Array.isArray(target)) return
              return target[prop].apply(target, args)
            }
          }
          return target[prop]
        },
        set(target, prop, value) {
          target[prop] = value
          models.forEach(updateModels(value))
        },
      }
      /**@type {Ref} */
      const proxy = new Proxy(holder, proxyHandler)
      models.forEach(initModels(proxy, value))
      return proxy
    },
  }
})()
