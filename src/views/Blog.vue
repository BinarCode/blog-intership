<template>
    <div class="container w-full my-20 mr-0 flex justify-center">
        <div class="content w-3/4 flex flex-col items-start justify-center">
            <div class="title text-5xl mt-10 mb-10"> 
                <p>{{title}}</p>
            </div>
            <div class="description text-2xl tracking-normal mb-5">
                <p>{{content}}</p>
            </div>
            <div class="tags flex flex-row items-start cursor-pointer">
                <div class="py-3 px-5 bg-blue-700" v-for="(tag, index) in tags" :key="index">
                    {{tag.name}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import authService from '@/api/authService'
import blogService from '@/api/blogService'

    export default {
        data() {
            return {
                token:'',
                id: 0,
                title:'',
                content:'',
                tags:[],
                image:'',
                slug:'',
                views:0
            }
        },
        methods: {
           async parseBlogData() {
                let data = await blogService.getBlog(this.id, this.token)
                this.title = data.data.attributes.title
                this.content = data.data.attributes.content
                this.tags = data.data.attributes.tags
                this.image = data.data.attributes.image
                this.slug = data.data.attributes.slug
                this.views = data.data.attributes.views
            }
        },
        created() {
            this.token = authService.getToken()
            this.id = this.$route.params.id
            try {
               this.parseBlogData()
            } catch(e) {console.log(e)}
        },
        watch: {
            $route(to) {
                this.id = to.params.id
                this.parseBlogData()
            }
        }
    }
</script>

<style lang="css">
.container {
   font-family: Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
}

.container .content {
   height: fit-content; 
}

</style>

