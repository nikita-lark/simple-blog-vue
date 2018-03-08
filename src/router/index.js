import Vue from 'vue'
import Router from 'vue-router'
import Feed from '@/components/Feed'
import EditPost from '@/components/EditPost'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'feed',
      component: Feed
    },
    {
      path: '/edit',
      name: 'editPost',
      component: EditPost
    },
    {
      path: '/add',
      name: 'addPost',
      component: EditPost
    }
  ]
})
