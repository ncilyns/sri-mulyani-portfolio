export const contact = {
  email: 'sri.mulyani003@binus.ac.id',
  linkedin: 'https://www.linkedin.com/in/sri-mulyani-6a5914260',
  instagram: 'https://www.instagram.com/ncilyns_/',
  instagramHandle: '@ncilyns_',
  // Put your CV at public/docs/cv-sri-mulyani.pdf, then set this to '/docs/cv-sri-mulyani.pdf'
  cvUrl: '',
}

export const hardSkills = [
  'SQL',
  'Python',
  'Power BI',
  'Tableau',
  'Excel',
  'Pentaho (ETL)',
  'Data warehouse and star schema',
  'Data cleaning and processing',
  'Data visualization',
  'Machine learning (scikit-learn)',
  'UML (draw.io)',
  'Figma',
]

export const softSkills = [
  'Leadership',
  'Team coordination',
  'Communication',
  'Cross-team collaboration',
  'Organization and time management',
  'Financial accuracy',
  'Mentoring',
]

export type Project = {
  id: string
  number: string
  title: string
  subtitle: string
  context: string
  pitch: string
  summary: string
  process: string[]
  tools: string[]
  insights: string[]
  highlights?: { label: string; value: string }[]
  metrics?: { label: string; detail: string }[]
  table?: { headers: string[]; rows: string[][] }
  links?: { label: string; href: string }[]
  layout: 'phone' | 'wide' | 'split'
}

export const projects: Project[] = [
  {
    id: 'book-crossing',
    number: '01',
    title: 'Book-Crossing ETL Pipeline and Dashboard',
    subtitle: 'From messy CSVs to a trusted analytics warehouse',
    context:
      'Data Engineering course, with Delyanis Nazwa Ghiffarini (Group 17). Written up as an IEEE-format paper.',
    pitch:
      'Built an end-to-end data pipeline that turns unreliable raw files into a clean, reusable data warehouse and Power BI dashboard. This project shows how I handle data quality, automation, and analytics readiness — core skills for Data Engineering internships.',
    summary:
      'The Book-Crossing dataset arrives as three unconnected CSV files with 140,990 records in total, and it has missing ISBNs, duplicates, unrealistic ages, and no guarantee that a rating points to a real book and user. We built an automated pipeline that turns it into a data warehouse behind a Power BI dashboard: 111,585 validated ratings for 496 books and 28,909 users.',
    process: [
      'Load the three raw CSVs into a MySQL raw layer, untouched.',
      'Clean them in a staging layer with three levels of validation: structural, domain, and referential integrity.',
      'Load the verified data into a star schema with surrogate keys: one fact table (fact_ratings) and two dimensions (dim_book, dim_user).',
      'Automate it: a single Pentaho Job runs nine transformations in dependency order and is idempotent, so it is safe to re-run.',
      'Build an interactive Power BI dashboard for book popularity, author engagement, reader demographics, and geography.',
    ],
    tools: ['Pentaho Data Integration', 'MySQL', 'Power BI', 'Star schema', 'ETL'],
    insights: [
      'Validate before you analyze. Broken joins and impossible values quietly distort any dashboard built on top of them.',
      'Keeping raw data untouched makes every cleaning rule re-runnable and auditable.',
      'Knowing the limits matters too. Our full-load strategy and row-oriented MySQL will not scale, so the next steps are incremental loading and columnar cloud storage.',
    ],
    highlights: [
      { label: 'Raw records', value: '140,990' },
      { label: 'Validated ratings', value: '111,585' },
      { label: 'Books', value: '496' },
      { label: 'Users', value: '28,909' },
    ],
    metrics: [
      { label: 'Raw layer (MySQL)', detail: '3 CSV files, 140,990 records, stored as-is' },
      { label: 'Staging', detail: 'validation: structural, domain, referential integrity' },
      { label: 'dim_book', detail: '496 books' },
      { label: 'fact_ratings', detail: '111,585 ratings' },
      { label: 'dim_user', detail: '28,909 users' },
      { label: 'Power BI dashboard', detail: 'popular books, authors, demographics, map' },
    ],
    links: [{ label: 'Final report (IEEE paper, PDF)', href: '/docs/book-crossing-report.pdf' }],
    layout: 'wide',
  },
  {
    id: 'subscriber-prediction',
    number: '02',
    title: 'Predicting Which Customers Will Subscribe',
    subtitle: 'Customer analytics that connects models to marketing decisions',
    context: 'Data Analytics course, individual report. Customer Shopping Behaviour dataset from Kaggle.',
    pitch:
      'Analyzed shopping behavior and built a subscription prediction model that finds high-potential customers, then translated the results into practical recommendations for marketing and finance — including the business risks of acting on the model.',
    summary:
      'Behavior analysis of 3,900 shoppers, aimed at finding who is likely to become a subscriber and turning that into campaign recommendations. The final model detects all 211 potential subscribers in the test set, with 86.41% accuracy and 91.40% AUC-ROC.',
    process: [
      'Check data quality. There were no missing values, duplicates, or outliers, but the purchase-frequency column had six labels for four meanings, which I merged and then verified.',
      'Engineer four features: Age Group, Purchase Frequency Tier, Loyalty Level, and Customer Segment.',
      'Explore by demographics, geography, and behavior, with Chi-Square tests and Cramér’s V to check relationships.',
      'Model with four algorithms (Logistic Regression, SVM, Random Forest, XGBoost) using Stratified 10-Fold Cross Validation. SMOTE ran inside an ImbPipeline so oversampling never touched validation data, and the best model was tuned with RandomizedSearchCV.',
      'Write two business recommendations for marketing and finance teams, including the risks of each.',
    ],
    tools: ['Python', 'pandas', 'scikit-learn', 'imbalanced-learn', 'XGBoost', 'Chi-Square test'],
    insights: [
      'Data that passes the usual checks can still hide problems. Duplicate labels only showed up when I looked at what the categories meant.',
      'The simplest model won. Logistic Regression caught 100% of subscribers, while Random Forest caught 87.68% and XGBoost 74.41%.',
      'Accuracy is not the whole story. Precision was 66.56%, so about a third of promotion budget guided by the model could be wasted, and I reported that cost openly.',
      'Surprising patterns deserve suspicion. Every subscriber in the data was male, which is most likely an artifact of synthetic data, so I flagged it for validation before anyone acts on it.',
    ],
    highlights: [
      { label: 'Shoppers', value: '3,900' },
      { label: 'Accuracy', value: '86.41%' },
      { label: 'AUC-ROC', value: '91.40%' },
      { label: 'Subscriber recall', value: '100%' },
    ],
    metrics: [
      { label: 'Logistic Regression (final model)', detail: '100% subscriber-class recall on the test set' },
      { label: 'Random Forest', detail: '87.68% subscriber-class recall' },
      { label: 'XGBoost', detail: '74.41% subscriber-class recall' },
    ],
    links: [
      { label: 'Final report (PDF)', href: '/docs/subscriber-prediction-report.pdf' },
      { label: 'Source notebook', href: '/docs/subscriber-prediction.ipynb' },
    ],
    layout: 'phone',
  },
  {
    id: 'movieai',
    number: '03',
    title: 'MovieAI: Sentiment Classification of Movie Reviews',
    subtitle: 'Making text classification clear and explainable',
    context: 'Google Colab notebook. IMDb dataset of 50,000 reviews.',
    pitch:
      'Developed a sentiment classification workflow that turns raw movie reviews into clear positive/negative predictions, with probability scores that are easy to explain to non-technical stakeholders.',
    summary:
      'A Naive Bayes model that reads an IMDb review and predicts whether the writer liked the movie, with 85.53% accuracy on 10,000 unseen reviews.',
    process: [
      'Explore the data: class balance and sample reviews from the top, middle, and end of the file.',
      'Preprocess the text with my own function: lowercase, strip HTML, punctuation, and digits, remove stopwords, and apply Snowball stemming. Histograms of review length before and after showed the effect.',
      'Turn text into TF-IDF features (5,000 features, unigrams and bigrams).',
      'Split 80/20 with stratification and train Multinomial Naive Bayes.',
      'Evaluate with a classification report and confusion matrix, then test on new sentences with a probability chart and a predict_sentiment function.',
    ],
    tools: ['Python', 'NLTK', 'scikit-learn', 'matplotlib', 'Google Colab'],
    insights: [
      'Preprocessing shapes a text model as much as the algorithm does, which is why I measured its effect instead of assuming it.',
      'Balanced classes gave balanced results: precision and recall stayed between 0.84 and 0.87 for both sentiments.',
      'Showing a probability, not just a label, makes a model easier to trust and to explain to someone who is not technical.',
    ],
    highlights: [
      { label: 'Reviews', value: '50,000' },
      { label: 'Accuracy', value: '85.53%' },
      { label: 'TF-IDF features', value: '5,000' },
    ],
    table: {
      headers: ['Class', 'Precision', 'Recall', 'F1'],
      rows: [
        ['Negative', '0.87', '0.84', '0.85'],
        ['Positive', '0.84', '0.87', '0.86'],
      ],
    },
    metrics: [
      {
        label: 'Example prediction',
        detail:
          'Tested with “This movie was boring and long”: the model gives a 73.5% chance of negative.',
      },
    ],
    links: [
      { label: 'Source notebook', href: '/docs/movieai.ipynb' },
    ],
    layout: 'split',
  },
  {
    id: 'isyaratku',
    number: '04',
    title: 'Isyaratku: An AI-Powered Sign Language Learning Platform',
    subtitle: 'Inclusive product design backed by real engineering',
    context:
      'Team project of 5 (Group 9), Software Engineering course. Aligned with SDG 4 (Quality Education) and SDG 10 (Reduced Inequalities).',
    pitch:
      'Collaborated on a full-stack learning platform that helps people practice sign language with instant webcam feedback. The work combines user-centered design, accessibility thinking, and practical AI integration in a real product setting.',
    summary:
      'A web app for learning sign language, built because people who are deaf or hard of hearing still struggle to communicate with the wider public, while most learning material is static images or video with no feedback. It runs in the browser, needs no extra hardware, and is designed to give instant feedback through the webcam.',
    process: [
      'Define the problem and the users: communication barriers, static materials, and no feedback when practicing.',
      'Design the UI/UX in Figma: clean, high-contrast, dark green with warm cream, so attention stays on the video and hand movements.',
      'Plan the architecture: HTML, CSS, and JavaScript frontend, a Django and FastAPI backend, SQLite storage, and a pre-trained Hugging Face model for alphabet gestures.',
      'Build the core pages: sign-up, A-Z and category dictionary, video quiz, progress dashboard, community hub, and profile settings.',
      'Run functional testing with two different accounts across every feature.',
    ],
    tools: ['Django', 'FastAPI', 'HTML, CSS, JavaScript', 'SQLite', 'Hugging Face', 'Figma', 'GitHub'],
    insights: [
      'Designing for a specific group changes real decisions. Because Deaf users rely on sight, we chose a calm, high-contrast look instead of a busy one.',
      'Using a pre-trained model let the team spend its time on the product around the AI instead of training one from scratch.',
      'Testing with two accounts is what proves shared features work, such as a community post appearing instantly for another user.',
    ],
    metrics: [
      { label: 'Frontend', detail: 'HTML, CSS, JavaScript' },
      { label: 'Backend', detail: 'Django and FastAPI' },
      { label: 'AI module', detail: 'Hugging Face model' },
      { label: 'Database', detail: 'SQLite' },
    ],
    links: [
      { label: 'Project document (PDF)', href: '/docs/isyaratku.pdf' },
      {
        label: 'View GitHub repository',
        href: 'https://github.com/AlbertNC12/SE-Project',
      },
      {
        label: 'View Figma design',
        href: 'https://www.figma.com/design/dgPqsygMQZc8GC1curW9pm/Isyaratku---Kelompok-9?node-id=0-1',
      },
    ],
    layout: 'phone',
  },
  {
    id: 'battery-rental',
    number: '05',
    title: 'Analysis and Design of a Battery Rental System',
    subtitle: 'Clear system thinking before a single line of code',
    context: 'A draw.io document with 15 pages of diagrams.',
    pitch:
      'Mapped a complete battery rental business into structured UML models covering customer and admin journeys. This demonstrates how I break down complex operations into clear processes, data relationships, and status rules — useful before building or improving operational systems.',
    summary:
      'A complete UML model for a service that rents, sells, and buys back batteries. It serves two roles: customers (rent, pay a deposit, return, buy, and sell an old battery) and admins (manage rentals, deposits, purchases, delivery, pickup, returns, and old-battery sales).',
    process: [
      'Identify the actors and their use cases, with include and extend relations.',
      'Break every business flow into its own activity diagram, 12 in total: 5 for customers and 7 for admins.',
      'Model the data and responsibilities in a class diagram of 11 classes, including Battery, BatteryRental, Deposit, Delivery, and Return.',
      'Model a battery’s life with a state transition diagram covering rented, returned, inspected, and sold.',
    ],
    tools: ['UML', 'draw.io'],
    insights: [
      'One diagram per business flow makes each role’s steps and decisions easy to check.',
      'Giving rentals, purchases, sales, and deposits their own classes shows how one asset, the battery, moves through several processes.',
      'A state diagram keeps inventory logic honest, because a battery’s status changes differently depending on the process it is in.',
    ],
    table: {
      headers: ['Diagram', 'Count', 'Content'],
      rows: [
        ['Use case', '1', 'Admin and customer actors, with include and extend relations'],
        ['Activity', '12', '5 customer flows and 7 admin management flows'],
        ['Class', '1', '11 classes, including Battery, BatteryRental, Deposit, Delivery, and Return'],
        ['State transition', '1', 'Battery status while rented, returned, inspected, and sold'],
      ],
    },
    links: [
      { label: 'UML diagrams (draw.io)', href: '/docs/battery-rental.drawio' },
    ],
    layout: 'wide',
  },
  {
    id: 'sigma-coffee',
    number: '06',
    title: 'Sigma Coffee: UI Design for a Coffee Ordering App',
    subtitle: 'A mobile ordering experience designed for speed and retention',
    context:
      'Human and Computer Interaction course, BINUS Bandung, even semester 2024/2025. Team of 4.',
    pitch:
      'Designed a complete coffee ordering app experience focused on busy users who want pickup or delivery without waiting in line. The flow covers customization, payment, tracking, and loyalty — showing how I connect user needs to a clear product journey.',
    summary:
      'A mobile app design that lets people order coffee ahead and either pick it up or have it delivered. Ordering in person can be slow for people in a hurry, so the target users are 18 to 25 years old, with pricing that works for workers and stays within a student’s budget.',
    process: [
      'Define the target users and the motivation: busy people who want to skip the queue or the trip.',
      'Plan ten features covering the whole journey, from splash screen and onboarding to order tracking and profile settings.',
      'Design the screens in Figma with a dark, minimal style, card-based layouts, and gray accents for active choices.',
      'Detail the key flows: drink customization (size, beans, sugar, ice), checkout with pick-up or delivery, payment by QRIS, mobile banking, or e-wallet, and a loyalty program with tiers, stamps, and daily check-ins.',
    ],
    tools: ['Figma', 'Interaction design guidelines', 'User-centered design'],
    insights: [
      'For users in a hurry, every extra step costs orders, so the flow from menu to payment has to stay short and clear.',
      'Personalizing at onboarding, such as choosing a flavor profile, gets preferences in early and makes the app feel made for the user.',
      'Loyalty features (tiers, stamps, daily check-ins) are about bringing people back, not just about taking one order.',
    ],
    metrics: [
      { label: 'Splash and onboarding', detail: 'First impression and preference capture' },
      { label: 'Sign up or log in', detail: 'Account entry' },
      { label: 'Home and menu', detail: 'Browse drinks' },
      { label: 'Customize drink', detail: 'Size, beans, sugar, ice' },
      { label: 'Checkout', detail: 'Pick-up or delivery' },
      { label: 'Pay', detail: 'QRIS, mobile banking, or e-wallet' },
      { label: 'Track order and invoice', detail: 'Post-purchase journey' },
    ],
    links: [
      { label: 'Design document (PDF)', href: '/docs/sigma-coffee.pdf' },
      {
        label: 'Open Figma prototype',
        href: 'https://www.figma.com/proto/5JizyTQfcAsg7OBY12peQD/AOL-HCI-KOPI?node-id=0-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=72%3A2&show-proto-sidebar=1',
      },
    ],
    layout: 'phone',
  },
]

export type Experience = {
  id: string
  role: string
  org: string
  period?: string
  bullets: string[]
  images?: string[]
  links?: { label: string; href: string }[]
}

export const experiences: Experience[] = [
  {
    id: 'himti-pubmar',
    role: 'Manager of Publication & Marketing',
    org: 'HIMTI BINUS University',
    period: 'January 2026 to present',
    bullets: [
      'Lead a 12-member team that plans and runs publication and marketing for HIMTI events, from content calendars to media partnerships and sponsorship proposals.',
      'Assign tasks, set timelines, and review every deliverable before it goes out.',
      'Coordinate with every event division so promotion, content, and social media stay on schedule.',
    ],
  },
  {
    id: 'hilet-2026',
    role: 'Staff of Registration Division',
    org: 'HILET 2026: Interstellar Leadership Mission, HIMTI BINUS University',
    period: 'December 2025',
    bullets: [
      'Supported the registration and administrative processes for HILET 2026: Interstellar Leadership Mission.',
      'Managed participant data and assisted with registration administration.',
      'Supported the event team in maintaining an organized registration process.',
    ],
    links: [{ label: 'Certificate / documentation', href: '/docs/hilet.pdf' }],
  },
  {
    id: 'sesvent-2025',
    role: 'Coordinator of Registration & Finance Division',
    org: 'HIMTI SESVENT JKT-BDG 2025, HIMTI BINUS University',
    period: 'October 2025',
    bullets: [
      'Coordinated the Registration and Finance Division for HIMTI SESVENT JKT-BDG 2025.',
      'Managed participant registration and maintained participant data to support an organized registration process.',
      'Coordinated financial administration and monitored financial activities throughout the event.',
      'Collaborated with other event divisions to support overall event operations.',
    ],
    links: [{ label: 'Certificate / documentation', href: '/docs/sesvent.pdf' }],
  },
  {
    id: 'alumni-legacy',
    role: 'Treasurer & Usher',
    org: 'Alumni Legacy, BINUS Bandung',
    bullets: [
      'Managed financial records and recaps for the Alumni Legacy event at BINUS Bandung, including event-related income and expenses.',
      'Organized financial data and supported the coordination of financial needs throughout the event.',
      'Served as an usher, assisting and guiding guests while supporting smooth event operations.',
    ],
    images: ['alumni-legacy-1', 'alumni-legacy-2'],
  },
  {
    id: 'freshmen-partner',
    role: 'Freshmen Partner',
    org: 'BINUS University',
    bullets: [
      'Monitored and supported freshmen throughout their transition into university life and the academic environment.',
      'Assisted freshmen in adapting to the university learning system, academic activities, and campus environment.',
      'Provided guidance and practical information to help freshmen navigate their early college experience.',
      'Served as a teaching assistant and mentor by assisting freshmen during learning activities and addressing their questions when needed.',
    ],
    images: ['freshmen-partner-1', 'freshmen-partner-2'],
  },
]

export const aboutParagraphs = [
  'I’m a fifth-semester Computer Science student at BINUS University, specializing in Database Technology. What draws me to data is the full journey: collecting it, cleaning it, and turning it into something a team can use to make a decision.',
  'My coursework and projects cover SQL, Python, ETL with Pentaho, star-schema warehousing, Power BI and Tableau dashboards, and machine learning with scikit-learn. I care about data quality first, because a polished dashboard on unreliable data misleads people.',
  'Outside class, I lead the Publication & Marketing team at HIMTI and have coordinated registration and finance for large student events. That work taught me to plan, communicate clearly, and be accountable for numbers.',
  'I’m looking for an internship in Data Engineering, Data Analytics, or Business Analytics where I can learn from experienced teams and contribute to real projects. Let’s connect!',
]
