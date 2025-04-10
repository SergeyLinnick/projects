import Footer from '@/components/Footer';
import Uploader from '@/components/Uploader';

/** @type {import('next').Metadata} */
export const metadata = {
  title: 'Next Cloudinary CldUploadWidget Component',
  description:
    'Find more Cloudinary examples at github.com/cloudinary-community/cloudinary-examples',
};

export default function Home() {
  return (
    <div className="container mx-auto mb-5 max-w-screen-lg space-y-5 px-4 py-0">
      <h2 className="text-lg font-semibold">
        The button below is wrapped in the{' '}
        <code className="font-bold">{`<CldUploadWidget>`}</code> component
      </h2>

      <Uploader />

      <Footer />
    </div>
  );
}
