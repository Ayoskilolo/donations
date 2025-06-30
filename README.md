# Vue Donation Progress Tracker

A modern, responsive donation tracking application built with Vue 3, featuring admin controls, multi-currency support, and fluid animations.

## Features

- 🎯 **Campaign Management**: Create and manage donation campaigns
- 💰 **Multi-Currency Support**: Support for NGN, USD, and GBP
- 📊 **Real-time Progress Tracking**: Animated progress bars with fluid effects
- 👥 **Admin Dashboard**: Approve donations, manage campaigns, add direct donations
- 🌙 **Dark Mode**: Toggle between light and dark themes
- 📱 **Responsive Design**: Works on all device sizes
- 🎨 **Themed Illustrations**: Custom SVG illustrations
- 📄 **Receipt Generation**: Generate downloadable donation receipts

## Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide Vue** - Beautiful icons
- **Vite** - Fast build tool

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone or download the project
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

\`\`\`bash
npm run build
\`\`\`

## Usage

### For Donors

1. Visit the home page to see campaign progress
2. Click "Donate Now" to make a donation
3. Fill in donation details and upload proof of transfer
4. Download your receipt after submission

### For Admins

1. Click the settings icon in the header
2. Login with credentials: `admin` / `password`
3. Manage campaign settings, approve donations, or add direct donations

## Configuration

### Currency

The admin can change the campaign currency from the Campaign Settings tab. Supported currencies:
- **NGN** - Nigerian Naira (₦)
- **USD** - US Dollar ($)
- **GBP** - British Pounds (£)

### Bank Details

Bank account information is automatically updated based on the selected currency:
- **NGN**: First Bank Nigeria
- **USD**: Chase Bank
- **GBP**: Barclays Bank

### Demo Data

The application comes with sample data including:
- Sample campaign with ₦5,000,000 target
- Mock donations and pending approvals
- Demo admin credentials

## File Structure

\`\`\`
vue-donation-tracker/
├── public/
├── src/
│   ├── App.vue          # Main application component
│   ├── main.js          # Application entry point
│   └── style.css        # Global styles and animations
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
├── vite.config.js       # Vite build configuration
└── README.md           # This file
\`\`\`

## Customization

### Colors

The application uses a custom color scheme defined in `tailwind.config.js`:
- Primary Red: `#dd3523`
- Primary Orange: `#fa6900`

### Animations

Custom animations are defined in both `tailwind.config.js` and `src/style.css`:
- Progress bar gradient shifts
- Wave animations
- Shine effects
- Pulse animations

### Illustrations

SVG illustrations are embedded as Vue components within `App.vue` and can be customized by modifying the SVG paths and colors.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please create an issue in the project repository.
\`\`\`

## 📁 **Complete Project Structure:**
- **package.json** - All dependencies and scripts
- **Vite config** - Modern build setup
- **Tailwind config** - Custom colors and animations
- **Main Vue app** - Complete single-file component
- **Comprehensive README** - Setup and usage instructions

## 🚀 **Ready to Run:**
1. Download the project folder
2. Run `npm install`
3. Run `npm run dev`
4. Open `http://localhost:3000`

## ✨ **Features Included:**
- Multi-currency support (NGN default)
- Admin-controlled currency settings
- Fluid progress bar animations
- Dark mode support
- Responsive design
- Receipt generation
- Complete admin dashboard

The project is now ready for download and deployment! You can click the "Download Code" button to get the complete folder structure.
