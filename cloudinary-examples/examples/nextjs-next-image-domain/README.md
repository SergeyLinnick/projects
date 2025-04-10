# Next.js Image Component Using Cloudinary URLs

You can use Cloudinary URLs right inside of your Next.js project with the Next.js Image component just like any other remote source.

## 🧰 Using Cloudinary URLs with the Next.js Image Component

To allow Cloudinary URLs to load with the Image component, simply update your `next.config.js` file with the following configuration:

```js
const nextConfig = {
  // other options
  images: {
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
  }
}
```

See the file in action at [next.config.js](next.config.js).

> Note: If using a custom domain with Cloudinary, be sure to use the appropriate domain in the `remotePatterns` array.

## 🚀 Get Started with This Example

* Install the project dependencies with:

```sh
yarn install
# or
npm install
```

* Start the development server with:

```sh
yarn dev
# or
npm run dev
```

* Visit the project at <http://localhost:3000>!
