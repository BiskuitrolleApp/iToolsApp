<template>
  <ion-page>
    <ion-toolbar>
      <ion-title>添加新链接</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="cancelNewUrl">
          取消
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
    <ion-content id="content">
      <ion-item class="videoAddressInput">
        <ion-label position="stacked">链接源</ion-label>
        <ion-input
          :value="linkList"
          clearInput="true"
          @ionChange="linkList = $event.target.value"
        ></ion-input>
      </ion-item>
      <ion-button
        expand="block"
        @click="getRealLinkList"
        class="videoAddressBtn"
        >开始解析</ion-button
      >
    </ion-content>
  </ion-page>
</template>
<script>
import { IonPage, IonContent, modalController } from "@ionic/vue";
import baseCode from "../../api/baseCode";

export default {
  components: { IonPage, IonContent },
  data() {
    return {
      //   linkList: "",
      linkList:
        "eyd0ZXN0MSc6J2h0dHA6Ly8xOTIuMTY4LjEwLjEwJywndGVzdDEyJzonaHR0cDovLzE5Mi4xNjguMTAuMTA6ODA4MjAvMTIzJjMxMzIyMTIhQCMjJCVeJiooKSd9",
    };
  },
  methods: {
    getRealLinkList() {
      var base = new baseCode();
      var result2 = base.decode(this.linkList);
      console.log(result2);

      // modalController.dismiss();
    },
    cancelNewUrl() {
      this.linkList = "";
      modalController.dismiss();
    },
  },
};
</script>
<style>
.videoAddressInput {
  height: 90px;
  width: 80vw;
  margin: 0 auto;
}
.videoAddressBtn {
  width: 60vw;
  margin: 0 auto;
}
</style>
