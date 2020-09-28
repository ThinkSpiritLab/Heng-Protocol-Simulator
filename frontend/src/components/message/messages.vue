<template>
    <div class="message-pannel">
        <div class="msg-select">
            <p>ContextID</p>
            <verselect
                v-bind:tabs="Object.keys(messages)"
                v-bind:select="s => (curid = s)"
            />
        </div>
        <div
            v-for="(group, id) in messages"
            class="msg-dis card"
            v-bind:key="id"
            v-show="id == curid"
        >
            <div
                v-for="(msg, index) in messages[id]"
                v-bind:key="index"
                class="message-card card"
            >
                <basicmessage v-bind:message="msg" />
            </div>
        </div>
        <!-- <p>{{ JSON.stringify(messages) }}</p> -->
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import basicmessage from "./basicmessage.vue";
import verselect from "../verselect.vue";
export default Vue.extend({
    name: "messages",
    props: ["messages"],
    data: function () {
        return {
            curid: "other"
        };
    },
    components: { verselect, basicmessage }
});
</script>