<template>
  <div>
    <MDContent :content="content" />
  </div>
</template>

<script>
import MDContent from '@/components/MDContent'
export default {
  name: 'ArticleContent',
  components: {
    MDContent
  },
  data: () => ({
    content: ''
  }),
  created() {
    this.content = `# Test \n ## 1. H1`
  }
}
</script>
