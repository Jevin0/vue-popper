<script setup lang="ts">
import type { Placement } from "@layui/popper-core";
import { usePopper } from "@layui/popper-core";
import { ref, provide, computed } from "vue";
import Trigger from "./component/trigger.vue";
import Content from "./component/content.vue";
import { TOOLTIP_INJECTION_KEY } from "./utils";

type PopperProps = {
  modelValue?: boolean;
  trigger?: "click" | "hover";
  placement?: Placement;
};

const props = withDefaults(defineProps<PopperProps>(), {
  modelValue: false,
  trigger: "click",
  placement: "top",
});

const emit = defineEmits(["update:modelValue"]);

const open = ref(props.modelValue);

const TriggerRef = ref(null);
// const ContentRef = ref(null);

const triggerProps = computed(() => {
  return {
    modelValue: open.value,
    trigger: props.trigger,
  };
});

const contentProps = computed(() => {
  return {
    modelValue: open.value,
    placement: props.placement,
  };
});

const onShow = () => {
  open.value = true;
  emit("update:modelValue", true);
};

const onHidden = () => {
  open.value = false;
  emit("update:modelValue", false);
};

provide(TOOLTIP_INJECTION_KEY, {
  TriggerRef,
  // ContentRef,
  onShow,
  onHidden,
});
</script>

<template>
  <Trigger v-bind="triggerProps">
    <slot name="reference"></slot>
  </Trigger>
  <Content v-bind="contentProps">
    <slot></slot>
  </Content>
</template>

<style lang="less"></style>
