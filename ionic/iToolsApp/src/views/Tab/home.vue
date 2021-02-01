<template>
  <ion-page>
    <ion-toolbar>
      <!-- <ion-buttons>
        <ion-menu-button auto-hide="false"></ion-menu-button>
      </ion-buttons> -->
      <ion-title>主页</ion-title>
    </ion-toolbar>
    <!-- <ion-menu side="start" menu-id="first" content-id="main">
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
    </ion-menu> -->
    <!-- <ion-content> -->
    <ion-content id="content">
      <ion-grid>
        <ion-row
          class="pageList"
          v-for="(ritem, rindex) in views"
          :key="rindex"
        >
          <ion-list-header>
            <ion-label>{{ ritem.title }}</ion-label>
          </ion-list-header>
          <ion-col
            size="12"
            v-for="(citem, cindex) in ritem.list"
            :key="cindex"
          >
            <ion-card
              class="card card1"
              :disabled="citem.disabled"
              @click="jumbToView(citem.page)"
            >
              <img v-if="citem.bgi == ''" src="assets/icon/icon.png" />
              <img v-else :src="citem.bgi" />
              <ion-card-header>
                <ion-card-title>{{ citem.title }}</ion-card-title>
                <ion-card-subtitle>{{ citem.subTitle }}</ion-card-subtitle>
              </ion-card-header>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="returnTop">
          <ion-icon :icon="arrowUpOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  // IonMenu,
  IonPage,
  // IonHeader,
  IonToolbar,
  IonTitle,
  // IonMenuButton,
  // IonRouterOutlet,
  IonContent,
  // IonItem,
  // IonList,
  IonCol,
  IonGrid,
  IonRow,
  IonFab,
  IonFabButton,
  IonIcon,
  menuController,
} from "@ionic/vue";
import { arrowUpOutline } from "ionicons/icons";
import { defineComponent } from "vue";

import { views } from "@/assets/viewsList/viewsList";
import { useRouter } from "vue-router";
// import ExploreContainer from "@/components/ExploreContainer.vue";

export default defineComponent({
  name: "Tab1",
  components: {
    // IonMenu,
    // ExploreContainer,
    // IonHeader,
    IonToolbar,
    IonTitle,
    // IonMenuButton,
    // IonRouterOutlet,
    IonContent,
    IonPage,
    // IonItem,
    // IonList,

    IonCol,
    IonGrid,
    IonRow,

    IonFab,
    IonFabButton,
    IonIcon,
  },
  setup() {
    const router = useRouter();
    return {
      router,
      arrowUpOutline,
    };
  },
  data() {
    return {
      views,
    };
  },
  methods: {
    openFirst() {
      menuController.enable(true, "main");
      menuController.open("main");
    },
    returnTop() {
      //获取屏幕顶端一个标签的ID，例如它为top
      document.getElementById("content").scrollToTop(10);
    },
    jumbToView(page) {
      console.log("page", page);
      this.router.push(page);
    },
  },
});
</script>

<style scoped>
.pageList .card {
  height: 80px;
  width: 90%;
  display: inline-block;
  border-radius: 10px;
  margin: 0 4vw;
}
.pageList .card img {
  position: absolute;
  left: 0px;
  top: -80px;
  z-index: -1;
  width: 100% !important;
  opacity: 0.4;
  filter: alpha(opacity=40);
}
</style>
