# Western Style Portfolio

A portfolio website with a western theme, built with Next.js, Tailwind CSS, Framer Motion, and Prisma.

## Features

- Responsive design
- Smooth animations with Framer Motion
- Western-themed UI
- Database integration with Prisma
- API routes for data fetching and form submissions
- Email notifications for contact form submissions

## Getting Started

### Prerequisites

- Node.js 18.x or later
- PostgreSQL database

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/western-style-portfolio.git
cd western-style-portfolio
```

2. Install dependencies:

```bash
npm install
```

3. Set up the database:

#### Option 1: Using the setup script (recommended)

Run the setup script and follow the prompts:

```bash
./scripts/setup-db.sh
```

This script will:
- Create a PostgreSQL database
- Generate the `.env` file with your database credentials
- Generate the Prisma client
- Push the schema to the database
- Seed the database with initial data

#### Option 2: Manual setup

Create a `.env` file in the root directory with the following variables:

```
DATABASE_URL="postgresql://username:password@localhost:5432/portfolio"
DIRECT_URL="postgresql://username:password@localhost:5432/portfolio"
```

Replace `username`, `password`, and `portfolio` with your PostgreSQL credentials and database name.

Then run:

```bash
npx prisma generate
npx prisma db push
npm run seed
```

4. Configure email settings (optional):

To enable email notifications for contact form submissions, add the following to your `.env` file:

```
# Email Configuration
ADMIN_EMAIL="your-email@example.com"
EMAIL_FROM="noreply@yourdomain.com"
EMAIL_FROM_NAME="Your Portfolio"

# SMTP Configuration (for production)
EMAIL_SERVER="smtp.example.com"
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USERNAME="your-smtp-username"
EMAIL_PASSWORD="your-smtp-password"
```

For development, you can use Ethereal Email (a fake SMTP service):

```
# Ethereal Email (for development)
ETHEREAL_EMAIL="ethereal.user@ethereal.email"
ETHEREAL_PASSWORD="ethereal_password"
```

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Database Schema

The project uses Prisma ORM with PostgreSQL. The schema includes:

- **Project**: Portfolio projects with details like title, description, technologies, and links
- **Experience**: Work experience entries
- **Achievement**: Notable accomplishments and awards
- **Contact**: Form submissions from the contact form
- **SocialLink**: Social media links

## Email Functionality

The contact form sends two emails when submitted:

1. **Notification Email**: Sent to the site owner (specified by `ADMIN_EMAIL`) with the contact form details
2. **Confirmation Email**: Sent to the person who submitted the form, confirming receipt of their message

Email templates are styled to match the western theme of the website.

## Customizing Content

You can customize the content by:

1. Updating the database records directly using a PostgreSQL client
2. Using the Prisma Studio UI:

```bash
npx prisma studio
```

3. Modifying the seed file (`prisma/seed.ts`) and running `npm run seed` again

## Deployment

This project can be deployed on platforms like Vercel, Netlify, or any other hosting service that supports Next.js applications.

Make sure to set up the environment variables in your deployment platform.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
