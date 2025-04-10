export default function Footer() {
  return (
    <div className="border-t pt-8">
      <h2 className="mb-3 text-2xl font-bold">Resources</h2>
      <p className="mb-2">
        <a
          href="https://github.com/cloudinary-community/cloudinary-examples/tree/main/examples/nextjs-cldogimage"
          className="text-blue-800 hover:underline"
          target="_blank"
        >
          See the code on github.com
        </a>
      </p>
      <p>
        Next Cloudinary:{' '}
        <a
          href="https://next.cloudinary.dev/"
          className="text-blue-800 hover:underline"
          target="_blank"
        >
          https://next.cloudinary.dev
        </a>
      </p>
      <p>
        Preview the working card at{' '}
        <a
          href="https://www.opengraph.xyz/url/https%3A%2F%2Fcloudinary-nextjs-cldogimage.netlify.app%2F"
          className="text-blue-800 hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          https://opengraph.xyz
        </a>
      </p>
    </div>
  );
}
