const { TextEncoder, TextDecoder } = require('util')

// Polyfill for TextEncoder/TextDecoder which are not available in jsdom
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Polyfill for Request which is not available in Node.js test environment
global.Request = class Request {
  constructor(input, init = {}) {
    this.url = typeof input === 'string' ? input : input.url
    this.method = init.method || 'GET'
    this.headers = new Map(Object.entries(init.headers || {}))
    this.body = init.body
  }
}

// Polyfill for Response if needed
global.Response = class Response {
  constructor(body, init = {}) {
    this.body = body
    this.status = init.status || 200
    this.statusText = init.statusText || 'OK'
    this.headers = new Map(Object.entries(init.headers || {}))
    this.ok = this.status >= 200 && this.status < 300
  }
  
  json() {
    return Promise.resolve(JSON.parse(this.body || '{}'))
  }
  
  text() {
    return Promise.resolve(this.body || '')
  }
}

// Simple fetch mock for tests
if (!global.fetch) {
  global.fetch = jest.fn(() =>
    Promise.resolve(new global.Response('{}', { status: 200 }))
  )
}