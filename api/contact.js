const allowedProjectTypes = new Set([
  'Full-stack product',
  'LMS or ERP system',
  'API integration',
  'AI integration',
  'Dashboard or automation',
]);

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clean(value) {
  return String(value || '').trim();
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ message: 'Method not allowed.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || 'meesum979@gmail.com';
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';

  if (!apiKey) {
    return response.status(503).json({
      message: 'Contact form is not configured yet. Please email meesum979@gmail.com directly.',
    });
  }

  const name = clean(request.body?.name);
  const email = clean(request.body?.email);
  const projectType = clean(request.body?.projectType);
  const message = clean(request.body?.message);

  if (name.length < 2 || name.length > 80) {
    return response.status(400).json({ message: 'Please enter a valid name.' });
  }

  if (!isValidEmail(email)) {
    return response.status(400).json({ message: 'Please enter a valid email address.' });
  }

  if (!allowedProjectTypes.has(projectType)) {
    return response.status(400).json({ message: 'Please select a valid project type.' });
  }

  if (message.length < 10 || message.length > 2000) {
    return response.status(400).json({ message: 'Please enter a message between 10 and 2000 characters.' });
  }

  const emailBody = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Project Type: ${projectType}`,
    '',
    'Message:',
    message,
  ].join('\n');

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: email,
      subject: `Portfolio inquiry from ${name}`,
      text: emailBody,
    }),
  });

  if (!resendResponse.ok) {
    return response.status(502).json({
      message: 'Email service failed. Please email meesum979@gmail.com directly.',
    });
  }

  return response.status(200).json({ message: 'Message sent successfully.' });
}
