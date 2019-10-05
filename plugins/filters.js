import Vue from 'vue'

Vue.filter('shortenText', (text, maxLength = 300) => {
  debugger
  if (text && typeof text === 'string') {
    debugger
    const finalChar = text.length > maxLength ? '...' : ''

    return text.substr(0, maxLength) + finalChar
  }

  return ''
})
