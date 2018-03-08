<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary">
        <div class="md-toolbar-section-start">
          <span class="md-title">Simple Blog Webapp</span>
        </div>
        <div class="md-toolbar-section-end">
          <router-link to="/add">
            <md-button class="md-primary">Add Post</md-button>
          </router-link>
        </div>
      </md-app-toolbar>
      <md-app-content>
        <div class="search">
          <md-field>
            <label>Advanced Search (by Terms)</label>
            <md-input v-on:input="debounceSearch"></md-input>
            <span class="md-helper-text">
              For partial search use "?" for a single character and "*" for any character sequence
            </span>
          </md-field>
        </div>
        <md-card v-for="(post, index) of posts" :key="post.id">
          <md-ripple>
            <md-card-header>
              <div class="md-title">{{post.title}}</div>
              <div class="md-subhead">by {{post.user.firstName}} {{post.user.lastName}}</div>
            </md-card-header>
            <md-card-content>
              {{post.text}}
            </md-card-content>
            <md-card-actions>
              <router-link :to="{ path: '/edit', query: { id: post.id }}">
                <md-button class="md-primary">Edit</md-button>
              </router-link>
              <md-button v-on:click="deletePost(index)" class="md-accent">Delete</md-button>
            </md-card-actions>
          </md-ripple>
        </md-card>
      </md-app-content>
    </md-app>
  </div>
</template>

<style lang="scss" scoped>
  .md-card {
    margin-bottom: 20px;
  }
  .search {
    padding: 20px;
  }
</style>

<script>
import axios from '../core/axios'
import debounce from 'debounce'

export default {

  data () {
    return {
      posts: [],
      errors: []
    }
  },

  created () {
    axios
      .get(`/posts?orderby=created_at_desc`)
      .then(res => {
        this.posts = res.data
      })
      .catch(e => {
        this.errors.push(e)
      })
  },

  methods: {

    debounceSearch: debounce(function (value) {
      axios
        .get(`/posts?search=${value.trim()}&orderby=created_at_desc`)
        .then(res => {
          this.posts = res.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    }, 300),

    deletePost: function (index) {
      axios
        .delete(`/posts/${this.posts[index].id}`)
        .then(res => {})
        .catch(e => {
          this.errors.push(e)
        })
      this.posts.splice(index, 1)
    }
  }
}

</script>
