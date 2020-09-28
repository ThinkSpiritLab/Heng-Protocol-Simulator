<template>
    <div class="message-pannel">
        <div class="message-card no-grow">
            <div class="message-card no-grow no-break">
                <a>ContextID : {{ message.contextID }}</a>
            </div>
            <div class="message-card no-grow no-break">
                <a>Type : {{ messageType }}</a>
            </div>
            <div class="message-card no-grow button no-break">
                <div v-on:click="showRaw = !showRaw">
                    切换原始信息显示
                </div>
            </div>
            <div class="message-card raw-view-f" v-if="showRaw">
                {{ JSON.stringify(message) }}
            </div>
        </div>
        <div class="message-card">
            <ackmessage v-if="message.type === 1" v-bind:message="message" />
            <!-- <verify-message
                v-else-if="message.type === 3"
                v-bind:message="message"
            /> -->
            <general-message
                v-else
                v-bind:message="message"
                v-bind:maxlength="50"
            />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import ackmessage from "./view/ackmessage.vue";
// import verifyMessage from "./view/VerifyMessage.vue";
import GeneralMessage from "./view/GeneralMessage.vue";
export default Vue.extend({
    name: "basicmessage",
    props: ["message"],
    data: function () {
        return { showRaw: false };
    },
    computed: {
        messageType: function () {
            const types = {
                1: "Ack",
                // 2: "Version",
                // 3: "Verify",
                4: "JudgerInfo",
                17: "StatusReport",
                18: "StatusRequest",
                33: "JudgeRequest",
                34: "JudgeResult",
                35: "JudegState",
                126: "Shutdown",
                127: "Error"
            };
            if (
                this.message.type != undefined &&
                types[this.message.type] != undefined
            ) {
                return types[this.message.type];
            } else {
                return "Unknown";
            }
        }
    },
    components: { ackmessage, /*verifyMessage,*/ GeneralMessage }
});
</script>
