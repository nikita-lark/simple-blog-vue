<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary">
        <div class="md-toolbar-section-start">
          <router-link to="/">
            <md-button class="md-icon-button">
              <md-icon>arrow_back</md-icon>
            </md-button>
          </router-link>
          <span class="md-title">
            <span v-if="post.id">Edit</span><span v-else>Add</span>
            Post
          </span>
        </div>
        <div class="md-toolbar-section-end">
          <md-button v-on:click="save" class="md-primary">Save</md-button>
        </div>
      </md-app-toolbar>
      <md-app-content>
        <md-field>
          <label>The Title</label>
          <md-input v-model="post.title"></md-input>
          <span class="md-helper-text">Brevity is the soul of wit!</span>
        </md-field>
        <md-field>
          <md-textarea v-model="post.text"></md-textarea>
        </md-field>
      </md-app-content>
    </md-app>
    <md-snackbar md-position="center" :md-duration="4000" :md-active.sync="snackbar" md-persistent>
      <span>The post is saved successfully!</span>
    </md-snackbar>
  </div>
</template>

<style lang="scss" scoped>
  .md-app {
    max-height: 400px;
  }
  .md-card {
    margin-bottom: 20px;
  }
</style>

<script>
import axios from '../core/axios'

export default {

  data () {
    return {
      post: {},
      errors: [],
      snackbar: false
    }
  },

  created () {
    const id = this.$route.query.id
    if (id != null && id.trim() !== '') {
      axios
        .get(`/posts/${id}`)
        .then(res => {
          this.post = res.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  },

  methods: {
    save: function () {
      if (this.post.hasOwnProperty('id')) {
        axios
          .put(`/posts`, this.post)
          .then(res => {
            this.post = res.data
            this.snackbar = true
          })
          .catch(e => {
            this.errors.push(e)
          })
      } else {
        axios
          .post(`/posts`, this.post)
          .then(res => {
            this.post = res.data
            this.snackbar = true
          })
          .catch(e => {
            this.errors.push(e)
          })
      }
    }
  }
}

</script>
