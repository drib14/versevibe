import { formatDistanceToNow, isAfter, parseISO } from 'date-fns';
import { subYears } from 'date-fns';

export const formatDate = (dateString) => {
  const date = parseISO(dateString);
  const oneYearAgo = subYears(new Date(), 1);

  if (isAfter(date, oneYearAgo)) {
    return formatDistanceToNow(date, { addSuffix: true });
  } else {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
};

export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const formatTags = (tags) => {
  return tags?.length ? tags.map((tag) => `#${tag}`).join(' ') : '';
};

export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export const sanitizeInput = (input) => {
  if (!input) return '';
  return input.replace(/[<>&'"]/g, (char) => {
    const escape = {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      "'": '&#39;',
      '"': '&quot;',
    };
    return escape[char] || char;
  });
};

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export const formatLastActive = (dateString) => {
  const date = parseISO(dateString);
  const now = new Date();
  const diffInMinutes = (now - date) / (1000 * 60);

  if (diffInMinutes < 5) {
    return "Active now";
  }

  return formatDistanceToNow(date, { addSuffix: true });
};
