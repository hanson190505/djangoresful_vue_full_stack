<template>
  <div>
    <b-row>
      <b-col cols="3" v-for="(item, index) in data.results" :key="index">
        <nuxt-link :to="'/product/' + item.id">
          <b-card
            :title="item.name"
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
          >
            <b-card-text>
              {{ item.desc }}
            </b-card-text>
          </b-card>
        </nuxt-link>
      </b-col>
    </b-row>
    {{ data }}
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  layout(context) {
    return "child";
  },
  data: () => {
    return {
      product: []
    };
  },
  methods: {},
  async asyncData({ app }) {
    const data = await app.$axios.$get("http://127.0.0.1:8000/api/v1/product");
    return { data };
  }
});
</script>
