<template>
  <Teleport to="body">
    <transition name="fade">
      <div v-show="visible" :style="popperStyle" ref="ContentRef">
        <slot></slot>
        <div ref="ArrowRef" style="position: absolute"></div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { Placement } from "@layui/popper-core";
import { useSlots, ref, computed, inject, watch } from "vue";
// import { usePopper, flip, hide, arrow, offset } from "@layui/popper-core";
import { onClickOutside } from "@vueuse/core";
import { usePopper, flip, hide, arrow, offset } from "../../../core/index";

import { TOOLTIP_INJECTION_KEY, arrowMiddleware } from "../utils";

type ContentProps = {
  modelValue: boolean;
  placement: Placement;
};

const props = withDefaults(defineProps<ContentProps>(), {});

const ContentRef = ref<HTMLDivElement | null>(null);
const ArrowRef = ref<HTMLDivElement | null>(null);

const { TriggerRef, onShow, onHidden } = inject(TOOLTIP_INJECTION_KEY);

const visible = computed(() => {
  return props.modelValue;
});

const { popperStyle, middlewareData } = usePopper(TriggerRef, ContentRef, {
  placement: props.placement,
  middleware: [
    offset(10),
    flip(),
    arrowMiddleware({
      arrowRef: ArrowRef,
    }),
  ],
});

onClickOutside(ContentRef, (event) => {
  if (!visible || TriggerRef.value.contains(event.target)) return;

  onHidden();
});
</script>

<style>
/* .fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
} */
</style>
