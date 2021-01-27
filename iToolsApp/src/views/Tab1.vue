<template>
  <ion-page>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button auto-hide="false"></ion-menu-button>
      </ion-buttons>
      <ion-title>Standard</ion-title>
    </ion-toolbar>
    <ion-menu side="start" menu-id="first" content-id="main">
      <ion-header>
        <ion-toolbar translucent>
          <ion-title>菜单</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content id="main">
        <ion-list>
          <ion-item>Menu Item</ion-item>
          <ion-item>Menu Item</ion-item>
          <ion-item>Menu Item</ion-item>
          <ion-item>Menu Item</ion-item>
          <ion-item>Menu Item</ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>
    <ion-router-outlet id="main"></ion-router-outlet>
    <ion-content>
      <div class="hot_content">
        <ion-card class="card">
          <img src="/assets/icon/icon.png" />
          <ion-card-header>
            <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
            <ion-card-title>Card Title</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            Keep close to Nature's heart... and break clear away, once in
            awhile, and climb a mountain or spend a week in the woods. Wash your
            spirit clean.
          </ion-card-content>
        </ion-card>

        <ion-card class="card">
          <img src="/assets/icon/icon.png" />
          <ion-card-header>
            <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
            <ion-card-title>Card Title</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            Keep close to Nature's heart... and break clear away, once in
            awhile, and climb a mountain or spend a week in the woods. Wash your
            spirit clean.
          </ion-card-content>
        </ion-card>

        <ion-card class="card">
          <img src="/assets/icon/icon.png" />
          <ion-card-header>
            <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
            <ion-card-title>Card Title</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            Keep close to Nature's heart... and break clear away, once in
            awhile, and climb a mountain or spend a week in the woods. Wash your
            spirit clean.
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonMenu,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonMenuButton,
  IonRouterOutlet,
  IonContent,
  IonItem,
  IonList,
  menuController,
} from "@ionic/vue";
// import ExploreContainer from "@/components/ExploreContainer.vue";

export default {
  name: "Tab1",
  components: {
    IonMenu,
    // ExploreContainer,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonMenuButton,
    IonRouterOutlet,
    IonContent,
    IonPage,
    IonItem,
    IonList,
  },
  methods: {
    openFirst() {
      menuController.enable(true, "main");
      menuController.open("main");
    },
  },
};
</script>

<style scoped>
.hot_content {
  height: 310px;
  width: 100vh;
  overflow: scroll;
}
.hot_content .card {
  width: 250px;
  height: 250px;
  border-radius: 10px;
  display: inline-block;
}
.hot_content .card1 {
  height: 220px;
  position: absolute;
  left: 0px;
  top: 15px;
}
.hot_content .card2 {
  position: absolute;
  left: 50%;
  z-index: 2;
  margin-left: -125px;
}
.hot_content .card3 {
  height: 220px;
  position: absolute;
  right: 0px;
  top: 15px;
}
.hot_content .card img {
  position: absolute;
  left: 0px;
  top: 100px;
  z-index: -1;
  width: 100% !important;
}
</style>
