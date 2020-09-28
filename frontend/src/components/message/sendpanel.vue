<template>
    <div class="pannel">
        <div class="edit-area">
            <div class="tool-pannel pannel">
                <a>消息类型选择</a>
                <verselect
                    v-bind:tabs="messagetypes"
                    v-bind:select="s => (messagetype = s)"
                />
            </div>
            <div class="tool-pannel pannel grow">
                <div>
                    <p><a>ContextID</a> <input v-model.trim="contextid" /></p>
                </div>
                <div class="custom-edit">
                    <edit-raw-message
                        v-show="messagetype === 0"
                        v-on:send="sendraw"
                        v-on:update="update"
                    />
                    <div v-show="messagetype === 1">
                        <p>ackmessage has no config</p>
                        <button
                            v-on:click="updatebody(undefined)"
                            class="save-btn"
                        >
                            Save
                        </button>
                    </div>
                    <!-- <editversionmessage
                        v-show="messagetype === 2"
                        v-on:send="sendmessage"
                        v-on:update="updatebody"
                    />
                    <edit-verify-message
                        v-show="messagetype === 3"
                        v-on:update="updatebody"
                    /> -->
                    <!-- <edit-judger-info-message
                        v-show="messagetype === 4"
                        v-on:send="sendmessage"
                        v-on:update="updatebody"
                    />
                    <edit-status-report-message
                        v-show="messagetype === 17"
                        v-on:send="sendmessage"
                        v-on:update="updatebody"
                    />
                    <edit-status-request-message
                        v-show="messagetype === 18"
                        v-on:send="sendmessage"
                        v-on:update="updatebody"
                    />
                    <edit-judge-request-message
                        v-show="messagetype === 33"
                        v-on:send="sendmessage"
                        v-on:update="updatebody"
                    /> -->
                    <schema-test
                        v-show="messagetype === 128"
                        v-bind:title="'格式测试'"
                        v-on:update="updatebody"
                    />
                </div>
                <div>
                    <button v-on:click="sendraw(message)" class="send-btn">
                        Send
                    </button>
                </div>
            </div>
            <div class="tool-pannel pannel" style="max-width: 25%">
                <div class="raw-view">
                    <p>{{ JSON.stringify(message) }}</p>
                </div>
                <div class="button no-grow no-break" v-on:click="copy(message)">
                    CopyAll
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import verselect from "../verselect.vue";
import editRawMessage from "./edit/editetrawmessage.vue";
// import editversionmessage from "./edit/editversionmesage.vue";
// import editVerifyMessage from "./edit/editVerifyMessage.vue";
// import editJudgerInfoMessage from "./edit/editJudgerInfoMessage.vue";
// import editStatusReportMessage from "./edit/editStatusReportMessage.vue";
// import editStatusRequestMessage from "./edit/editStatusRequestMessage.vue";
// import editJudgeRequestMessage from "./edit/editJudgeRequestMessage/editJudgeRequestMessage.vue";
import schemaTest from "./edit/editBySchemaComponents/schemaTest.vue";
export default Vue.extend({
    name: "sendpanel",
    props: ["connection", "send"],
    data: function () {
        return {
            messagetype: 0,
            contextid: 0,
            messagetypes: {
                raw: 0,
                ack: 1,
                // version: 2,
                // verify: 3,
                judgerinfo: 4,
                statusreport: 17,
                statusrequest: 18,
                judgeRequest: 33,
                judgeResult: 34,
                judgeState: 35,
                shutdown: 126,
                error: 127,
                schemaTest: 128
            },
            message: ""
        };
    },
    methods: {
        update: function (msg) {
            this.message = JSON.parse(msg);
        },
        updatebody: function (msg) {
            this.message = {
                contextID: this.contextid,
                type: this.messagetype,
                body:
                    msg !== undefined
                        ? JSON.parse(JSON.stringify(msg))
                        : undefined
            };
        },
        sendraw: function (rawmessage) {
            this.send(rawmessage);
        },
        sendmessage: function (body) {
            this.send({
                contextid: this.contextid,
                type: this.messagetype,
                body: body
            });
        },
        copy: function (obj) {
            let str = JSON.stringify(obj);
            console.log("try copy: " + str);
            const inputarea = document.createElement("input");
            inputarea.setAttribute("readonly", "readonly");
            inputarea.setAttribute("value", str);
            document.body.appendChild(inputarea);
            // inputarea.setSelectionRange(0, inputarea.value.length);
            inputarea.select();
            if (document.execCommand("copy")) {
                document.execCommand("copy");
                alert("复制了");
            }
            document.body.removeChild(inputarea);
        }
    },
    components: {
        verselect,
        editRawMessage,
        // editversionmessage,
        // editVerifyMessage,
        // editJudgerInfoMessage,
        // editStatusReportMessage,
        // editStatusRequestMessage,
        // editJudgeRequestMessage,
        schemaTest
    }
});
</script>
