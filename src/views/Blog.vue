<template>
    <div class="container w-full my-20 mr-0 flex justify-center">
        <div class="content w-3/4 flex flex-col items-start justify-center h-content">
            <div class="title text-5xl mt-10 mb-10"> 
                {{blog.data.attributes.title}}
            </div>
            <div class="description text-2xl tracking-normal mb-5">
                {{blog.data.attributes.content}}
            </div>
            <div class="tags flex flex-row items-start cursor-pointer">
                <div class="py-3 px-5 bg-blue-700" v-for="(tag, index) in blog.data.attributes.tags" :key="index">
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
              blog: '',
            }
        },
        async mounted() {
        this.token = authService.getToken()

            try {
                 this.blog = await blogService.getBlog(this.$route.params.id, this.token)
                 } catch(error) {
                     console.log(error)
                 }   
        }
    }
</script>

<style>
</style>

