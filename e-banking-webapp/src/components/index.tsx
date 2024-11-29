import { Button } from '@nextui-org/react';
import { useCallback, useEffect, useState } from 'react';

const ButtonComponent = () => {
  const [text, setText] = useState<boolean>(true);

  const handle = useCallback(() => {
    if (text == true) setText(false);
  }, []);

  useEffect(() => {
    setText((pre) => !pre);
  }, []);

  return (
    <>
      <p>{text ? 'abc' : '12345'}</p>
      <Button onClick={handle}>Button</Button>
    </>
  );
};

export default ButtonComponent;
