<template>
    <div>
        <div class="row">
            <div class="button grow no-break" v-on:click="inDetail = !inDetail">
                {{ inDetail ? "省略" : "详情" }}
            </div>
            <div class="button grow no-break" v-on:click="copy(obj)">
                CopyAll
            </div>
        </div>
        <div v-show="inDetail">
            <div
                v-for="(val, key) in obj"
                v-bind:key="key"
                class="message-pannel"
            >
                <div class="message-card no-break no-grow no-border">
                    <a>{{ key }}</a>
                </div>
                <div class="message-card no-grow no-border"><a>:</a></div>
                <div v-if="justshow(val)" class="grow">
                    <div class="row no-border no-margin">
                        <div class="message-card">
                            {{ JSON.stringify(val).substring(0, maxlength) }}
                        </div>
                        <div class="button" v-on:click="copy(val)">Copy</div>
                    </div>
                </div>
                <div v-else class="message-card">
                    <general-message-obj
                        v-bind:obj="val"
                        v-bind:maxlength="maxlength"
                        v-bind:foldLevel="foldLevel - 1"
                    />
                </div>
            </div>
        </div>
        <div v-show="!inDetail">
            {{ JSON.stringify(obj).substring(0, maxlength) }}...
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    name: "generalMessageObj",
    props: ["obj", "maxlength", "foldLevel"],
    data: function () {
        return {
            inDetail: this.foldLevel != 0
        };
    },
    methods: {
        justshow: function (obj) {
            // console.log(obj + " is " + !(obj instanceof Object));
            return !(obj instanceof Object);
        },
        isarray: function (obj) {
            return obj instanceof Array;
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
    }
});
</script>
