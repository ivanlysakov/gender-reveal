# 👶 Olha & Ivan's Gender Reveal Website

A beautiful, interactive gender reveal website built with Next.js, Tailwind CSS, and Convex. This website allows friends and family to participate in the excitement of Olha and Ivan's gender reveal celebration, even from afar.

## ✨ Features

- **Countdown Timer** - Building excitement for the big reveal
- **Interactive Guessing Game** - Friends can vote on whether it's a boy or girl
- **RSVP System** - Guest attendance confirmation with real-time stats
- **Photo Gallery** - Pregnancy journey and ultrasound photos
- **Reveal Section** - For the big moment with animated celebration
- **Personal Message** - Heartfelt message from Olha and Ivan
- **Responsive Design** - Beautiful on all devices

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Convex (real-time database)
- **Deployment**: Vercel
- **Images**: Next.js Image Optimization

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Convex account

### Installation

1. Clone the repository
   \`\`\`bash
   git clone <repository-url>
   cd gender-reveal-site
   \`\`\`

2. Install dependencies
   \`\`\`bash
   npm install
   \`\`\`

3. Set up Convex
   \`\`\`bash
   npx convex dev
   \`\`\`

4. Start the development server
   \`\`\`bash
   npm run dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

\`\`\`
gender-reveal-site/
├── src/
│ ├── app/
│ │ ├── page.tsx # Main homepage
│ │ ├── layout.tsx # Root layout
│ │ └── globals.css # Global styles
│ └── components/
│ ├── CountdownTimer.tsx # Countdown to reveal
│ ├── GuessingGame.tsx # Gender prediction game
│ ├── RSVPSection.tsx # RSVP management
│ ├── PhotoGallery.tsx # Photo gallery
│ └── RevealSection.tsx # The big reveal
├── convex/
│ ├── schema.ts # Database schema
│ ├── party.ts # Party management functions
│ ├── guesses.ts # Guessing game functions
│ └── rsvp.ts # RSVP functions
├── public/ # Static assets
└── package.json
\`\`\`

## 🔧 Configuration

### Environment Variables

Create a \`.env.local\` file in the root directory:

\`\`\`
CONVEX_DEPLOYMENT=your-convex-deployment-url
NEXT_PUBLIC_CONVEX_URL=your-convex-public-url
\`\`\`

### Customizing the Website

1. **Party Details**: Update the date, time, and location in the components
2. **Photos**: Replace the mock photos with your actual pregnancy photos
3. **Colors**: Modify the Tailwind classes to match your preferred color scheme
4. **Content**: Update the personal message and any text content

## 🚀 Deployment

### Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Set up your environment variables in Vercel dashboard
3. Deploy automatically on every push to main branch

### Manual Deployment

\`\`\`bash
npm run build
npm run start
\`\`\`

## 📱 Features in Detail

### Guessing Game

- Real-time voting statistics
- Interactive boy/girl selection
- Personal messages from guests
- Live results dashboard

### RSVP System

- Email validation
- Attendance tracking
- Guest message collection
- Real-time attendance stats

### Photo Gallery

- Category filtering (Pregnancy, Ultrasounds, General)
- Modal view for full-size images
- Responsive grid layout
- Smooth animations

### Countdown Timer

- Real-time countdown to reveal
- Beautiful animated display
- Mobile-responsive design
- Customizable target date

## 🎨 Design Features

- **Gradient Backgrounds**: Beautiful pink/blue gradients
- **Glass Morphism**: Modern backdrop-blur effects
- **Smooth Animations**: Hover effects and transitions
- **Mobile-First**: Responsive design for all devices
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 📊 Database Schema

The Convex database includes:

- **Party**: Event details and settings
- **RSVPs**: Guest attendance responses
- **Guesses**: Gender predictions from guests
- **Photos**: Gallery images with categories
- **Wishes**: Congratulatory messages

## 🎉 Special Thanks

Built with love for Olha and Ivan's special moment. This website brings together friends and family from around the world to celebrate their exciting journey into parenthood.

## 📞 Support

For any questions or issues, feel free to reach out to the development team.

---

**Made with 💕 for Olha & Ivan's Baby Reveal**
