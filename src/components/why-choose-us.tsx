const WhyChooseUs = () => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-4xl md:text-7xl font-bold mb-8 tracking-wide uppercase bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent italic underline">
            Why Choose Us
          </h2>{" "}
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            A better way to achieve your goals
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-700 lg:mx-auto">
            We offer a unique approach that combines expertise, innovation, and
            a commitment to your success.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  {/* Heroicon name: outline/globe-alt */}
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 12a9 9 0 01-9 9m-9-9a9 9 0 019-9m-3 9h.01M21 12a9 9 0 00-9-9m9 9V3m0 9h.01M3 12a9 9 0 009 9m-9-9V3m0 9h.01"
                    />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Global Reach
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-700">
                Our services extend across the globe, providing solutions
                tailored to diverse markets and cultures.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  {/* Heroicon name: outline/scale */}
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.002 0M3 6V4m0 2L5 8m-3 9l3 1m0 0l-3-9a5.002 5.002 0 006.002 0M3 18v2m6-11l3-1m0 0l-3 9a5.002 5.002 0 006.002 0M9 7v2m6-11l3 1m0 0l-3 9a5.002 5.002 0 006.002 0M15 6v2m-3 3l3 1m0 0l-3-9a5.002 5.002 0 006.002 0M12 9v2"
                    />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Unmatched Expertise
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-700">
                Our team comprises seasoned professionals with deep knowledge
                and experience in their respective fields.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  {/* Heroicon name: outline/lightning-bolt */}
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Innovative Solutions
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-700">
                We leverage cutting-edge technologies and creative strategies to
                deliver innovative solutions that drive results.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  {/* Heroicon name: outline/annotation */}
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2H9l-4 4z"
                    />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Client-Centric Approach
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-700">
                Your success is our priority. We work closely with you to
                understand your needs and tailor our services accordingly.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
