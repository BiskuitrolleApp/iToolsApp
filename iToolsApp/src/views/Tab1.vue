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
    <!-- <ion-content :fullscreen="true"> -->
    <!-- <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header> -->

    <!-- <ExploreContainer name="Tab 1 page" />
    </ion-content> -->
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
