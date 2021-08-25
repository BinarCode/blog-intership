<template>
<div class="p-20">
  <div class="buttonstyle">
  <h1 class="text-5xl font-bold my-4">BaseButtonStyles</h1>
  <base-button-styles></base-button-styles>
  </div>

  <h1 class="text-5xl font-bold my-4">BaseCard Styles</h1>
  <div class="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none print:grid-cols-2">
    <base-card
      v-for="post in posts"
      :post="post"
      :key="post.id"
    />
  </div>
  
  <h1 class="text-5xl font-bold my-7">BaseInput Styles</h1>
  <input-comp />

  <h1 class="text-5xl font-bold my-7">Tiptap Editor Preview</h1>
  <tiptap-editor :value="tiptapContent" v-model="tiptapContent" @input="onInput"/>
  </div>
</template>

<script>
import BaseButtonStyles from '@/components/styles/BaseButtonStyles.vue'
import BaseCard from '@/components/BaseCard';
import InputComp from '@/views/InputComp.vue';
import TiptapEditor from '@/components/TiptapEditor';

export default {
  name: 'Styleguide',
  components: {
    BaseCard,
    InputComp,
    BaseButtonStyles,
    TiptapEditor
  },
  data() {
    return {
      tiptapContent: '<p>Some initial content here. <strong>This is bold</strong>. <em>This is italic</em>. <s>This is strike</s>. <u>This is underline</u>. <code class="rounded px-1 text-gray-900 bg-gray-300">This is code</code>. <strong><em><s><u>This is a combination of the first 4</u></s></em></strong>.&nbsp;<a target="_blank" rel="noopener noreferrer nofollow" class="text-blue-400 cursor-pointer hover:underline" href="http://www.google.com/">This is a link to google.com</a>. The next one is an image:</p><p></p><p></p><img src="https://thumbs.dreamstime.com/b/trees-foliage-colors-autumn-fence-rural-peisage-hills-120859715.jpg"><p></p><p>Align left (default)</p><p style="text-align: center">Align center</p><p style="text-align: right">Align right</p><p></p><p style="text-align: justify"><strong>This is some justified text: </strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis scelerisque, eros et finibus aliquet, felis tellus malesuada nisl, at vulputate urna enim blandit magna. Fusce id molestie lectus, vitae venenatis tortor. Duis ornare maximus quam, a venenatis tellus euismod et. Phasellus dictum accumsan risus ut egestas. Donec ac ipsum sagittis, cursus nunc sed, pharetra erat. Suspendisse nec neque a mi tempor consequat. Curabitur ullamcorper, ligula dignissim tempus hendrerit, nisl velit tristique diam, ut tempus mi risus et urna. Quisque vitae leo a ligula sodales ornare. Ut vitae mi fermentum, mollis dolor nec, fringilla elit. Nullam interdum vulputate enim sed auctor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent sed purus sed felis pulvinar venenatis. Nulla non pretium enim, vel dictum sem. Pellentesque metus magna, ultricies id semper et, dictum ac sapien.</p><p style="text-align: justify">Aliquam ac massa non odio elementum sodales at vel ipsum. Duis ac elit ultrices, venenatis neque sed, pharetra odio. Proin sodales diam eget risus maximus ullamcorper. Maecenas consectetur pretium nisi eget vehicula. Phasellus porttitor ligula nisi, vitae sollicitudin ex pulvinar ut. Curabitur id fringilla dui. Maecenas vel semper enim. Morbi feugiat, lacus venenatis vulputate aliquam, elit magna suscipit magna, non cursus dolor mauris a lectus.</p><p style="text-align: justify"></p><h1 class="font-light text-3xl">This is a h1</h1><p></p><h2 class="font-light text-3xl">This is a h2</h2><p></p><h3 class="font-light text-3xl">This is a h3</h3><p></p><blockquote class="ml-2 pl-1 py-3 border-l-2 border-gray-300"><p>"This is some blockquote" - Some Guy</p></blockquote>', // for testing
      posts: [
        {
          "id": "5",
          "type": "blogs",
          "attributes": {
            "title": "Mrs.",
            "content": "Exercitationem id nihil inventore recusandae harum fugiat.",
            "tags": [
              {
                "name": "et",
                "type": "text",
                "value": "nulla"
              }
            ],
            "image": null,
            "slug": "mrs",
            "views": 2
          },
          "relationships": {
            "creator": {
              "id": "1",
              "type": "users",
              "attributes": {
                "first_name": "Alvena",
                "last_name": "Hudson",
                "email": "lskiles@example.org",
                "avatar": null
              },
              "relationships": {
                "comments": []
              },
              "meta": {
                "authorizedToShow": true,
                "authorizedToStore": true,
                "authorizedToUpdate": true,
                "authorizedToDelete": true
              }
            },
            "comments": []
          },
          "meta": {
            "authorizedToShow": true,
            "authorizedToStore": true,
            "authorizedToUpdate": false,
            "authorizedToDelete": false
          }
        },
        {
          "id": "2",
          "type": "blogs",
          "attributes": {
            "title": "Mr.",
            "content": "Dolores laboriosam est placeat sint blanditiis.",
            "tags": [
              {
                "name": "molestias",
                "type": "text",
                "value": "temporibus"
              }
            ],
            "image": null,
            "slug": "omnis-explicabo-id-fuga-ea-dicta-sequi-voluptatem-occaecati",
            "views": null
          },
          "relationships": {
            "creator": {
              "id": "5",
              "type": "users",
              "attributes": {
                "first_name": "Kurtis",
                "last_name": "Lynch",
                "email": "tjacobs@example.net",
                "avatar": null
              },
              "relationships": {
                "comments": [
                  {
                    "id": 7,
                    "user_id": 5,
                    "blog_id": 8,
                    "body": "Unde alias voluptate possimus adipisci quo voluptatem tenetur.",
                    "created_at": "2021-07-28T09:06:39.000000Z",
                    "updated_at": "2021-07-28T09:06:39.000000Z"
                  },
                  {
                    "id": 8,
                    "user_id": 5,
                    "blog_id": 9,
                    "body": "Numquam cupiditate expedita placeat hic animi ut.",
                    "created_at": "2021-07-28T09:06:39.000000Z",
                    "updated_at": "2021-07-28T09:06:39.000000Z"
                  }
                ]
              },
              "meta": {
                "authorizedToShow": true,
                "authorizedToStore": true,
                "authorizedToUpdate": true,
                "authorizedToDelete": true
              }
            },
            "comments": [
              {
                "id": "6",
                "type": "comments",
                "attributes": {
                  "blog_id": 2,
                  "body": "Eos eos officia cumque aut eaque cupiditate."
                },
                "relationships": {
                  "creator": [
                    {
                      "id": 7,
                      "first_name": "Gerson",
                      "last_name": "Hill",
                      "email": "weissnat.mossie@example.org",
                      "avatar": "https://via.placeholder.com/640x480.png/00ff22?text=rerum",
                      "email_verified_at": "2021-07-28T09:06:38.000000Z",
                      "created_at": "2021-07-28T09:06:39.000000Z",
                      "updated_at": "2021-07-28T09:06:39.000000Z"
                    }
                  ]
                },
                "meta": {
                  "authorizedToShow": true,
                  "authorizedToStore": true,
                  "authorizedToUpdate": false,
                  "authorizedToDelete": false
                }
              }
            ]
          },
          "meta": {
            "authorizedToShow": true,
            "authorizedToStore": true,
            "authorizedToUpdate": false,
            "authorizedToDelete": false
          }
        },
        {
          "id": "9",
          "type": "blogs",
          "attributes": {
            "title": "Mrs.",
            "content": "Aliquid unde incidunt eos.",
            "tags": [
              {
                "name": "dolore",
                "type": "text",
                "value": "ea"
              }
            ],
            "image": null,
            "slug": "sed-incidunt-aspernatur-eligendi-quidem-incidunt-consequuntur",
            "views": null
          },
          "relationships": {
            "creator": {
              "id": "3",
              "type": "users",
              "attributes": {
                "first_name": "Jared",
                "last_name": "Larson",
                "email": "amalia.kiehn@example.org",
                "avatar": null
              },
              "relationships": {
                "comments": []
              },
              "meta": {
                "authorizedToShow": true,
                "authorizedToStore": true,
                "authorizedToUpdate": true,
                "authorizedToDelete": true
              }
            },
            "comments": [
              {
                "id": "1",
                "type": "comments",
                "attributes": {
                  "blog_id": 9,
                  "body": "Minima et saepe qui id repellendus id."
                },
                "relationships": {
                  "creator": [
                    {
                      "id": 9,
                      "first_name": "Noble",
                      "last_name": "Morar",
                      "email": "vcorkery@example.com",
                      "avatar": "https://via.placeholder.com/640x480.png/006655?text=necessitatibus",
                      "email_verified_at": "2021-07-28T09:06:38.000000Z",
                      "created_at": "2021-07-28T09:06:39.000000Z",
                      "updated_at": "2021-07-28T09:06:39.000000Z"
                    }
                  ]
                },
                "meta": {
                  "authorizedToShow": true,
                  "authorizedToStore": true,
                  "authorizedToUpdate": false,
                  "authorizedToDelete": false
                }
              },
              {
                "id": "8",
                "type": "comments",
                "attributes": {
                  "blog_id": 9,
                  "body": "Numquam cupiditate expedita placeat hic animi ut."
                },
                "relationships": {
                  "creator": [
                    {
                      "id": 5,
                      "first_name": "Kurtis",
                      "last_name": "Lynch",
                      "email": "tjacobs@example.net",
                      "avatar": "https://via.placeholder.com/640x480.png/009955?text=vel",
                      "email_verified_at": "2021-07-28T09:06:38.000000Z",
                      "created_at": "2021-07-28T09:06:39.000000Z",
                      "updated_at": "2021-07-28T09:06:39.000000Z"
                    }
                  ]
                },
                "meta": {
                  "authorizedToShow": true,
                  "authorizedToStore": true,
                  "authorizedToUpdate": false,
                  "authorizedToDelete": false
                }
              }
            ]
          },
          "meta": {
            "authorizedToShow": true,
            "authorizedToStore": true,
            "authorizedToUpdate": false,
            "authorizedToDelete": false
          }
        }
      ]
    }
  },
  methods: {
    onInput() { // for testing
      console.log(this.tiptapContent);
    }
  }
}
</script>
