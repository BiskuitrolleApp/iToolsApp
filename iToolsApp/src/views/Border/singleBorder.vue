<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons>
          <ion-back-button text="返回"></ion-back-button>
        </ion-buttons>
        <ion-title>单独边框</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content id="content">
      <div></div>
    </ion-content>
  </ion-page>
</template>
<script>
import { IonPage, IonButtons, IonHeader, IonBackButton } from "@ionic/vue";
export default {
  components: {
    IonPage,
    IonButtons,

    IonHeader,
    IonBackButton,
  },
};
</script>
