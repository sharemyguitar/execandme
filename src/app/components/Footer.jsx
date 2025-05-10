'use client'

export default function Footer() {
  return (
    <footer>
      {/* Top info section */}
      <div className="footer-info">
        {/* 1) Mailing list & CTAs */}
        <div className="footer-subscribe">
          <h3>Join our mailing list</h3>
          <p>Be the first to know about the newest Execs & deals.</p>
          <form className="subscribe-form">
            <input type="email" placeholder="Your email" />
            <button type="submit">→</button>
          </form>
          <small>Emails subject to <a href="/privacy-policy">privacy policy</a></small>
          <div className="footer-ctas">
            <button className="btn btn-join">Join as Exec</button>
            <button className="btn btn-partner">Become a Partner</button>
          </div>
        </div>

        {/* 2) Links columns */}
        <div className="footer-links">
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="/about">About</a></li>
              <li><a href="/team">Team</a></li>
              <li><a href="/careers">Jobs</a></li>
              <li><a href="/blog">Blog</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li><a href="/help">Help</a></li>
              <li><a href="/accessibility">Accessibility</a></li>
              <li><a href="/refunds">Refunds & Returns</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Shop</h4>
            <ul>
              <li><a href="/gift-cards">Gift Cards</a></li>
              <li><a href="/business">For Business</a></li>
              <li><a href="/kids">For Kids</a></li>
            </ul>
          </div>
        </div>

        {/* 3) App badges & social */}
        <div>
          <div className="footer-apps">
            <img src="/apps/appstore.png" alt="Download on the App Store" />
            <img src="/apps/playstore.png" alt="Get it on Google Play" />
          </div>
          <div className="footer-social">
            <a href="#"><img src="/icons/twitter.png" alt="Twitter" /></a>
            <a href="#"><img src="/icons/linkedin-signin.png" alt="LinkedIn" /></a>
            <a href="#"><img src="/icons/facebook.png" alt="Facebook" /></a>
          </div>
        </div>
      </div>

      {/* Bottom legal bar */}
      <div className="footer-bottom">
        <div className="legal">
          <a href="/terms">Terms</a> • <a href="/privacy-policy">Privacy</a>
        </div>
        <div className="locale">
          EN | United States | $ USD
        </div>
      </div>
    </footer>
  )
}
