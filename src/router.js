import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Item from './components/Item.vue'

Vue.use(Router)
export function createRouter () {
    return new Router({
        mode: 'history',
        routes: [
            // 异步路由组件的路由配置
            { path: '/', component: Home },
            { path: '/item/:id', component: Item }
        ]
    })
}