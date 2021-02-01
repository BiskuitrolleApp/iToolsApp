<template>
  <ion-page>
    <ion-toolbar>
      <ion-title>视频解析</ion-title>
    </ion-toolbar>
    <ion-content id="content">
      <iframe :src="myUrl" style="width: 100%; height: 50%;"> </iframe>
    </ion-content>
  </ion-page>
</template>
<script>
import { IonPage } from "@ionic/vue";
export default {
  components: { IonPage },
  data() {
    return {
      myUrl: "https://www.baidu.com",
    };
  },
};
</script>
