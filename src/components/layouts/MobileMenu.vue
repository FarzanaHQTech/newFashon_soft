<template>
  <ul class="navbar-nav nav_mobile">
    <!-- <li><i class="fa fa-close" style="font-size: 30px;"></i></li> -->

    <li class="nav-item">
      <RouterLink to="/" class="nav-link active">Home</RouterLink>
    </li>
    <li class="nav-item">
      <RouterLink to="/shop" class="nav-link">SHOP PRODUCT</RouterLink>
    </li>
    <li class="nav-item">
      <RouterLink to="/new-product" class="nav-link">NEW PRODUCT</RouterLink>
    </li>
    <li class="nav-item">
      <RouterLink to="/flash-sell" class="nav-link">FLASH SELL</RouterLink>
    </li>

    <li
      v-for="cat in cats"
      :key="cat.id"
      class="nav-item"
      :class="{ has_menu: cat.sub_categories && cat.sub_categories.length }"
    >
      <RouterLink :to="`/shop?cat_id=${cat.id}`" class="nav-link">
        {{ cat.name }}
      </RouterLink>

      <ul v-if="cat.sub_categories && cat.sub_categories.length" class="inner_menu">
        <li
          v-for="sub in cat.sub_categories"
          :key="sub.id"
          class="nav-item"
        >
          <RouterLink
            :to="`/shop?cat_id=${cat.id}&sub_cat_id=${sub.id}`"
            class="nav-link"
          >
            {{ sub.name }}
          </RouterLink>

          <ul v-if="sub.sub_categories && sub.sub_categories.length" class="inner_menu_child">
            <li
              v-for="child in sub.sub_categories"
              :key="child.id"
              class="nav-item"
              :class="{ has_child_menu: sub.sub_categories.length }"
              style="padding: 5px 0px;"
            >
              <RouterLink
                :to="`/shop?cat_id=${cat.id}&sub_cat_id=${sub.id}&child_cat_id=${child.id}`"
                class="nav-link"
              >
                {{ child.name }}
              </RouterLink>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</template>

<style scoped>
.nav_mobile {
  max-height: calc(100vh - 86px);
  overflow-y: auto;
}
</style>
