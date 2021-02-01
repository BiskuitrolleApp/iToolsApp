<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons>
          <ion-back-button text="返回"></ion-back-button>
        </ion-buttons>
        <ion-title>视频解析</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content id="content" fullscreen="true">
      <ion-item class="videoAddressInput">
        <ion-label position="floating">视频链接</ion-label>
        <ion-input
          :value="address"
          clearInput="true"
          @ionChange="address = $event.target.value"
        ></ion-input>
      </ion-item>
      <ion-button expand="block" @click="jumpToUrl" class="videoAddressBtn"
        >开始解析</ion-button
      >
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="getLinkList">
          <ion-icon :icon="paperPlaneOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>
<script>
import {
  IonPage,
  IonContent,
  IonButton,
  IonButtons,
  IonLabel,
  IonInput,
  IonItem,
  IonHeader,
  IonBackButton,
  IonFab,
  IonFabButton,
  IonIcon,
  modalController,
} from "@ionic/vue";
import { paperPlaneOutline } from "ionicons/icons";
import AddUrl from "./addUrl.vue";
export default {
  created() {
    // 从路由里动态获取 url地址   具体地址看libs下util.js里的 backendMenuToRoute  方法
    this.reportUrl = this.$route.meta.pathUrl;
  },
  setup() {
    return {
      paperPlaneOutline,
    };
  },
  components: {
    IonPage,
    IonContent,
    IonHeader,
    IonButtons,
    IonButton,
    IonLabel,
    IonInput,
    IonItem,
    IonBackButton,
    IonFab,
    IonFabButton,
    IonIcon,
  },
  data() {
    return {
      address: "",
      modal: null,
    };
  },
  methods: {
    jumpToUrl() {
      console.log("address :>> ", this.address);
    },
    async getLinkList() {
      const modal = await modalController.create({
        component: AddUrl,
        cssClass: "my-custom-class",
        componentProps: {
          title: "New Title",
        },
      });
      return modal.present();
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
  width: 80vw;
  margin: 0 auto;
}
</style>
