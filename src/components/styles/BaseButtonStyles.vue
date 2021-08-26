<template>
  <div class="parinte ">
    <h3 class="ml-20">Button sizes</h3>
    <div class="inline-flex my-5">
      <BaseButton class="mr-5" size="sm">Submit</BaseButton>
      <BaseButton class="mr-5" size="md">Submit</BaseButton>
      <BaseButton class="mr-5" size="lg" label="aplica"></BaseButton>
      <BaseButton class="mr-5" size="sm" color="secondary">Submit</BaseButton>
      <BaseButton class="mr-5" size="md" color="secondary">Submit</BaseButton>
      <BaseButton
        class="mr-5"
        size="lg"
        label="aplica"
        color="secondary"
      ></BaseButton>
    </div>
    <h3 class="ml-20">Disabled States</h3>
    <div class="inline-flex my-5">
      <BaseButton class="mr-5" size="sm" disabled>Submit</BaseButton>
      <BaseButton class="mr-5" size="md" disabled>Submit</BaseButton>
      <BaseButton class="mr-5" size="lg" label="aplica" disabled></BaseButton>
      <BaseButton class="mr-5" size="sm" color="secondary" disabled>
        Submit
      </BaseButton>
      <BaseButton class="mr-5" size="md" color="secondary" disabled>
        Submit
      </BaseButton>
      <BaseButton
        class="mr-5"
        size="lg"
        label="aplica"
        color="secondary"
        disabled
      ></BaseButton>
    </div>
    <h3 class="ml-20">Outline States</h3>
    <div class="inline-flex my-5">
      <BaseButton class="mr-5" size="sm" outline>Submit</BaseButton>
      <BaseButton class="mr-5" size="md" outline>Submit</BaseButton>
      <BaseButton class="mr-5" size="lg" label="aplica" outline></BaseButton>
      <BaseButton class="mr-5" size="sm" color="secondary" outline>
        Submit
      </BaseButton>
      <BaseButton class="mr-5" size="md" color="secondary" outline>
        Submit
      </BaseButton>
      <BaseButton
        class="mr-5"
        size="lg"
        label="aplica"
        color="secondary"
        outline
      ></BaseButton>
    </div>
  </div>
</template>

<script>
import BaseButton from '../BaseButton.vue';
export default {
  name: 'BaseButtonStyles',
  components: { BaseButton },
};
</script>
