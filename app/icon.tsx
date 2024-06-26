import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 38,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 12,
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        Glowy
      </div>
    ),
    {
      ...size,
    }
  );
}
