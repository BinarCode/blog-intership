<template>
  <div>
    <div>{{ $t('styleguide') }}!</div>
    <p class="text-red-300 font-bold">styleguide</p>

    <blogs-container>
      <base-card>
        <base-card-blog
          :img="{
          href: 'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
          }"

          :post="{
          link: '#',
          title: 'Lorem ipsum dolor',
          author: 'Alex Stefan',
          content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa, similique sequi cum eos quis dolorum.',
          tags: ['dolor', 'sit', 'amet'],
          views: 11
          }"

          :author="{
          name: 'Alex Stefan',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          }"
        />
      </base-card>
    </blogs-container>
  </div>
</template>

<script>
import BaseCard from "@/components/BaseCard";
import BaseCardBlog from "@/components/BaseCardBlog";
import BlogsContainer from "@/components/BlogsContainer";

export default {
  name: 'Styleguide',
  components: {
    BaseCard,
    BaseCardBlog,
    BlogsContainer
  }
}
</script>
