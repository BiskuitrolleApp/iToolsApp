<template>
  <ion-page>
    <ion-toolbar>
      <ion-buttons>
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
    <!-- <ion-content> -->
    <ion-content style="height:310px">
      <div class="hot_content">
        <!-- <ion-card class="card card1">
          <img src="/assets/icon/icon.png" />
          <ion-card-header>
            <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
            <ion-card-title>Card Title</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            Keep close to Nature's heart... and break clear away, once in
            awhile, and climb a mountain or spe nd a week in the woods. Wash
            your spirit clean.
          </ion-card-content>
        </ion-card>

        <ion-card class="card card2">
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

        <ion-card class="card card3">
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
        </ion-card> -->
        <!-- <div class="card-back" id="cardBack">
          <div class="card"></div>
          <div class="card"></div>
          <div class="card"></div>
          <div class="card"></div>
          <div class="card"></div>
          <div class="card"></div>
          <div class="card"></div>
          <div class="card"></div>
          <div class="card"></div>
          <div class="card"></div>
        </div> -->
        <div class="card-frond" id="cardFrond">
          <ion-card class="card">
            <img src="/assets/icon/icon.png" />
            <ion-card-header>
              <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
              <ion-card-title>Card Title1111</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              Keep close to Nature's heart... and break clear away, once in
              awhile, and climb a mountain or spe nd a week in the woods. Wash
              your spirit clean.
            </ion-card-content>
          </ion-card>
          <ion-card class="card">
            <img src="/assets/icon/icon.png" />
            <ion-card-header>
              <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
              <ion-card-title>Card Title222</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              Keep close to Nature's heart... and break clear away, once in
              awhile, and climb a mountain or spe nd a week in the woods. Wash
              your spirit clean.
            </ion-card-content>
          </ion-card>
          <ion-card class="card">
            <img src="/assets/icon/icon.png" />
            <ion-card-header>
              <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
              <ion-card-title>Card Title333</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              Keep close to Nature's heart... and break clear away, once in
              awhile, and climb a mountain or spe nd a week in the woods. Wash
              your spirit clean.
            </ion-card-content>
          </ion-card>
          <ion-card class="card">
            <img src="/assets/icon/icon.png" />
            <ion-card-header>
              <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
              <ion-card-title>Card Title444</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              Keep close to Nature's heart... and break clear away, once in
              awhile, and climb a mountain or spe nd a week in the woods. Wash
              your spirit clean.
            </ion-card-content>
          </ion-card>
        </div>
      </div>
    </ion-content>
    <!-- </ion-content> -->
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
import { cardAnimate } from "@/assets/js/cardAnimate";
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
  mounted() {
    cardAnimate.init("cardFrond");
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
  position: relative;
  /* overflow-x: scroll; */
}
.card-frond {
  display: inline-flex;
  position: relative;
  left: 10%;
}
.card-back {
  display: inline-flex;
  position: absolute;
  top: 0;
  margin-top: 25px;
  left: -300%;
}
.card-back .card {
  width: 200px;
  height: 200px;
  background-color: rgba(145, 155, 172, 0.9);
  display: inline-block;
  margin: 0 8.4vw;
  border-radius: 8px;
}
.card-frond .card {
  width: 250px;
  height: 250px;
  display: inline-block;
  border-radius: 10px;
  margin: 0 4vw;
  display: inline-block;
}

.card-frond .card img {
  position: absolute;
  left: 0px;
  top: 100px;
  z-index: -1;
  width: 100% !important;
}
</style>
