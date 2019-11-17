<template>
  <div class="c-wrap">
    <div class="c-chat" ref="block">
      <message
        v-for="m in messages"
        :key="m.text"
        :name="m.name"
        :text="m.text"
        :owner="m.id === user.id"
      />
    </div>
    <div class="c-form">
      <chatForm />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import message from "@/components/Message";
import chatForm from "@/components/chatForm";
export default {
  components: {
    message,
    chatForm
  },
  middleware: ["chat"],
  head() {
    return {
      title: `Комната ${this.user.room}`
    };
  },
  computed: mapState(["user", "messages"]),
  watch: {
    messages() {
      setTimeout(() => {
        this.$refs.block.scrollTop = this.$refs.block.scrollHeight;
      }, 0);
    }
  }
};
</script>

<style>
.c-wrap {
  height: 100%;
  position: relative;
  overflow: hidden;
}

.c-form {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  height: 80px;
  background: #212121;
}

.c-chat {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 80px;
  padding: 1rem;
  overflow-y: auto;
}
</style>
