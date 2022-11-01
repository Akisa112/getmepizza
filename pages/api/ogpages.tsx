import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

export default function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const hasName = searchParams.has("name");
  const name = hasName ? searchParams.get("name")?.slice(0, 12) : "GetMePizza";
  const hasLinkName = searchParams.has("link");
  const linkName = hasLinkName
    ? searchParams.get("link")?.slice(0, 12)
    : "testing-this";
  const hasPhoto = searchParams.has("photo");
  const photo = hasPhoto
    ? searchParams.get("photo")?.slice(0, 100)
    : "https://ih1.redbubble.net/image.390882854.0609/st,small,845x845-pad,1000x1000,f8f8f8.u3.jpg";

  try {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 128,
            background: "#f8fafc",
            width: "100%",
            height: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            id='visual'
            viewBox='0 0 900 450'
            width='1200'
            height='600'
            xmlns='http://www.w3.org/2000/svg'
            version='1.1'
            style={{ position: "absolute" }}
          >
            <rect width='900' height='450' fill='#fd7438'></rect>
            <g>
              <g transform='translate(480 69)'>
                <path
                  d='M40.7 -48.7C53 -38.2 63.4 -25.6 67.7 -10.6C71.9 4.5 70.2 22 61.6 34.3C53 46.5 37.5 53.5 21.9 58.4C6.3 63.4 -9.4 66.2 -23.9 62.4C-38.3 58.5 -51.5 47.9 -58 34.5C-64.4 21.2 -64.2 4.9 -61.7 -11.3C-59.3 -27.5 -54.8 -43.6 -44.1 -54.4C-33.5 -65.2 -16.7 -70.6 -1.3 -69.1C14.2 -67.6 28.5 -59.2 40.7 -48.7Z'
                  fill='none'
                  stroke='#fde048'
                  stroke-width='20'
                ></path>
              </g>
              <g transform='translate(564 437)'>
                <path
                  d='M38.2 -47.5C47.5 -37.7 51.6 -23.8 54.4 -9.4C57.2 5.1 58.7 19.9 52.8 30.7C46.9 41.5 33.4 48.3 20.2 51.4C6.9 54.5 -6.3 53.9 -18.5 49.8C-30.6 45.8 -41.9 38.2 -48.4 27.6C-54.9 17 -56.7 3.3 -54.7 -9.9C-52.6 -23 -46.6 -35.8 -36.9 -45.5C-27.1 -55.2 -13.6 -61.8 0.4 -62.4C14.5 -62.9 28.9 -57.3 38.2 -47.5Z'
                  fill='none'
                  stroke='#fde048'
                  stroke-width='20'
                ></path>
              </g>
              <g transform='translate(118 254)'>
                <path
                  d='M20.6 -24.6C26.3 -19.8 30.3 -12.9 31.9 -5.4C33.4 2.1 32.5 10.2 29.1 17.6C25.8 25.1 19.9 31.9 12.5 34.6C5.1 37.4 -3.8 36.2 -12.2 33.2C-20.6 30.3 -28.5 25.7 -32.8 18.7C-37 11.8 -37.6 2.5 -36.2 -6.5C-34.7 -15.5 -31.3 -24.3 -24.9 -29C-18.5 -33.7 -9.3 -34.2 -0.9 -33.2C7.4 -32.1 14.9 -29.3 20.6 -24.6Z'
                  fill='none'
                  stroke='#fde048'
                  stroke-width='20'
                ></path>
              </g>
              <g transform='translate(302 180)'>
                <path
                  d='M23.6 -28.7C30.2 -22.6 34.8 -14.8 37.1 -5.9C39.4 3 39.4 12.9 35.6 21.6C31.8 30.3 24.2 37.9 15.2 40.8C6.2 43.7 -4.2 41.9 -14.4 38.6C-24.6 35.4 -34.7 30.6 -40.5 22.4C-46.3 14.3 -47.9 2.8 -45 -6.9C-42.1 -16.7 -34.7 -24.6 -26.4 -30.3C-18.2 -36.1 -9.1 -39.6 -0.3 -39.3C8.5 -39 17 -34.7 23.6 -28.7Z'
                  fill='none'
                  stroke='#fde048'
                  stroke-width='20'
                ></path>
              </g>
              <g transform='translate(165 43)'>
                <path
                  d='M40.4 -47.8C50.8 -39.4 56.7 -25.2 57.3 -11.6C57.9 2 53.3 15.1 46.1 25.7C38.9 36.4 29.1 44.8 17.3 50.2C5.5 55.6 -8.3 58.1 -21.1 54.8C-33.9 51.5 -45.7 42.3 -53.4 30.2C-61.1 18.1 -64.7 3 -61.6 -10.3C-58.6 -23.6 -48.9 -35.2 -37.6 -43.5C-26.2 -51.8 -13.1 -56.8 0.9 -57.9C15 -59 30 -56.3 40.4 -47.8Z'
                  fill='none'
                  stroke='#fde048'
                  stroke-width='20'
                ></path>
              </g>
              <g transform='translate(307 344)'>
                <path
                  d='M29 -34.6C37.1 -27.8 42.8 -18.2 43.5 -8.5C44.2 1.1 39.9 10.8 34.2 18.9C28.6 27 21.5 33.4 13.1 36.8C4.7 40.3 -5.2 40.7 -14.9 38.3C-24.7 35.9 -34.4 30.7 -38.5 22.6C-42.7 14.6 -41.3 3.8 -38.6 -5.9C-35.8 -15.6 -31.6 -24.2 -25 -31.2C-18.3 -38.3 -9.2 -43.9 0.7 -44.7C10.5 -45.5 20.9 -41.4 29 -34.6Z'
                  stroke='#fde048'
                  fill='none'
                  stroke-width='20'
                ></path>
              </g>
            </g>
          </svg>

          <img
            src={photo}
            tw='mx-auto h-[250px] w-[250px] rounded-full border-yellow-300 border-spacing-1 border-4'
          />
          <div tw='flex wrap '>
            <h1 tw='text-[6rem]'>{name}...</h1>

            <p tw='text-sm mr-4'>🍕 getme.pizza/{linkName}...</p>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 600,
        emoji: "twemoji",
      }
    );
  } catch (e) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
