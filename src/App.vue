<template>
  <div id="app" class="a-flex flex-column min-vh-100">
    <HeaderComponent />
    <div class="flex-grow-1 main">
      <div class="sbcomp">
          <div class="px-0 fixedSb">
            <SidebarComponent />
          </div>


        <div class="col-12 col-md-9 col-lg-10">
          <main class="flex-grow-1">
            <RouterView />
          </main>
        </div>

      </div>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
  import HeaderComponent from './components/HeaderComponent.vue';
  import SidebarComponent from './components/SidebarComponent.vue';
  import FooterComponent from './components/FooterComponent.vue';


  export default {
    name: 'App',
    components: {
      HeaderComponent,
      FooterComponent,
      SidebarComponent
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
.fixedSb{
  position:fixed;
  left:0;
  min-height:100%;

}
main{
  width: 98vw;
  padding-left: 240px;
  min-height:80vh;
}
.main{
  margin-top: 61px;
  max-width: 100vw;
}
header{
  position:fixed;
  left:0;
  top:0;
  width: 100vw;
}
*{
  max-width: 100vw;
}
table{
  overflow: scroll;
}
</style>
