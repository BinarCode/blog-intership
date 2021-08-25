<script>
import { Notification } from 'element-ui';

export default {
  name: 'BaseNotification',
  props: {
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true,
      default: ''
    },
    type: {
      type: String, // success |  warning | info | error
      required: true,
      default: 'info'
    },
    autoClose: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    Notification({
      title: this.$props.title,
      message: this.$props.message,
      type: this.$props.type,
      duration: this.$props.autoClose ? undefined : 0
    });
  }
}
</script>


<style scoped>

</style>