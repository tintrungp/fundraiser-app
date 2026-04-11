export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">About</h1>

      <div className="prose prose-gray max-w-none">
        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 mb-4">
            Welcome to our ministry. We are dedicated to serving and making a
            difference through faith, community, and action.
          </p>
          <p className="text-gray-600">
            This is where you can share more about yourself, your calling, and
            what drives your ministry work.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Our Story
          </h2>
          <p className="text-gray-600 mb-4">
            Share your personal story and journey here. Talk about how you were
            called to this work and what impact you hope to make.
          </p>
          <p className="text-gray-600">
            Add details about your background, experiences, and what makes your
            ministry unique.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Get Involved
          </h2>
          <p className="text-gray-600 mb-4">
            We invite you to join us in this journey through prayer and support.
          </p>
          <p className="text-gray-600">
            Visit our Prayer and Fundraiser pages to learn more about how you
            can be part of what God is doing through this ministry.
          </p>
        </div>
      </div>
    </div>
  );
}
