import { Link } from 'react-router-dom';

function Home() {
  const styles = {
    home: {
      width: '100%',
    },
    hero: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '80px 60px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      minHeight: '600px',
      gap: '60px',
    },
    heroContent: {
      flex: 1,
      maxWidth: '600px',
    },
    heroBadge: {
      display: 'inline-block',
      background: 'rgba(255, 255, 255, 0.2)',
      padding: '8px 20px',
      borderRadius: '50px',
      fontSize: '14px',
      marginBottom: '20px',
      backdropFilter: 'blur(10px)',
    },
    heroTitle: {
      fontSize: '56px',
      fontWeight: '800',
      lineHeight: '1.2',
      marginBottom: '20px',
    },
    highlight: {
      color: '#ffd700',
      textDecoration: 'underline',
      textDecorationColor: '#ffd700',
      textDecorationThickness: '4px',
    },
    heroDescription: {
      fontSize: '18px',
      lineHeight: '1.6',
      marginBottom: '30px',
      opacity: '0.95',
    },
    heroButtons: {
      display: 'flex',
      gap: '15px',
      marginBottom: '40px',
    },
    btnPrimary: {
      padding: '14px 32px',
      borderRadius: '8px',
      textDecoration: 'none',
      fontWeight: '600',
      fontSize: '16px',
      background: 'white',
      color: '#667eea',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
      transition: 'all 0.3s ease',
      display: 'inline-block',
    },
    btnSecondary: {
      padding: '14px 32px',
      borderRadius: '8px',
      textDecoration: 'none',
      fontWeight: '600',
      fontSize: '16px',
      background: 'transparent',
      color: 'white',
      border: '2px solid white',
      transition: 'all 0.3s ease',
      display: 'inline-block',
    },
    heroStats: {
      display: 'flex',
      gap: '40px',
      marginTop: '20px',
    },
    statItem: {
      textAlign: 'center',
    },
    statNumber: {
      fontSize: '32px',
      fontWeight: '700',
      marginBottom: '5px',
    },
    statText: {
      fontSize: '14px',
      opacity: '0.9',
    },
    heroImage: {
      flex: 1,
      position: 'relative',
      height: '400px',
    },
    floatingCard: {
      position: 'absolute',
      background: 'white',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      color: '#333',
    },
    card1: {
      top: '50px',
      left: '0',
    },
    card2: {
      top: '180px',
      right: '50px',
    },
    card3: {
      bottom: '50px',
      left: '80px',
    },
    cardIcon: {
      fontSize: '36px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      width: '60px',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '10px',
    },
    cardContent: {
      textAlign: 'left',
    },
    cardTitle: {
      margin: '0',
      fontSize: '16px',
      color: '#333',
      fontWeight: '600',
    },
    cardSubtitle: {
      margin: '5px 0 0 0',
      fontSize: '14px',
      color: '#666',
    },
    featuresSection: {
      padding: '80px 60px',
      background: '#f8f9fa',
      textAlign: 'center',
    },
    sectionTitle: {
      fontSize: '42px',
      fontWeight: '700',
      color: '#333',
      marginBottom: '10px',
    },
    sectionSubtitle: {
      fontSize: '18px',
      color: '#666',
      marginBottom: '50px',
    },
    features: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '30px',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    feature: {
      background: 'white',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
      transition: 'all 0.3s ease',
      textAlign: 'center',
    },
    featureIcon: {
      fontSize: '48px',
      marginBottom: '15px',
    },
    featureTitle: {
      fontSize: '22px',
      color: '#333',
      marginBottom: '10px',
      fontWeight: '600',
    },
    featureText: {
      fontSize: '15px',
      color: '#666',
      lineHeight: '1.6',
    },
    howItWorks: {
      padding: '80px 60px',
      background: 'white',
      textAlign: 'center',
    },
    steps: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
      flexWrap: 'wrap',
    },
    step: {
      flex: 1,
      minWidth: '200px',
      padding: '30px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      borderRadius: '12px',
      transition: 'all 0.3s ease',
    },
    stepNumber: {
      width: '50px',
      height: '50px',
      background: 'white',
      color: '#667eea',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      fontWeight: '700',
      margin: '0 auto 15px',
    },
    stepTitle: {
      fontSize: '20px',
      marginBottom: '10px',
      fontWeight: '600',
    },
    stepText: {
      fontSize: '14px',
      opacity: '0.9',
    },
    stepArrow: {
      fontSize: '32px',
      color: '#667eea',
      fontWeight: '700',
    },
    ctaSection: {
      padding: '80px 60px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      textAlign: 'center',
    },
    ctaTitle: {
      fontSize: '42px',
      marginBottom: '15px',
      fontWeight: '700',
    },
    ctaText: {
      fontSize: '18px',
      marginBottom: '30px',
      opacity: '0.9',
    },
    btnLarge: {
      background: 'white',
      color: '#667eea',
      padding: '18px 40px',
      fontSize: '18px',
      fontWeight: '700',
      borderRadius: '8px',
      textDecoration: 'none',
      display: 'inline-block',
      transition: 'all 0.3s ease',
    },
  };

  return (
    <div style={styles.home}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <span style={styles.heroBadge}>🚀 Your Career Journey Starts Here</span>
          <h1 style={styles.heroTitle}>
            Find Your <span style={styles.highlight}>Dream Job</span> Today
          </h1>
          <p style={styles.heroDescription}>
            Connect with top companies and explore thousands of job opportunities across various industries. 
            Your next career move is just a click away.
          </p>
          <div style={styles.heroButtons}>
            <Link to="/jobs" style={styles.btnPrimary}>
              🔍 Browse Jobs
            </Link>
            <Link to="/signup" style={styles.btnSecondary}>
              💼 Post a Job
            </Link>
          </div>
          <div style={styles.heroStats}>
            <div style={styles.statItem}>
              <h3 style={styles.statNumber}>10,000+</h3>
              <p style={styles.statText}>Active Jobs</p>
            </div>
            <div style={styles.statItem}>
              <h3 style={styles.statNumber}>5,000+</h3>
              <p style={styles.statText}>Companies</p>
            </div>
            <div style={styles.statItem}>
              <h3 style={styles.statNumber}>50,000+</h3>
              <p style={styles.statText}>Job Seekers</p>
            </div>
          </div>
        </div>
        <div style={styles.heroImage}>
          <div style={{...styles.floatingCard, ...styles.card1}}>
            <div style={styles.cardIcon}>💻</div>
            <div style={styles.cardContent}>
              <h4 style={styles.cardTitle}>Software Engineer</h4>
              <p style={styles.cardSubtitle}>Google • ₹15L/year</p>
            </div>
          </div>
          <div style={{...styles.floatingCard, ...styles.card2}}>
            <div style={styles.cardIcon}>🎨</div>
            <div style={styles.cardContent}>
              <h4 style={styles.cardTitle}>UI/UX Designer</h4>
              <p style={styles.cardSubtitle}>Microsoft • ₹12L/year</p>
            </div>
          </div>
          <div style={{...styles.floatingCard, ...styles.card3}}>
            <div style={styles.cardIcon}>📊</div>
            <div style={styles.cardContent}>
              <h4 style={styles.cardTitle}>Data Analyst</h4>
              <p style={styles.cardSubtitle}>Amazon • ₹13L/year</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={styles.featuresSection}>
        <h2 style={styles.sectionTitle}>Why Choose Our Platform?</h2>
        <p style={styles.sectionSubtitle}>Everything you need to accelerate your career</p>
        <div style={styles.features}>
          <div style={styles.feature}>
            <div style={styles.featureIcon}>🔍</div>
            <h3 style={styles.featureTitle}>Smart Job Search</h3>
            <p style={styles.featureText}>Find jobs by title, location, salary, and job type with advanced filtering options</p>
          </div>
          <div style={styles.feature}>
            <div style={styles.featureIcon}>📝</div>
            <h3 style={styles.featureTitle}>Easy Application</h3>
            <p style={styles.featureText}>Apply to multiple jobs with one click and track all your applications in one place</p>
          </div>
          <div style={styles.feature}>
            <div style={styles.featureIcon}>📊</div>
            <h3 style={styles.featureTitle}>Real-time Tracking</h3>
            <p style={styles.featureText}>Monitor your application status and get instant notifications on updates</p>
          </div>
          <div style={styles.feature}>
            <div style={styles.featureIcon}>🏢</div>
            <h3 style={styles.featureTitle}>Top Companies</h3>
            <p style={styles.featureText}>Access job openings from leading companies across various industries</p>
          </div>
          <div style={styles.feature}>
            <div style={styles.featureIcon}>⚡</div>
            <h3 style={styles.featureTitle}>Quick Process</h3>
            <p style={styles.featureText}>Streamlined application process that saves your time and effort</p>
          </div>
          <div style={styles.feature}>
            <div style={styles.featureIcon}>🔒</div>
            <h3 style={styles.featureTitle}>Secure & Private</h3>
            <p style={styles.featureText}>Your personal information is protected with enterprise-grade security</p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div style={styles.howItWorks}>
        <h2 style={styles.sectionTitle}>How It Works</h2>
        <div style={styles.steps}>
          <div style={styles.step}>
            <div style={styles.stepNumber}>1</div>
            <h3 style={styles.stepTitle}>Create Account</h3>
            <p style={styles.stepText}>Sign up in seconds and build your profile</p>
          </div>
          <div style={styles.stepArrow}>→</div>
          <div style={styles.step}>
            <div style={styles.stepNumber}>2</div>
            <h3 style={styles.stepTitle}>Search Jobs</h3>
            <p style={styles.stepText}>Browse thousands of job listings</p>
          </div>
          <div style={styles.stepArrow}>→</div>
          <div style={styles.step}>
            <div style={styles.stepNumber}>3</div>
            <h3 style={styles.stepTitle}>Apply & Track</h3>
            <p style={styles.stepText}>Submit applications and monitor status</p>
          </div>
          <div style={styles.stepArrow}>→</div>
          <div style={styles.step}>
            <div style={styles.stepNumber}>4</div>
            <h3 style={styles.stepTitle}>Get Hired</h3>
            <p style={styles.stepText}>Land your dream job!</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Ready to Take the Next Step?</h2>
        <p style={styles.ctaText}>Join thousands of job seekers who found their perfect match</p>
        <Link to="/signup" style={styles.btnLarge}>Get Started Now - It's Free!</Link>
      </div>
    </div>
  );
}

export default Home;
