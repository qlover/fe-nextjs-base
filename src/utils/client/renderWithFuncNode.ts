import { isFunction } from 'lodash';
import { isSameNull } from '../lang';

export default function renderWithFuncNode<P = any>(
  node?: BaseComponent.WithFuncNode<P>,
  props?: P
) {
  if (isSameNull(node)) {
    return null;
  }
  return isFunction(node) ? node(props || ({} as P)) : node;
}
