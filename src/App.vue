<template>
  <div id="app" class="a-flex flex-column min-vh-100">
    <HeaderComponent />
    <div class="flex-grow-1 main">
      <div class="sbcomp">
          <div class="px-0 fixedSb">
            <SidebarComponent />
          </div>


        <div class="content-column">
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
* { box-sizing: border-box; }
body { margin: 0; }
#app { font-family: Avenir, Helvetica, Arial, sans-serif; }
.main { margin-top: 61px; }
.sbcomp { display: grid; grid-template-columns: 240px minmax(0, 1fr); }
.fixedSb { position: sticky; top: 61px; align-self: start; height: calc(100vh - 61px); overflow-y: auto; }
.content-column { min-width: 0; }
main { width: 100%; padding: 1.25rem; min-height: 80vh; }
header { position: fixed; left: 0; top: 0; width: 100%; z-index: 20; }
.table-responsive { overflow-x: auto; }
@media (max-width: 767px) {
  .sbcomp { grid-template-columns: minmax(0, 1fr); }
  .fixedSb { position: static; height: auto; }
  main { padding: .75rem; }
}
</style>
