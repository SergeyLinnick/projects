export default function NewsItemPage({ params }) {
  const { newsSlug } = params;

  return (
    <div>
      <h1>Item - {newsSlug}</h1>
    </div>
  );
}
