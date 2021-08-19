<template>
<div class="p-20">
  <div class="buttonstyle">
  <h1 class="text-5xl font-bold my-4">BaseButtonStyles</h1>
  <base-button-styles></base-button-styles>
  </div>

    
    <div class="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none print:grid-cols-2">
      <base-card
        v-for="post in posts"
        :post="post"
        :key="post.id"
      />
    </div>

  

    <input-comp />
  </div>
</template>

<script>
import BaseButtonStyles from '../components/styles/BaseButtonStyles.vue'
import BaseCard from '@/components/BaseCard';
import InputComp from '@/views/InputComp.vue';

export default {
  name: 'Styleguide',
  components: {
    BaseCard,
    InputComp,
    BaseButtonStyles
  },
  data() {
    return {
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
  }
}
</script>
