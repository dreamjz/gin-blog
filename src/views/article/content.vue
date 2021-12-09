<template>
  <div>
    <MDContent :content="content" />
  </div>
</template>

<script>
import MDContent from '@/components/MDContent'
import { fetchArticle } from '@/api/article'

export default {
  name: 'ArticleContent',
  components: {
    MDContent
  },
  data() {
    return {
      content: ''
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    this.fetchData(id)
  },
  methods: {
    fetchData(id) {
      fetchArticle(id)
        .then((response) => {
          this.content = response.data.content
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
