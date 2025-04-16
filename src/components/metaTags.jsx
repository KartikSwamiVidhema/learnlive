import Head from "next/head";

export default function MetaTags({ title, description, keywords, canonical }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />
      <meta name="robots" content="index, follow" />
    </Head>
  );
}
