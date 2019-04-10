<template>
  <div class="home">
    <br>
    <button @click="showMessageForm = !showMessageForm" class="btn btn-warning">Show from</button>
    <br><hr>
    <form v-if="showMessageForm" @submit.prevent="addMessage">
      <div>
        <label for="username">Username</label>
        <input
          v-model="message.username"
          type="text"
          class="form-control"
          id="username"
          placeholder="Enter Username"
        >
      </div>
      <div class="form-group">
        <label for="subject">Subject</label>
        <input
          v-model="message.subject"
          type="text"
          class="form-control"
          id="subject"
          placeholder="Enter a subject"
          required
        >
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <textarea v-model="message.message" class="form-control" id="message" rows="3"></textarea>
      </div>
      <div class="form-group">
        <label for="imgURL">image URL</label>
        <input
          v-model="message.imgURL"
          type="url"
          class="form-control"
          id="imgURL"
          placeholder="Enter Meme image url"
          required
        >
      </div>
      <button type="submit" class="btn btn-secondary">Add your Meme</button>
    </form>
    <br>
    <ul class="list-unstyled" v-for="message in reversedMessages" :key="message._id">
      <li class="media">
        <img v-if="message.imgURL" :src="message.imgURL" class="mr-3" :alt="message.subject">
        <div class="media-body">
          <h5 class="mt-0 mb-1">{{message.username}}</h5>
          <h4 class="mt-0 mb-1">{{message.subject}}</h4>
          {{message.message}}
          <br>
          <small>{{message.created}}</small>
        </div>
        <br>
      </li>
      <hr>
    </ul>
  </div>
</template>

<script>
const API_URL = 'http://localhost:8000/messages';

export default {
  name: 'home',
  data: () => ({
    showMessageForm: false,
    messages: [],
    message: {
      username: 'Anonymous',
      subject: '',
      message: '',
      imgURL: '',
    },
  }),
  mounted() {
    fetch(API_URL)
      .then(response => response.json())
      .then((result) => {
        this.messages = result;
      });
  },
  computed: {
    reversedMessages() {
      return this.messages.slice().reverse();
    },
  },
  methods: {
    addMessage() {
      console.log(this.message);
      fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(this.message),
        headers: {
          'content-type': 'application/json',
        },
      })
        .then(response => response.json())
        .then((result) => {
          this.messages.push(result);
        });
    },
  },
};
</script>

<style>
hr {
  border-top: 1px solid pink;
}
img {
  max-width: 300px;
}
</style>
