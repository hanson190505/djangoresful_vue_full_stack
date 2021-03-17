<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <div class="container">
        <b-navbar-brand href="/">NavBar</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="/product">Product </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
  </div>
</template>
