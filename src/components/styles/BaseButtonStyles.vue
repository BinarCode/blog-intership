<template>
<div class="parinte">
  <h3 class="ml-20 mb-5">Button sizes</h3>
<BaseButton class="mr-5" size="sm" >Submit</BaseButton>
<BaseButton class="mr-5" size="md">Submit</BaseButton>
<BaseButton class="mr-5" size="lg" label="aplica"> </BaseButton>
<BaseButton class="mr-5" size="sm" color="secondary">Submit</BaseButton>
<BaseButton class="mr-5" size="md" color="secondary">Submit</BaseButton>
<BaseButton class="mr-5" size="lg" label="aplica" color="secondary"> </BaseButton>
<br>
<br>
  <h3 class="ml-20 mb-5">Disabled States</h3>
<BaseButton class="mr-5" size="sm" disabled>Submit</BaseButton>
<BaseButton class="mr-5" size="md" disabled>Submit</BaseButton>
<BaseButton class="mr-5" size="lg" label="aplica" disabled> </BaseButton>
<BaseButton class="mr-5" size="sm" color="secondary" disabled>Submit</BaseButton>
<BaseButton class="mr-5" size="md" color="secondary" disabled>Submit</BaseButton>
<BaseButton class="mr-5" size="lg" label="aplica" color="secondary" disabled> </BaseButton>
  <h3 class="ml-20 mb-5 mt-10">Outline States</h3>
<BaseButton class="mr-5" size="sm" outline>Submit</BaseButton>
<BaseButton class="mr-5" size="md" outline>Submit</BaseButton>
<BaseButton class="mr-5" size="lg" label="aplica" outline> </BaseButton>
<BaseButton class="mr-5" size="sm" color="secondary" outline>Submit</BaseButton>
<BaseButton class="mr-5" size="md" color="secondary" outline>Submit</BaseButton>
<BaseButton class="mr-5" size="lg" label="aplica" color="secondary" outline> </BaseButton>
</div>
</template>

<script>
import BaseButton from '../BaseButton.vue'
export default {
  name: 'BaseButtonStyles',
  components: {BaseButton}
}
  </script>

