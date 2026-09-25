import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  FileText,
  Building2,
  Database,
  Layers,
  Send,
  Share2,
  Cookie,
  Lock,
  Clock,
  UserCheck,
  RotateCcw,
  Baby,
  ExternalLink,
  AlertTriangle,
  RefreshCw,
  Mail,
  Phone,
  MapPin,
  Globe,
  Scale,
  Calendar,
  ChevronRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Srini Realty Private Limited",
  description:
    "Read the Privacy Policy of Srini Realty Private Limited. Learn how we collect, use, protect, and handle your personal information when using our real estate website and services.",
  alternates: {
    canonical: "https://www.srinirealty.in/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Srini Realty Private Limited",
    description:
      "Privacy Policy and Personal Data handling practices of Srini Realty Private Limited.",
    url: "https://www.srinirealty.in/privacy-policy",
    siteName: "Srini Realty",
    type: "website",
  },
};

const sections = [
  { id: "about-policy", title: "1. About this Privacy Policy", icon: FileText },
  { id: "about-srini", title: "2. About Srini Realty", icon: Building2 },
  { id: "info-we-collect", title: "3. Information We Collect", icon: Database },
  { id: "how-we-use", title: "4. How We Use Your Information", icon: Layers },
  { id: "marketing", title: "5. Marketing Communications", icon: Send },
  { id: "sharing", title: "6. Sharing of Personal Information", icon: Share2 },
  { id: "cookies", title: "7. Cookies and Analytics", icon: Cookie },
  { id: "security", title: "8. Data Security", icon: Lock },
  { id: "retention", title: "9. Data Retention", icon: Clock },
  { id: "your-rights", title: "10. Your Rights and Choices", icon: UserCheck },
  { id: "withdrawal", title: "11. Withdrawal of Consent", icon: RotateCcw },
  { id: "children", title: "12. Children's Privacy", icon: Baby },
  { id: "third-party", title: "13. Third-Party Websites & Services", icon: ExternalLink },
  { id: "disclaimers", title: "14. Property Information & Disclaimers", icon: AlertTriangle },
  { id: "changes", title: "15. Changes to this Privacy Policy", icon: RefreshCw },
  { id: "contact", title: "16. Contact Us", icon: Mail },
  { id: "applicable-law", title: "17. Applicable Law", icon: Scale },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-16 min-h-screen bg-slate-50 text-slate-800">
      {/* Hero Header */}
      <section className="relative py-16 md:py-20 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.15),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-slate-300 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-slate-500" />
            <span className="text-blue-400 font-medium">Privacy Policy</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold tracking-wide uppercase">
                <ShieldCheck className="w-3.5 h-3.5" />
                Legal & Data Protection
              </div>
              <h1 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-white">
                SRINI REALTY PRIVATE LIMITED
              </h1>
              <p className="text-xl md:text-2xl font-medium text-blue-200">
                PRIVACY POLICY
              </p>
            </div>

            {/* Date Badge */}
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 md:p-5 flex flex-col gap-2 min-w-[240px] text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-slate-300">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span>Effective Date: <strong>24 September 2026</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>Last Updated: <strong>24 September 2026</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sticky Navigation Sidebar (Desktop) */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
            <div className="sticky top-24 bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 space-y-3">
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-slate-500 px-3">
                Table of Contents
              </h3>
              <nav className="space-y-1 max-h-[calc(100vh-180px)] overflow-y-auto pr-1 text-xs sm:text-sm font-medium">
                {sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50/70 rounded-lg transition-colors group"
                  >
                    <sec.icon className="w-4 h-4 text-slate-400 group-hover:text-blue-600 flex-shrink-0" />
                    <span className="truncate">{sec.title}</span>
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Document Content */}
          <main className="lg:col-span-8 xl:col-span-9 space-y-10">
            {/* Section 1 */}
            <article
              id="about-policy"
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 scroll-mt-24 transition-all"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
                  1. About this Privacy Policy
                </h2>
              </div>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
                <p>
                  Srini Realty Private Limited (“Srini Realty”, “we”, “us”, or “our”) respects your privacy and is committed to protecting the personal information you provide when you visit or use{" "}
                  <Link
                    href="https://www.srinirealty.in"
                    className="text-blue-600 hover:text-blue-700 underline font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.srinirealty.in
                  </Link>{" "}
                  (“Website”), contact us, submit an enquiry, request a property visit, download information, or otherwise interact with our services.
                </p>
                <p>
                  This Privacy Policy explains what personal information we collect, why we collect it, how we use it, how we protect it, and the choices and rights available to you.
                </p>
              </div>
            </article>

            {/* Section 2 */}
            <article
              id="about-srini"
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 scroll-mt-24 transition-all"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
                  2. About Srini Realty
                </h2>
              </div>
              <div className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
                <p>
                  Srini Realty Private Limited is a real estate company providing property-related services including property buying, selling, development, marketing, consultation and related real estate services.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <Globe className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-slate-500 uppercase">Website</div>
                      <Link
                        href="https://www.srinirealty.in"
                        className="text-blue-600 hover:text-blue-700 font-medium break-all"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        www.srinirealty.in
                      </Link>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-slate-500 uppercase">Email</div>
                      <a
                        href="mailto:info@srinirealty.in"
                        className="text-blue-600 hover:text-blue-700 font-medium break-all"
                      >
                        info@srinirealty.in
                      </a>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <Phone className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-slate-500 uppercase">Phone</div>
                      <a
                        href="tel:+917478997899"
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        +91 74 7899 7899
                      </a>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-slate-500 uppercase">Address</div>
                      <p className="text-slate-800 text-sm">
                        PE/14, 8-7-91/16, Phase 4, Hasthinapuram South, Hastinapuram, Hyderabad, Telangana 500070, India.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Section 3 */}
            <article
              id="info-we-collect"
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 scroll-mt-24 transition-all"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Database className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
                  3. Information We Collect
                </h2>
              </div>
              <div className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
                <p>
                  Depending on how you interact with our Website, we may collect:
                </p>

                <div className="space-y-3">
                  <h3 className="font-heading font-semibold text-slate-900 text-base">
                    Information you provide directly:
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pl-2">
                    {[
                      "Full name",
                      "Mobile/telephone number",
                      "Email address",
                      "Property type or property preferences",
                      "Budget range",
                      "Location preferences",
                      "Additional requirements or messages",
                      "Information voluntarily provided during communications with our representatives",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3 pt-2">
                  <h3 className="font-heading font-semibold text-slate-900 text-base">
                    Information collected automatically:
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pl-2">
                    {[
                      "IP address",
                      "Browser type and version",
                      "Device type",
                      "Operating system",
                      "Website pages visited",
                      "Date and time of access",
                      "Referring website or source",
                      "General website usage and interaction information",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="bg-slate-50 p-4 rounded-xl border border-slate-200/70 text-slate-600 text-sm">
                  Where cookies, analytics or similar technologies are used, they may collect information relating to your browsing and interaction with our Website.
                </p>
              </div>
            </article>

            {/* Section 4 */}
            <article
              id="how-we-use"
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 scroll-mt-24 transition-all"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
                  4. How We Use Your Information
                </h2>
              </div>
              <div className="space-y-5 text-slate-700 leading-relaxed text-sm sm:text-base">
                <p>
                  We may use personal information for legitimate and specified purposes, including:
                </p>

                <ul className="grid grid-cols-1 gap-2.5 pl-2">
                  {[
                    "Responding to property enquiries",
                    "Contacting you regarding properties, projects or services you have requested",
                    "Scheduling property visits and consultations",
                    "Understanding your property requirements and preferences",
                    "Providing property-related information and brochures",
                    "Processing and managing enquiries",
                    "Improving our Website, services and customer experience",
                    "Maintaining records of enquiries and communications",
                    "Sending relevant property updates, offers or marketing communications where permitted",
                    "Preventing fraud, misuse, security incidents and unauthorised activity",
                    "Complying with applicable legal and regulatory obligations",
                    "Establishing, exercising or defending legal rights where necessary",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 text-blue-900 font-medium text-sm">
                  We will not use your personal information for purposes that are incompatible with the purpose for which it was collected, except where permitted or required by applicable law.
                </p>
              </div>
            </article>

            {/* Section 5 */}
            <article
              id="marketing"
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 scroll-mt-24 transition-all"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Send className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
                  5. Marketing Communications
                </h2>
              </div>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
                <p>
                  If you provide your contact information for an enquiry, we may contact you regarding properties, projects, services or information that may be relevant to your enquiry.
                </p>
                <p>
                  Where consent is required by applicable law, we will seek appropriate consent before sending promotional communications.
                </p>
                <p>
                  You may request that we stop sending marketing communications at any time by contacting us using the details provided in this Privacy Policy.
                </p>
              </div>
            </article>

            {/* Section 6 */}
            <article
              id="sharing"
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 scroll-mt-24 transition-all"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Share2 className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
                  6. Sharing of Personal Information
                </h2>
              </div>
              <div className="space-y-5 text-slate-700 leading-relaxed text-sm sm:text-base">
                <p>
                  We may share personal information only where reasonably necessary for the purposes described in this Privacy Policy, including with:
                </p>

                <ul className="space-y-2.5 pl-2">
                  {[
                    "Our authorised employees and representatives",
                    "Property consultants, sales representatives and service providers",
                    "Technology, hosting, website, analytics and communication service providers",
                    "Marketing and advertising service providers, where applicable",
                    "Professional advisers, auditors and legal advisers",
                    "Government authorities, regulators or law-enforcement agencies where required by law",
                    "Other parties where you have provided appropriate consent or where otherwise permitted by applicable law",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-900 font-medium text-sm">
                  We do not sell your personal information as a standalone commercial product.
                </div>

                <p className="text-slate-600 text-sm">
                  Where third-party service providers process personal information on our behalf, we expect them to maintain appropriate confidentiality and security measures.
                </p>
              </div>
            </article>

            {/* Section 7 */}
            <article
              id="cookies"
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 scroll-mt-24 transition-all"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Cookie className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
                  7. Cookies and Analytics
                </h2>
              </div>
              <div className="space-y-5 text-slate-700 leading-relaxed text-sm sm:text-base">
                <p>Our Website may use cookies and similar technologies to:</p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pl-2">
                  {[
                    "Keep the Website functioning properly",
                    "Understand Website usage",
                    "Improve Website performance",
                    "Remember certain preferences",
                    "Measure marketing and advertising performance",
                    "Improve our services and user experience",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <p>
                  You may be able to control cookies through your browser settings. Disabling certain cookies may affect some Website functionality.
                </p>
                <p className="text-slate-600 text-sm">
                  Where third-party analytics or advertising services are used, their processing may also be subject to their respective privacy policies.
                </p>
              </div>
            </article>

            {/* Section 8 */}
            <article
              id="security"
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 scroll-mt-24 transition-all"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
                  8. Data Security
                </h2>
              </div>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
                <p>
                  We take reasonable technical and organisational measures designed to protect personal information against unauthorised access, misuse, alteration, disclosure, loss or destruction.
                </p>
                <p>
                  However, no method of transmission over the internet or electronic storage can be guaranteed to be completely secure.
                </p>
                <p>
                  You should also take appropriate steps to protect your own personal information, including avoiding sending sensitive information through unsecured communication channels unless necessary.
                </p>
              </div>
            </article>

            {/* Section 9 */}
            <article
              id="retention"
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 scroll-mt-24 transition-all"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
                  9. Data Retention
                </h2>
              </div>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
                <p>
                  We retain personal information only for as long as reasonably necessary for the purposes for which it was collected, including providing services, maintaining business and transaction records, resolving disputes, complying with legal obligations and protecting our legitimate interests.
                </p>
                <p>
                  When personal information is no longer required, we may securely delete, anonymise or otherwise dispose of it in accordance with applicable law and our internal retention practices.
                </p>
              </div>
            </article>

            {/* Section 10 */}
            <article
              id="your-rights"
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 scroll-mt-24 transition-all"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
                  10. Your Rights and Choices
                </h2>
              </div>
              <div className="space-y-5 text-slate-700 leading-relaxed text-sm sm:text-base">
                <p>
                  Subject to applicable law, you may have rights relating to your personal information, including the ability to:
                </p>

                <ul className="space-y-2.5 pl-2">
                  {[
                    "Request information about the processing of your personal data",
                    "Request correction of inaccurate or incomplete personal information",
                    "Request deletion of personal information where applicable",
                    "Withdraw consent where processing is based on consent",
                    "Request cessation of certain processing or marketing communications where applicable",
                    "Raise a complaint regarding the processing of your personal information",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-slate-600 text-sm">
                  Requests may be submitted using the contact details provided below. Where applicable, we may need to verify your identity before processing a request.
                </p>
              </div>
            </article>

            {/* Section 11 */}
            <article
              id="withdrawal"
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 scroll-mt-24 transition-all"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
                  11. Withdrawal of Consent
                </h2>
              </div>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
                <p>
                  Where we process personal information based on your consent, you may withdraw that consent by contacting us at{" "}
                  <a
                    href="mailto:info@srinirealty.in"
                    className="text-blue-600 hover:text-blue-700 font-medium underline"
                  >
                    info@srinirealty.in
                  </a>
                  .
                </p>
                <p>
                  Withdrawal of consent will not affect the lawfulness of processing carried out before the withdrawal.
                </p>
                <p>
                  Certain information may continue to be retained or processed where required or permitted by applicable law.
                </p>
              </div>
            </article>

            {/* Section 12 */}
            <article
              id="children"
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 scroll-mt-24 transition-all"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Baby className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
                  12. Children&apos;s Privacy
                </h2>
              </div>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
                <p>
                  Our Website and services are primarily intended for adults and prospective property customers.
                </p>
                <p>
                  We do not knowingly seek to collect personal information from children except where permitted by applicable law and with the appropriate consent or authorisation.
                </p>
                <p>
                  If you believe that personal information relating to a child has been provided to us improperly, please contact us so that we can review and take appropriate action.
                </p>
              </div>
            </article>

            {/* Section 13 */}
            <article
              id="third-party"
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 scroll-mt-24 transition-all"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <ExternalLink className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
                  13. Third-Party Websites and Services
                </h2>
              </div>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
                <p>
                  Our Website may contain links to third-party websites, social media platforms, payment services, maps, property portals or other external services.
                </p>
                <p>
                  We are not responsible for the privacy practices, security or content of third-party websites.
                </p>
                <p>
                  We recommend reviewing the privacy policies of third-party services before providing them with personal information.
                </p>
              </div>
            </article>

            {/* Section 14 */}
            <article
              id="disclaimers"
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 scroll-mt-24 transition-all"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
                  14. Property Information and Disclaimers
                </h2>
              </div>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
                <p>
                  Property information, including photographs, specifications, prices, availability, locations, amenities, dimensions, approvals and other project information displayed on our Website may be subject to change.
                </p>
                <p>
                  Users should independently verify relevant property, legal, title, approval, pricing and transaction information before making any investment or purchasing decision.
                </p>
                <p className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-sm font-medium">
                  This Privacy Policy does not constitute a property sale agreement or any other contractual commitment relating to a property.
                </p>
              </div>
            </article>

            {/* Section 15 */}
            <article
              id="changes"
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 scroll-mt-24 transition-all"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
                  15. Changes to this Privacy Policy
                </h2>
              </div>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in our business, Website, technology, legal requirements or applicable data-protection requirements.
                </p>
                <p>
                  The updated version will be published on this page with the revised “Last Updated” date.
                </p>
                <p>
                  We encourage you to periodically review this Privacy Policy.
                </p>
              </div>
            </article>

            {/* Section 16 */}
            <article
              id="contact"
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-blue-200 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30 scroll-mt-24 transition-all"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-500/20">
                  <Mail className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
                  16. Contact Us
                </h2>
              </div>
              <div className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
                <p>
                  If you have questions, concerns, requests or complaints regarding this Privacy Policy or the processing of your personal information, please contact us:
                </p>

                <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
                  <h3 className="font-heading text-lg font-bold text-slate-900">
                    Srini Realty Private Limited
                  </h3>
                  <div className="space-y-3 text-sm sm:text-base">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-slate-600">Email: </span>
                        <a
                          href="mailto:info@srinirealty.in"
                          className="text-blue-600 hover:text-blue-700 font-semibold underline"
                        >
                          info@srinirealty.in
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-slate-600">Phone: </span>
                        <a
                          href="tel:+917478997899"
                          className="text-blue-600 hover:text-blue-700 font-semibold"
                        >
                          +91 74 7899 7899
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-slate-600">Address: </span>
                        <span className="text-slate-800">
                          PE/14, 8-7-91/16, Phase 4, Hasthinapuram South, Hastinapuram, Hyderabad, Telangana 500070, India.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 pt-2 border-t border-slate-100">
                      <FileText className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-slate-600">Subject for Privacy Requests: </span>
                        <span className="font-semibold text-slate-900">
                          Privacy / Personal Data Request
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-slate-600 text-sm">
                  We will review and respond to privacy-related requests in accordance with applicable law.
                </p>
              </div>
            </article>

            {/* Section 17 */}
            <article
              id="applicable-law"
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 scroll-mt-24 transition-all"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Scale className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
                  17. Applicable Law
                </h2>
              </div>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
                <p>
                  This Privacy Policy shall be governed by the applicable laws of India.
                </p>
                <p>
                  Any disputes relating to privacy or personal data processing shall be subject to the applicable laws and jurisdiction of the competent courts/authorities in India.
                </p>
              </div>
            </article>

            {/* Copyright Statement */}
            <div className="text-center py-6 text-slate-500 text-sm border-t border-slate-200">
              © {new Date().getFullYear()} Srini Realty Private Limited. All Rights Reserved.
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}
