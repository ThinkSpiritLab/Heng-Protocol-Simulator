<template>
    <div>
        <div class="column grow">
            <h1>评测端模拟</h1>
            <!-- <button
            v-for="tab in tabs"
            v-bind:key="tab"
            v-bind:class="['tab-button', { active: activetab === tab }]"
            v-on:click="activetab = tab"
        >{{ tab }}</button>-->
            <tabselect
                v-bind:tabs="tabs"
                v-bind:select="s => (activetab = s)"
            />
            <div v-show="activetab === 'scoketmessage'" class="tab">
                <div class="edit-pannel">
                    <tabselect
                        v-bind:tabs="messages.tabs"
                        v-bind:select="s => (messages.curtab = s)"
                    />
                    <div v-show="messages.curtab === 'new'">
                        <sendpanel
                            v-bind:connection="connection"
                            v-bind:send="msg => send(msg)"
                        />
                    </div>
                    <div v-show="messages.curtab === 'send'">
                        <messages v-bind:messages="messages.send" />
                        <!-- <p>{{ JSON.stringify(messages.send) }}</p> -->
                    </div>
                    <div v-show="messages.curtab === 'received'">
                        <messages v-bind:messages="messages.received" />
                        <!-- <p>{{ JSON.stringify(messages.received) }}</p> -->
                    </div>
                </div>
            </div>
            <div v-show="activetab === 'server'" class="tab">
                <div class="edit-pannel">
                    <div class="edit-pannel">
                        <p>服务器连接面板</p>
                        <p>
                            <a>服务器</a>
                            <input
                                v-model.trim="server"
                                placeholder="0.0.0.0"
                            />
                        </p>
                        <p>
                            <a>端口</a>
                            <input v-model.number="port" placeholder="8080" />
                        </p>
                        <p>
                            <a>Token</a>
                            <input
                                v-model.trim="token"
                                placeholder="It's a Secret"
                            />
                        </p>
                    </div>
                    <div class="edit-area">
                        <div class="edit-pannel">
                            <edit-by-schema
                                v-bind:schema="{
                                    type: 'object',
                                    properties: {
                                        maxTaskCount: { type: 'number' },
                                        coreCount: { type: 'number' },
                                        name: { type: 'string' },
                                        software: { type: 'string' }
                                    }
                                }"
                                v-bind:title="'注册参数'"
                                v-bind:value="judger"
                                v-on:update="val => (judger = val)"
                            />
                        </div>
                        <httpSigTool />
                    </div>
                    <div class="edit-row">
                        <button v-on:click="connect">连接</button>
                        <button v-on:click="connection.close()">断开</button>
                    </div>
                    <p v-if="connection != undefined">
                        {{ connection.readyState }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import tabselect from "../tabselect.vue";
import messages from "../message/messages.vue";
import sendpanel from "../message/sendpanel.vue";
import editBySchema from "../util/editBySchemaCore/editBySchema.vue";
import httpSigTool from "../util/httpSigTool/httpSigTool.vue";
export default Vue.extend({
    name: "judgersimulator",
    data: function () {
        return {
            connection: null,
            connected: false,
            activetab: "server",
            tabs: ["server", "scoketmessage"],
            server: "echo.websocket.org",
            port: 80,
            token: "",
            judger: { maxTaskCount: 4 },
            messages: {
                curtab: "new",
                tabs: ["new", "send", "received"],
                send: {
                    other: []
                },
                received: {
                    other: []
                }
            }
        };
    },
    methods: {
        connect: function () {
            let url = "ws://" + this.server + ":" + this.port;
            let that = this;
            console.log("connecting to " + url);
            this.connection = new WebSocket(url);
            this.connection.onopen = function () {
                alert("connection opened");
            };
            this.connection.onclose = function () {
                alert("connection closed");
            };
            this.connection.onmessage = function (msg) {
                let str = msg.data;
                console.log(str);
                let data = JSON.parse(str);
                if (data.contextID != undefined) {
                    if (that.messages.received[data.contextID] === undefined) {
                        // that.messages.received[data.contextID] = new Array();
                        Vue.set(
                            that.messages.received,
                            data.contextID,
                            new Array()
                        );
                    }
                    that.messages.received[data.contextID].push(data);
                } else {
                    that.messages.received.other.push(data);
                }
            };
            this.connection.onerror = function (e) {
                alert("Error: " + JSON.stringify(e));
            };
        },
        send: function (msg) {
            let data = msg;
            if (data.contextID != undefined) {
                if (this.messages.send[data.contextID] === undefined) {
                    // this.messages.send[data.contextID] = new Array();
                    Vue.set(this.messages.send, data.contextID, new Array());
                }
                this.messages.send[data.contextID].push(data);
            } else {
                this.messages.send.other.push(data);
            }
            let str = JSON.stringify(msg);
            if (this.connection != undefined) {
                console.log("send" + str);
                this.connection.send(str);
            } else {
                alert("not connected!");
                console.log("not connected when send " + str);
            }
        }
    },
    components: {
        tabselect,
        messages,
        sendpanel,
        editBySchema,
        httpSigTool
    }
});
</script>
