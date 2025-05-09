// src/app/privacy-policy/page.jsx

export const metadata = {
  title: 'Privacy Policy — ExecAndMe',
}

export default function PrivacyPolicy() {
  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>

      <h2 className="text-xl font-semibold mt-6 mb-2">Data We Collect</h2>
      <ul className="list-disc list-inside mb-4">
        <li>First name, last name</li>
        <li>Profile picture URL</li>
        <li>Headline (job title)</li>
        <li>Email address</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Your Data</h2>
      <p className="mb-4">
        We use your LinkedIn data to create and personalize your ExecAndMe profile,
        and to send you occasional email notifications about feature updates.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Data Sharing</h2>
      <p className="mb-4">
        We do not sell or share your LinkedIn data with any third parties except
        our analytics partner (Google Analytics), and only in anonymized form.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Retention</h2>
      <p className="mb-4">
        We retain your profile information as long as you have an ExecAndMe account.
        To delete your data, please email <a href="mailto:privacy@execandme.com">privacy@execandme.com</a>.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Security</h2>
      <p className="mb-4">
        All data is transmitted over HTTPS and stored encrypted at rest.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Your Rights & Contact</h2>
      <p>
        You can view, update, or delete your information via your Account settings.
        For any other privacy-related inquiries or data requests, contact us at 
        <a href="mailto:privacy@execandme.com"> privacy@execandme.com</a>.
      </p>
    </main>
  )
}
