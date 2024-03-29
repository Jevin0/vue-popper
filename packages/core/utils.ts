import type { ComponentPublicInstance } from 'vue'
import {getNodeName, isNode} from '@floating-ui/utils/dom';
// import { unref } from 'vue'

function isComponentPublicInstance(target: unknown): target is ComponentPublicInstance {
  return target != null && typeof target === 'object' && '$el' in target;
}

export function unRefRealElement<T> (element: T) {
  if (isComponentPublicInstance(element)) {
    const _el = element.$el as Exclude<T, ComponentPublicInstance>;

    return isNode(_el) && getNodeName(_el) === '#comment' ? null : _el;
  }
  
  return element as Exclude<T, ComponentPublicInstance>
}

export function customError (error: string) {
  throw new Error(`vue-popper: ${error}`)

}