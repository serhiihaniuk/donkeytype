import { TailSpin } from 'react-loader-spinner';

const Circle = () => {
  const circleStyle = {
    display: 'flex',
    justifyContent: 'center',
    margin: '40vh auto'
  };
  return (
    <div style={circleStyle}>
      <TailSpin
        visible={true}
        height="60"
        width="60"
        color="var(--alt-color)"
        ariaLabel="tail-spin-loading"
        radius="0"
      />
    </div>
  );
};

export default Circle;
