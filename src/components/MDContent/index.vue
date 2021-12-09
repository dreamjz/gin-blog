<template>
  <component :is="mdHtml" class="md-content" />
</template>

<script>
import MarkdownIt from 'markdown-it'

export default {
  name: 'MDContent',
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    md: null
  }),
  computed: {
    mdHtml: function() {
      const res = this.md.render(this.content)
      return {
        template: '<div>' + res + '</div>'
      }
    }
  },
  created() {
    this.md = new MarkdownIt({
      html: true
    })
  }
}
</script>
