/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import useAnimatedProps from './useAnimatedProps';
import useMergeRefs from '../Utilities/useMergeRefs';
import * as React from 'react';

/**
 * Experimental implementation of `createAnimatedComponent` that is intended to
 * be compatible with concurrent rendering.
 */
export default function createAnimatedComponent<TProps: {...}, TInstance>(
  Component: React.AbstractComponent<TProps, TInstance>,
): React.AbstractComponent<TProps, TInstance> {
  return React.forwardRef((props, forwardedRef) => {
    const [reducedProps, callbackRef] = useAnimatedProps<TProps, TInstance>(
      props,
    );
    const ref = useMergeRefs<TInstance | null>(callbackRef, forwardedRef);

    return <Component {...reducedProps} ref={ref} />;
  });
}
