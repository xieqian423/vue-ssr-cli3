import { createApp } from './app'

const { app, router, store } = createApp()

if (window._INITIAL_STATE_) {
  store.replaceState(window._INITIAL_STATE_)
}

// window.__INITIAL_STATE__
// 客户端拿到了预取的数据，然后去存到客户端的vuex中，这也就是大家经常谈论的通过vuex实现前后端的状态共享

router.onReady(() => {
  app.$mount('#app')
})
