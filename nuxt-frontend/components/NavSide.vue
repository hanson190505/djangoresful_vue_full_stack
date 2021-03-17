<template>
  <div class="accordion" role="tablist">
    <b-button block v-b-toggle.accordion-1 variant="outline-info" href="product"
      >Product</b-button
    >
    <b-collapse
      id="accordion-1"
      visible
      accordion="my-accordion"
      role="tabpanel"
    >
      <b-list-group>
        <b-list-group-item href="#some-link">Awesome link</b-list-group-item>
        <b-list-group-item href="#" active
          >Link with active state</b-list-group-item
        >
        <b-list-group-item href="#">Action links are easy</b-list-group-item>
        <b-list-group-item href="#foobar" disabled
          >Disabled link</b-list-group-item
        >
      </b-list-group>
    </b-collapse>
    <b-button block v-b-toggle.accordion-2 variant="outline-info"
      >Accordion 1</b-button
    >
    <b-collapse
      id="accordion-2"
      visible
      accordion="my-accordion"
      role="tabpanel"
    >
      <b-list-group>
        <b-list-group-item href="#some-link">Awesome link</b-list-group-item>
        <b-list-group-item href="#" active
          >Link with active state</b-list-group-item
        >
        <b-list-group-item href="#">Action links are easy</b-list-group-item>
        <b-list-group-item href="#foobar" disabled
          >Disabled link</b-list-group-item
        >
      </b-list-group>
    </b-collapse>
  </div>
</template>
