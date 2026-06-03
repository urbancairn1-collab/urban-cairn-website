import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { company } from '../data/company';
import { SITE_URL, SITE_NAME, getSeo } from '../data/seo';

const DEFAULT_OG = `${SITE_URL}/og-default.png`;
const DEFAULT_OG_SVG = `${SITE_URL}/og-default.svg`;

const SEO = ({ title, description, path, image, keywords, type = 'website', faqItems }) => {
  const location = useLocation();
  const route = path || location.pathname;
  const fallback = getSeo(route);

  const finalTitle = title ? `${title} | ${SITE_NAME}` : (fallback.title ? `${fallback.title} | ${SITE_NAME}` : SITE_NAME);
  const finalDesc = description || fallback.description;
  const finalKeywords = keywords || fallback.keywords;
  const finalImage = image || DEFAULT_OG;
  const url = `${SITE_URL}${route === '/' ? '/' : route}`;

  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': ['ProfessionalService', 'Organization'],
    '@id': `${SITE_URL}/#organization`,
    name: company.name,
    legalName: company.name,
    alternateName: 'Urban Cairn',
    description: finalDesc,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    image: finalImage,
    telephone: company.phone,
    email: company.email,
    priceRange: '₹₹',
    foundingDate: '2026-02-13',
    founder: {
      '@type': 'Person',
      name: company.founder,
      jobTitle: 'Founder'
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN'
    },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '10:00', closes: '20:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '10:00', closes: '16:00' }
    ],
    areaServed: { '@type': 'Country', name: 'India' },
    identifier: company.udyam,
    sameAs: [
      company.social.linkedin,
      company.social.instagram,
      company.social.twitter,
      company.social.facebook,
      company.social.github
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Capabilities',
      itemListElement: [
        'High-converting websites','Mobile app development','WhatsApp automation',
        'Custom software development','Trading dashboards','Lead generation systems'
      ].map((s, i) => ({
        '@type': 'Offer',
        position: i + 1,
        itemOffered: { '@type': 'Service', name: s }
      }))
    }
  };

  const breadcrumb = route !== '/' ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: (fallback.title || title || 'Page').split('·')[0].trim(), item: url }
    ]
  } : null;

  const webSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { '@id': `${SITE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  // FAQPage rich-results + AI-citable Q&A. Only emitted on routes that pass faqItems.
  const faqPage = Array.isArray(faqItems) && faqItems.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a }
    }))
  } : null;

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDesc} />
      {finalKeywords && <meta name="keywords" content={finalKeywords} />}
      <meta name="author" content={SITE_NAME} />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDesc} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDesc} />
      <meta name="twitter:image" content={finalImage} />

      <meta name="geo.region" content="IN" />

      <script type="application/ld+json">{JSON.stringify(localBusiness)}</script>
      <script type="application/ld+json">{JSON.stringify(webSite)}</script>
      {breadcrumb && <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>}
      {faqPage && <script type="application/ld+json">{JSON.stringify(faqPage)}</script>}
    </Helmet>
  );
};

export default SEO;
