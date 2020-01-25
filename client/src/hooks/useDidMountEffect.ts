import React from 'react';

const useDidMountEffect = (
  func: React.EffectCallback
) => {
  const didMount = React.useRef(false);

  React.useEffect(
    () => {
      if (didMount.current) {
        func();
      } else {
        didMount.current = true;
      }
    }
  );
};

export default useDidMountEffect;
